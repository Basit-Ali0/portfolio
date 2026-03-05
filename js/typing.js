// ══════════════════════════════════════
// TYPING ANIMATION (HERO)
// ══════════════════════════════════════
const words = ['Hardwares', 'Products', 'Experiences', 'Interfaces', 'Hardwares'];
const typedEl = document.getElementById('typedWord');
const cursorEl = document.getElementById('typedCursor');
let wordIdx = 0, charIdx = 0, deleting = false;

function type() {
    if (!typedEl || !cursorEl) return;
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

// ══════════════════════════════════════
// HOLA TYPING ANIMATION (NAV)
// ══════════════════════════════════════
const holaWords = ['Hola!', 'Hello!', 'Bonjour!', 'Ciao!', 'こんにちは!', '你好!', 'Hallo!', 'Salut!'];
const holaEl = document.getElementById('holaWord');
let hWordIdx = 0, hCharIdx = 0, hDeleting = false;

function typeHola() {
    if (!holaEl) return;
    const word = holaWords[hWordIdx];
    if (!hDeleting) {
        holaEl.textContent = word.slice(0, ++hCharIdx);
        if (hCharIdx === word.length) {
            setTimeout(() => { hDeleting = true; typeHola(); }, 2500); // Wait longer on full word
            return;
        }
        setTimeout(typeHola, 100);
    } else {
        holaEl.textContent = word.slice(0, --hCharIdx);
        if (hCharIdx === 0) {
            hDeleting = false;
            hWordIdx = (hWordIdx + 1) % holaWords.length;
            setTimeout(typeHola, 500); // Wait before typing new word
            return;
        }
        setTimeout(typeHola, 60);
    }
}
setTimeout(typeHola, 1000);
