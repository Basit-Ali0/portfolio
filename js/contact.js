// ══════════════════════════════════════
// CONTACT SUBMIT + CONFETTI
// ══════════════════════════════════════
document.getElementById('fsub').addEventListener('click', function () {
    this.textContent = '✓ Message Sent!';
    this.style.background = '#22C55E';
    launchConfetti();
    setTimeout(() => { this.textContent = 'Send Message →'; this.style.background = ''; }, 3000);
});
