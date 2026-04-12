/**
 * DoraPage - Air Cannon (공기포)
 * Scroll-triggered concentric ring expansion using Gemini SVG
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const rings = document.querySelectorAll('.cannon-ring');
  const core = document.querySelector('.cannon-core');
  const bg = document.querySelector('.cannon-bg');
  if (!rings.length) return;

  const cannonTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#cannonDivider',
      start: 'top 75%',
      end: 'bottom 25%',
      toggleActions: 'play none none reverse',
    }
  });

  // Core appears
  cannonTl.to(core, {
    opacity: 0.9,
    scale: 1.5,
    duration: 0.3,
    ease: 'power2.out',
  });

  // Rings expand outward
  rings.forEach((ring, i) => {
    cannonTl.fromTo(ring, {
      scale: 0.3,
      opacity: 0,
    }, {
      scale: 1,
      opacity: [0.8, 0.6, 0.4, 0.2][i] || 0.2,
      duration: 0.6,
      ease: 'power2.out',
    }, 0.1 + i * 0.1);
  });

  // Background gradient fades in
  cannonTl.to(bg, {
    opacity: 0.4,
    duration: 0.5,
  }, 0.2);

  // Then everything fades out
  cannonTl.to([core, bg, ...rings], {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.in',
  }, '+=0.3');
});
