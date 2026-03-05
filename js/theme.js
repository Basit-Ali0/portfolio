// ══════════════════════════════════════
// DARK MODE TOGGLE
// ══════════════════════════════════════
const btn = document.getElementById('themeBtn');
const icon = document.getElementById('ticon');
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
icon.textContent = saved === 'dark' ? '🌙' : '☀️';
btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.textContent = next === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', next);
});
