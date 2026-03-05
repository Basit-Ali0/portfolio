// ══════════════════════════════════════
// TYPING ANIMATION
// ══════════════════════════════════════
const words = ['Hardwares', 'Products', 'Experiences', 'Interfaces', 'Hardwares'];
const typedEl = document.getElementById('typedWord');
const cursorEl = document.getElementById('typedCursor');
let wordIdx = 0, charIdx = 0, deleting = false;

function type() {
    const word = words[wordIdx];
    if (!deleting) {
        typedEl.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
            if (wordIdx === words.length - 1) return;
            setTimeout(() => { deleting = true; type(); }, 1800);
            return;
        }
        setTimeout(type, 90);
    } else {
        typedEl.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            setTimeout(type, 300);
            return;
        }
        setTimeout(type, 50);
    }
}
setTimeout(type, 600);
