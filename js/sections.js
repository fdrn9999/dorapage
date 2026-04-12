/**
 * DoraPage - Section Animations
 * ScrollTrigger-based reveal animations for About, Projects, Experience, Contact
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // --- About section ---
  gsap.from('.about__text', {
    scrollTrigger: {
      trigger: '.about__text',
      start: 'top 80%',
    },
    opacity: 0,
    x: -30,
    duration: 0.7,
    ease: 'power2.out',
  });

  gsap.from('.stat-card', {
    scrollTrigger: {
      trigger: '.about__stats',
      start: 'top 80%',
    },
    opacity: 0,
    y: 30,
    scale: 0.9,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.3)',
  });

  // --- Project cards ---
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects__grid',
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
  });

  // --- Timeline items ---
  document.querySelectorAll('.timeline__item').forEach((item) => {
    const isLeft = item.classList.contains('timeline__item--left');

    gsap.from(item.querySelector('.timeline__card'), {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
      opacity: 0,
      x: isLeft ? -40 : 40,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.from(item.querySelector('.timeline__node'), {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
      scale: 0,
      duration: 0.4,
      ease: 'back.out(2)',
    });
  });

  // --- Contact section ---
  gsap.from('.contact__dorayaki', {
    scrollTrigger: {
      trigger: '.contact__content',
      start: 'top 80%',
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.7,
    ease: 'back.out(1.5)',
  });

  gsap.from('.contact__link', {
    scrollTrigger: {
      trigger: '.contact__info',
      start: 'top 85%',
    },
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.out',
  });
});
