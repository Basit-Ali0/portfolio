// ══════════════════════════════════════
// DARK MODE TOGGLE
// ══════════════════════════════════════
const btn = document.getElementById('themeBtn');
const icon = document.getElementById('ticon');
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'light';

const sunSVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
const moonSVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';

html.setAttribute('data-theme', saved);
icon.innerHTML = saved === 'dark' ? moonSVG : sunSVG;
btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.innerHTML = next === 'dark' ? moonSVG : sunSVG;
    localStorage.setItem('theme', next);
});
