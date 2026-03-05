// ══════════════════════════════════════
// CONFETTI
// ══════════════════════════════════════
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiRunning = false;

function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeConfettiCanvas();
window.addEventListener('resize', resizeConfettiCanvas);

const CONFETTI_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#22c55e', '#f59e0b', '#3b82f6', '#ef4444'];

function spawnConfetti() {
    for (let i = 0; i < 140; i++) {
        confettiParticles.push({
            x: confettiCanvas.width * Math.random(),
            y: -10 - Math.random() * 200,
            r: 4 + Math.random() * 6,
            d: 3 + Math.random() * 5,
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            angle: Math.random() * 360,
            spin: (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 3,
            vy: 1.5 + Math.random() * 3,
            shape: Math.random() > 0.5 ? 'rect' : 'circle',
            w: 6 + Math.random() * 8,
            h: 3 + Math.random() * 5,
            opacity: 1,
        });
    }
}

function drawConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.angle * Math.PI / 180);
        confettiCtx.globalAlpha = p.opacity;
        confettiCtx.fillStyle = p.color;
        if (p.shape === 'rect') {
            confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
            confettiCtx.beginPath();
            confettiCtx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
            confettiCtx.fill();
        }
        confettiCtx.restore();
    });
}

function updateConfetti() {
    confettiParticles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.04) * 0.8;
        p.angle += p.spin;
        p.vy *= 0.998;
        if (p.y > confettiCanvas.height * 0.7) p.opacity -= 0.012;
    });
    confettiParticles = confettiParticles.filter(p => p.opacity > 0);
}

function runConfetti() {
    if (!confettiRunning) return;
    drawConfetti();
    updateConfetti();
    if (confettiParticles.length === 0) {
        confettiRunning = false;
        confettiCanvas.style.opacity = '0';
    } else {
        requestAnimationFrame(runConfetti);
    }
}

function launchConfetti() {
    spawnConfetti();
    confettiCanvas.style.opacity = '1';
    if (!confettiRunning) {
        confettiRunning = true;
        runConfetti();
    }
}
