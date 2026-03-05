// ══════════════════════════════════════
// AURORA CANVAS ENGINE
// ══════════════════════════════════════
(function () {
    const canvas = document.getElementById('aurora-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, t = 0;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Aurora curtain definitions
    // Each curtain: hue, vertical position (0–1), wave amplitude, wave speed, wave frequency, opacity
    const curtains = [
        { h: 160, y: 0.30, amp: 0.10, spd: 0.00035, freq: 1.8, op: 0.55 }, // teal/green
        { h: 200, y: 0.22, amp: 0.08, spd: 0.00028, freq: 2.2, op: 0.45 }, // blue
        { h: 280, y: 0.18, amp: 0.12, spd: 0.00042, freq: 1.5, op: 0.40 }, // purple
        { h: 140, y: 0.35, amp: 0.07, spd: 0.00020, freq: 2.6, op: 0.35 }, // green
        { h: 190, y: 0.12, amp: 0.09, spd: 0.00038, freq: 1.2, op: 0.30 }, // cyan
        { h: 310, y: 0.28, amp: 0.06, spd: 0.00050, freq: 3.0, op: 0.25 }, // pink
    ];

    function drawStars() {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        if (!drawStars._pts) {
            drawStars._pts = Array.from({ length: 120 }, () => [Math.random(), Math.random(), Math.random()]);
        }
        drawStars._pts.forEach(([sx, sy, sr]) => {
            const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.0008 + sr * 10));
            ctx.globalAlpha = pulse * 0.5;
            ctx.beginPath();
            ctx.arc(sx * W, sy * H * 0.6, sr * 1.2 + 0.3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    function drawCurtain(c) {
        const steps = 80;
        const curtainH = H * 0.38;
        const baseY = H * c.y;

        for (let s = 0; s < steps; s++) {
            const progress = s / steps;
            const x = progress * W;

            const wave =
                Math.sin(progress * Math.PI * c.freq + t * c.spd * 1000) * H * c.amp +
                Math.sin(progress * Math.PI * c.freq * 1.7 + t * c.spd * 700 + 1.2) * H * c.amp * 0.4 +
                Math.sin(progress * Math.PI * c.freq * 0.6 + t * c.spd * 1300 + 2.4) * H * c.amp * 0.25;

            const topY = baseY + wave;
            const bottomY = topY + curtainH * (0.6 + 0.4 * Math.sin(progress * Math.PI));

            const grad = ctx.createLinearGradient(x, topY, x, bottomY);
            const alpha1 = c.op * (0.7 + 0.3 * Math.sin(t * c.spd * 800 + progress * 5));
            grad.addColorStop(0, `hsla(${c.h},85%,68%,0)`);
            grad.addColorStop(0.1, `hsla(${c.h},85%,68%,${alpha1 * 0.8})`);
            grad.addColorStop(0.35, `hsla(${c.h},80%,60%,${alpha1})`);
            grad.addColorStop(0.65, `hsla(${c.h},75%,50%,${alpha1 * 0.6})`);
            grad.addColorStop(1, `hsla(${c.h},70%,40%,0)`);

            ctx.fillStyle = grad;
            ctx.fillRect(x, topY, W / steps + 1, bottomY - topY);
        }
    }

    function render() {
        t++;

        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, '#020510');
        sky.addColorStop(0.5, '#040812');
        sky.addColorStop(1, '#060b1a');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);

        drawStars();

        ctx.globalCompositeOperation = 'lighter';
        curtains.forEach(c => drawCurtain(c));
        ctx.globalCompositeOperation = 'source-over';

        const glow = ctx.createLinearGradient(0, H * 0.55, 0, H);
        glow.addColorStop(0, 'rgba(20,80,60,0.12)');
        glow.addColorStop(1, 'rgba(10,30,20,0.25)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, H * 0.55, W, H * 0.45);

        requestAnimationFrame(render);
    }

    render();
})();
