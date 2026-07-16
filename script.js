// ─── Ignition intro — logo bolt flickers, then hero text snaps in ───
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  // Skip the animation, but still land on the final "cooled" gradient look.
  gsap.set('#bolt-solid', { opacity: 0 });
  gsap.set('#bolt-gradient', { opacity: 1 });
  gsap.set('.spark-word-solid', { opacity: 0 });
  gsap.set('.spark-word-gradient', { opacity: 1 });
} else {
  const igniteTl = gsap.timeline({ delay: 0.15 });

  igniteTl
    // logo bolt flickers like it's catching a spark — hot yellow at first
    .to('#logo-bolt', { scale: 1.6, filter: 'brightness(2.5)', duration: 0.12, ease: 'power2.out' })
    .to('#logo-bolt', { scale: 0.85, filter: 'brightness(0.6)', duration: 0.09 })
    .to('#logo-bolt', { scale: 1.3, filter: 'brightness(2)', duration: 0.1 })
    .to('#logo-bolt', { scale: 1, filter: 'brightness(1)', duration: 0.34, ease: 'power2.out' })
    // ...then cools into the brand gradient as the flicker settles
    .to('#bolt-solid', { opacity: 0, duration: 0.34, ease: 'power2.out' }, '<')
    .to('#bolt-gradient', { opacity: 1, duration: 0.34, ease: 'power2.out' }, '<')
    // hero text snaps in right as the flicker settles
    .from('#hero-eyebrow', { opacity: 0, y: 10, duration: 0.35, ease: 'power4.out' }, '-=0.15')
    .from('#hero-headline', { opacity: 0, y: 18, scale: 0.97, duration: 0.45, ease: 'back.out(1.6)' }, '-=0.1')
    // "kills a spark" catches the same flicker as the logo bolt
    .to('#spark-word', { filter: 'brightness(2.2)', duration: 0.12, ease: 'power2.out' }, '-=0.05')
    .to('#spark-word', { filter: 'brightness(0.7)', duration: 0.09 })
    .to('#spark-word', { filter: 'brightness(1.8)', duration: 0.1 })
    .to('#spark-word', { filter: 'brightness(1)', duration: 0.34, ease: 'power2.out' })
    // ...and cools into the same gradient, in sync with the logo bolt
    .to('.spark-word-solid', { opacity: 0, duration: 0.34, ease: 'power2.out' }, '<')
    .to('.spark-word-gradient', { opacity: 1, duration: 0.34, ease: 'power2.out' }, '<')
    .from('#hero-sub', { opacity: 0, y: 12, duration: 0.4, ease: 'power4.out' }, '-=0.35')
    // "reignite it instantly" gets one smooth glow pulse once the sentence lands — not a flicker
    .to('#reignite-word', { filter: 'brightness(1.8)', duration: 0.35, ease: 'power2.out' }, '-=0.1')
    .to('#reignite-word', { filter: 'brightness(1)', duration: 0.5, ease: 'power2.inOut' })
    .from('#hero-cta-group', { opacity: 0, y: 12, duration: 0.4, ease: 'power4.out' }, '-=0.6');
}

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
