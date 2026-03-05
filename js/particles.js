// ══════════════════════════════════════
// PARTICLE STAR FIELD ENGINE
// ══════════════════════════════════════
(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    // Configuration
    const P_COUNT = 80;
    const MAX_DIST = 120;
    const MOUSE_DIST = 150;

    // Theme colors
    const lightColors = {
        dot: 'rgba(99, 102, 241, 0.5)',   // Indigo primary
        line: 'rgba(99, 102, 241, 0.15)',
        glow: 'rgba(139, 92, 246, 0.05)'  // Purple secondary
    };

    const darkColors = {
        dot: 'rgba(232, 238, 255, 0.4)',  // var(--dark) with opacity
        line: 'rgba(122, 138, 170, 0.15)', // var(--gray) with opacity
        glow: 'rgba(100, 140, 255, 0.03)'  // Subtle blue
    };

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
            this.baseRadius = this.radius;
        }

        update() {
            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges smoothly
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;

            // Mouse interaction (gentle repel)
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_DIST) {
                const force = (MOUSE_DIST - dist) / MOUSE_DIST;
                this.x -= (dx / dist) * force * 1.5;
                this.y -= (dy / dist) * force * 1.5;
                this.radius = this.baseRadius + force * 1.5;
            } else {
                this.radius = this.baseRadius;
            }
        }

        draw(colors) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = colors.dot;
            ctx.fill();
        }
    }

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;

        // Reinitialize particles on resize to ensure even distribution
        particles = [];
        const count = window.innerWidth < 680 ? P_COUNT / 2 : P_COUNT; // Less particles on mobile
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function render() {
        // Detect current theme inside render loop to adapt instantly
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const colors = isDark ? darkColors : lightColors;

        // Clear canvas
        ctx.clearRect(0, 0, W, H);

        // Draw subtle gradient background glow
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        if (isDark) {
            bgGrad.addColorStop(0, '#04060c');
            bgGrad.addColorStop(1, '#070b15');
        } else {
            bgGrad.addColorStop(0, '#ffffff');
            bgGrad.addColorStop(1, '#ffffff');
        }
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Subtle ambient glow in the center
        const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) / 1.5);
        glow.addColorStop(0, colors.glow);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        // Update and draw particles, draw interconnecting lines
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(colors);

            // Connect particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distSq = dx * dx + dy * dy;

                if (distSq < MAX_DIST * MAX_DIST) {
                    const dist = Math.sqrt(distSq);
                    const opacity = 1 - (dist / MAX_DIST);

                    ctx.beginPath();
                    // Extract RGB from color string to apply dynamic opacity
                    const rgbMatch = colors.line.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                    if (rgbMatch) {
                        ctx.strokeStyle = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacity * 0.4})`;
                    } else {
                        ctx.strokeStyle = colors.line;
                    }
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(render);
    }

    // Event Listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    // Initialize
    resize();
    render();
})();
