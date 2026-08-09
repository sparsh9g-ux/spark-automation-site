// ─── Contact form — AJAX submit so we stay on-brand instead of Formspree's redirect ───
const contactForm = document.getElementById('contactForm');
const contactSubmit = document.getElementById('contactSubmit');
const contactStatus = document.getElementById('contactStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  contactSubmit.disabled = true;
  contactStatus.textContent = 'Sending…';
  contactStatus.classList.remove('text-red-400', 'text-green-400');

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });

    if (response.ok) {
      contactStatus.textContent = "Message sent — we'll get back to you soon.";
      contactStatus.classList.add('text-green-400');
      contactForm.reset();
    } else {
      contactStatus.textContent = 'Something went wrong. Please try again.';
      contactStatus.classList.add('text-red-400');
    }
  } catch (err) {
    contactStatus.textContent =
      err.name === 'TimeoutError' || err.name === 'AbortError'
        ? 'Request timed out. Please try again.'
        : 'Something went wrong. Please try again.';
    contactStatus.classList.add('text-red-400');
  } finally {
    contactSubmit.disabled = false;
  }
});
