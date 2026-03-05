// ══════════════════════════════════════
// SCROLL PROGRESS BAR + STICKY NAV + REVEAL
// ══════════════════════════════════════
const bar = document.getElementById('progress-bar');
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
    if (scrolled > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
}, { passive: true });

// ══════════════════════════════════════
// SCROLL REVEAL (IntersectionObserver)
// ══════════════════════════════════════
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (entry.target.classList.contains('s-github')) {
                setTimeout(() => {
                    document.querySelectorAll('.lb-fill').forEach(el => { el.style.width = el.dataset.p + '%'; });
                }, 300);
            }
            if (entry.target.classList.contains('s-about')) {
                startCounters();
            }
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));
