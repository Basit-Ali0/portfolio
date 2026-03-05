// ══════════════════════════════════════
// NUMBER COUNTER ANIMATION
// ══════════════════════════════════════
function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = (target === Infinity ? '∞' : Math.floor(start)) + suffix;
    }, 16);
}

function startCounters() {
    const counters = [
        { el: document.querySelectorAll('.stat-n')[0], val: 3, suffix: '+' },
        { el: document.querySelectorAll('.stat-n')[1], val: 20, suffix: '+' },
        { el: document.querySelectorAll('.stat-n')[2], val: 30, suffix: '+' },
        { el: document.querySelectorAll('.stat-n')[3], val: 0, suffix: '', special: '∞' },
    ];
    counters.forEach((c, i) => {
        if (!c.el) return;
        setTimeout(() => {
            if (c.special) { c.el.textContent = '∞'; return; }
            animateCounter(c.el, c.val, c.suffix, 1200);
        }, i * 120);
    });
}
