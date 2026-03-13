// ══════════════════════════════════════
// CONTACT SUBMIT + CONFETTI
// ══════════════════════════════════════
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const btn = document.getElementById('fsub');
    const originalText = btn.textContent;
    const originalStyle = btn.style.background;
    
    btn.textContent = 'Sending...';
    btn.style.background = '#6366f1';
    btn.disabled = true;
    
    try {
        const response = await fetch(this.action, {
            method: this.method,
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            btn.textContent = '✓ Message Sent!';
            btn.style.background = '#22C55E';
            launchConfetti();
            this.reset();
        } else {
            btn.textContent = '✗ Failed';
            btn.style.background = '#ef4444';
        }
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = originalStyle;
            btn.disabled = false;
        }, 3000);
        
    } catch (error) {
        btn.textContent = '✗ Error';
        btn.style.background = '#ef4444';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = originalStyle;
            btn.disabled = false;
        }, 3000);
    }
});
