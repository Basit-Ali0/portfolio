// ══════════════════════════════════════
// 3D TILT ON PROJECT CARDS
// ══════════════════════════════════════
document.querySelectorAll('.pc').forEach(card => {
    const shine = card.querySelector('.tilt-shine');
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const tiltX = dy * -8;
        const tiltY = dx * 8;
        card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        card.style.boxShadow = `${-dx * 10}px ${-dy * 10}px 30px rgba(0,0,0,0.12)`;
        if (shine) {
            shine.style.background = `radial-gradient(circle at ${(dx + 1) / 2 * 100}% ${(dy + 1) / 2 * 100}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
        }
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s';
        setTimeout(() => { card.style.transition = ''; }, 500);
    });
});
