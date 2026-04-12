/**
 * DoraPage - 4D Pocket (사차원 주머니)
 * Click the semicircle pocket → skill cards fly out
 */

document.addEventListener('DOMContentLoaded', () => {
  const pocketBtn = document.getElementById('pocketBtn');
  const pocketToggle = document.getElementById('pocketToggle');
  const pocketHint = document.getElementById('pocketHint');
  const skillCards = document.querySelectorAll('.skill-card');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return;

  let isOpen = false;
  let pocketTimeline = null;

  function createPocketTimeline() {
    const tl = gsap.timeline({ paused: true });

    // Pocket glows and pulses
    tl.to('.pocket-scene__svg', {
      scale: 1.15,
      filter: 'drop-shadow(0 0 30px rgba(0,152,212,0.5))',
      duration: 0.3,
      ease: 'power2.out',
    })
    .to('.pocket-glow', {
      opacity: 0.2,
      scale: 1.3,
      duration: 0.3,
    }, '<')
    .to('.pocket-scene__svg', {
      scale: 1,
      filter: 'drop-shadow(0 4px 20px rgba(0,152,212,0.2))',
      duration: 0.3,
    });

    // Cards emerge from pocket
    skillCards.forEach((card, i) => {
      tl.fromTo(card, {
        opacity: 0,
        scale: 0.2,
        y: -50,
        rotation: gsap.utils.random(-15, 15),
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.4,
        ease: 'back.out(1.4)',
        onStart: () => card.classList.add('skill-card--visible'),
      }, i === 0 ? '>' : `-=0.25`);
    });

    return tl;
  }

  function openPocket() {
    if (!pocketTimeline) pocketTimeline = createPocketTimeline();
    pocketTimeline.play();
    pocketBtn.setAttribute('aria-expanded', 'true');
    pocketToggle.style.display = 'inline-flex';
    if (pocketHint) pocketHint.style.display = 'none';
    isOpen = true;
  }

  function closePocket() {
    if (!pocketTimeline) return;
    skillCards.forEach(card => {
      const fill = card.querySelector('.skill-card__fill');
      if (fill) gsap.set(fill, { width: 0 });
    });
    pocketTimeline.reverse();
    pocketBtn.setAttribute('aria-expanded', 'false');
    isOpen = false;
    gsap.delayedCall(pocketTimeline.duration(), () => {
      pocketToggle.style.display = 'none';
      if (pocketHint) pocketHint.style.display = 'block';
      skillCards.forEach(c => c.classList.remove('skill-card--visible'));
    });
  }

  pocketBtn.addEventListener('click', () => { if (!isOpen) openPocket(); });
  pocketToggle.addEventListener('click', () => { if (isOpen) closePocket(); });
  pocketBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!isOpen) openPocket(); }
  });

  // Auto-open on first scroll
  let hasAutoOpened = false;
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      if (!hasAutoOpened && !isOpen) {
        hasAutoOpened = true;
        gsap.delayedCall(0.5, openPocket);
      }
    }
  });
});
