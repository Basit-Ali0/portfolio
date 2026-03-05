(function () {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let W, H, t = 0;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Aurora curtain definitions — drastically slower spd values
    const curtains = [
        { h: 160, y: 0.30, amp: 0.12, spd: 0.00004, freq: 1.5, op: 0.65 }, // teal/green
        { h: 200, y: 0.22, amp: 0.09, spd: 0.00003, freq: 2.0, op: 0.55 }, // blue
        { h: 280, y: 0.18, amp: 0.15, spd: 0.00006, freq: 1.2, op: 0.50 }, // purple
        { h: 140, y: 0.35, amp: 0.08, spd: 0.00002, freq: 2.4, op: 0.45 }, // green
        { h: 190, y: 0.12, amp: 0.10, spd: 0.00003, freq: 1.0, op: 0.40 }, // cyan
        { h: 310, y: 0.28, amp: 0.07, spd: 0.00005, freq: 2.8, op: 0.35 }, // pink
    ];

    function drawStars() {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        if (!drawStars._pts) {
            drawStars._pts = Array.from({ length: 150 }, () => [Math.random(), Math.random(), Math.random()]);
        }
        drawStars._pts.forEach(([sx, sy, sr]) => {
            // Very slow twinkling
            const pulse = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.0003 + sr * 10));
            ctx.globalAlpha = pulse * 0.4;
            ctx.beginPath();
            ctx.arc(sx * W, sy * H * 0.6, sr * 1.5 + 0.3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    function render() {
        t++;
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

        if (isDark) {
            // Deep space background for dark mode
            const sky = ctx.createLinearGradient(0, 0, 0, H);
            sky.addColorStop(0, '#020510');
            sky.addColorStop(0.5, '#040812');
            sky.addColorStop(1, '#060b1a');
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, W, H);
            drawStars();
            ctx.globalCompositeOperation = 'screen';
        } else {
            // Pure white background for light mode
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, W, H);
            ctx.globalCompositeOperation = 'source-over';
        }

        curtains.forEach((c) => {
            const steps = 70; // Higher resolution waves
            const curtainH = H * 0.5; // Taller curtains
            const baseY = H * c.y;

            for (let s = 0; s < steps; s++) {
                const progress = s / steps;
                const x = progress * W;

                // Ultra smooth, slow complex wave motion
                const wave =
                    Math.sin(progress * Math.PI * c.freq + t * c.spd * 800) * H * c.amp +
                    Math.sin(progress * Math.PI * c.freq * 1.4 + t * c.spd * 500 + 1.2) * H * c.amp * 0.35 +
                    Math.sin(progress * Math.PI * c.freq * 0.7 + t * c.spd * 1000 + 2.4) * H * c.amp * 0.2;

                const topY = baseY + wave;
                const bottomY = topY + curtainH * (0.6 + 0.4 * Math.sin(progress * Math.PI));

                const grad = ctx.createLinearGradient(x, topY, x, bottomY);
                // Slow brightness pulsation
                const alphaPulse = 0.85 + 0.15 * Math.sin(t * c.spd * 300 + progress * 4);

                // Vastly decreased opacity for light mode to maintain contrast
                let op = isDark ? c.op * alphaPulse : (c.op * 0.15 * alphaPulse);

                if (isDark) {
                    grad.addColorStop(0, `hsla(${c.h}, 85%, 65%, 0)`);
                    grad.addColorStop(0.1, `hsla(${c.h}, 85%, 65%, ${op * 0.9})`);
                    grad.addColorStop(0.35, `hsla(${c.h}, 80%, 60%, ${op})`);
                    grad.addColorStop(0.65, `hsla(${c.h}, 75%, 50%, ${op * 0.7})`);
                    grad.addColorStop(1, `hsla(${c.h}, 70%, 40%, 0)`);
                } else {
                    // Light mode pastel gradients drawing normally over white
                    // We use higher lightness to keep it subtle
                    grad.addColorStop(0, `hsla(${c.h}, 90%, 80%, 0)`);
                    grad.addColorStop(0.3, `hsla(${c.h}, 90%, 80%, ${op * 1.5})`);
                    grad.addColorStop(0.7, `hsla(${c.h}, 80%, 75%, ${op * 1.0})`);
                    grad.addColorStop(1, `hsla(${c.h}, 70%, 75%, 0)`);
                }

                ctx.fillStyle = grad;
                // overlap slightly to prevent vertical seam lines
                ctx.fillRect(x, topY, (W / steps) + 1.5, bottomY - topY);
            }
        });

        ctx.globalCompositeOperation = 'source-over';

        if (isDark) {
            // Subtle ground reflection
            const glow = ctx.createLinearGradient(0, H * 0.6, 0, H);
            glow.addColorStop(0, 'rgba(20,80,60,0.05)');
            glow.addColorStop(1, 'rgba(10,30,20,0.15)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, H * 0.6, W, H * 0.4);
        }

        requestAnimationFrame(render);
    }

    render();
})();
