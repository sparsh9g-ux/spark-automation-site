// ─── Ignition flash ───
gsap.timeline()
  .set('#ignition-flash', { opacity: 0.9 })
  .to('#ignition-flash', { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.05);

// ─── Hero entrance — fast and snappy, not a slow fade ───
gsap.from('#hero-eyebrow', { opacity: 0, y: 10, duration: 0.35, delay: 0.15, ease: 'power4.out' });
gsap.from('#hero-headline', { opacity: 0, y: 18, scale: 0.97, duration: 0.45, delay: 0.22, ease: 'back.out(1.6)' });
gsap.from('#hero-sub', { opacity: 0, y: 12, duration: 0.4, delay: 0.4, ease: 'power4.out' });
gsap.from('#hero-cta-group', { opacity: 0, y: 12, duration: 0.4, delay: 0.5, ease: 'power4.out' });
gsap.from('#logo-bolt', { rotate: -25, scale: 0.5, opacity: 0, duration: 0.5, delay: 0.1, ease: 'back.out(2.5)' });

// ─── Service cards scroll reveal — quick snap-in ───
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.service-card').forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 20,
    duration: 0.45,
    delay: (i % 2) * 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
  });
});

// ─── ROI Calculator ───
const clientValueInput = document.getElementById('clientValue');
const missedCallsInput = document.getElementById('missedCalls');
const closeRateInput = document.getElementById('closeRate');

const clientValueDisplay = document.getElementById('clientValueDisplay');
const missedCallsDisplay = document.getElementById('missedCallsDisplay');
const closeRateDisplay = document.getElementById('closeRateDisplay');

const resultLeftOnTable = document.getElementById('resultLeftOnTable');
const resultCharge = document.getElementById('resultCharge');
const resultROI = document.getElementById('resultROI');

const MONTHLY_CHARGE = 150; // flat package price
const WEEKS_PER_MONTH = 4.33;

function formatDollars(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function calculate() {
  const clientValue = Number(clientValueInput.value);
  const missedCallsPerWeek = Number(missedCallsInput.value);
  const closeRate = Number(closeRateInput.value) / 100;

  clientValueDisplay.textContent = formatDollars(clientValue);
  missedCallsDisplay.textContent = missedCallsPerWeek;
  closeRateDisplay.textContent = closeRateInput.value + '%';

  const monthlyMissedCalls = missedCallsPerWeek * WEEKS_PER_MONTH;
  const lostCustomersPerMonth = monthlyMissedCalls * closeRate;
  const monthlyDollarsLeftOnTable = lostCustomersPerMonth * clientValue;
  const roiPercent = ((monthlyDollarsLeftOnTable - MONTHLY_CHARGE) / MONTHLY_CHARGE) * 100;

  resultLeftOnTable.textContent = formatDollars(monthlyDollarsLeftOnTable);
  resultCharge.innerHTML = formatDollars(MONTHLY_CHARGE) + '<span class="text-sm text-gray-500 font-normal">/mo</span>';
  resultROI.textContent = Math.max(0, Math.round(roiPercent)).toLocaleString('en-US') + '%';
}

[clientValueInput, missedCallsInput, closeRateInput].forEach((input) => {
  input.addEventListener('input', calculate);
});

calculate();
