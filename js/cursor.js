// ══════════════════════════════════════
// CUSTOM CURSOR
// ══════════════════════════════════════
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let rx = mx, ry = my;
let cursorVisible = false;

// Hide until first mouse move
dot.style.opacity = '0';
ring.style.opacity = '0';

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (!cursorVisible) {
        cursorVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    }
});

document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    if (cursorVisible) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    }
});

// Hover states — link/button expand
document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .pc, .spill, .ach-card, .soc')) {
        dot.style.transform = 'translate(-50%,-50%) scale(1.8)';
        dot.style.background = '#6366f1';
        ring.style.width = '54px';
        ring.style.height = '54px';
        ring.style.borderColor = '#6366f1';
        ring.style.opacity = '0.6';
    }
});
document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .pc, .spill, .ach-card, .soc')) {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        dot.style.background = '';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = '';
        ring.style.opacity = '1';
    }
});

// Click burst
document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(0.5)';
    ring.style.transform = 'translate(-50%,-50%) scale(0.85)';
});
document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
});

function animateCursor() {
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();
