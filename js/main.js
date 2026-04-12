/**
 * DoraPage - Main Entry
 * Anywhere Door: dark room → door opens → light floods → zoom into door → portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    document.getElementById('doorIntro').style.display = 'none';
    document.getElementById('portfolio').classList.add('portfolio--visible');
    document.querySelectorAll('.skill-card').forEach(c => c.classList.add('skill-card--visible'));
    return;
  }

  initDoorIntro();
});

function initDoorIntro() {
  const doorIntro = document.getElementById('doorIntro');
  const doorPanel = document.getElementById('introDoor');
  const doorWrapper = document.getElementById('doorWrapper');
  const doorBehind = document.getElementById('doorBehind');
  const doorFlash = document.getElementById('doorFlash');
  const doorHint = document.getElementById('doorHint');
  const portfolio = document.getElementById('portfolio');
  let doorOpened = false;

  doorWrapper.addEventListener('click', openDoor);
  doorWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDoor(); }
  });

  function openDoor() {
    if (doorOpened) return;
    doorOpened = true;

    // Hide hint
    gsap.to(doorHint, { opacity: 0, duration: 0.2 });

    const tl = gsap.timeline();

    // 1) Door swings open with 3D rotation
    tl.to(doorPanel, {
      rotateY: -110,
      duration: 1.0,
      ease: 'power2.inOut',
    })

    // 2) Light behind door brightens (the bright world is revealed)
    .to(doorBehind, {
      boxShadow: '0 0 120px 60px rgba(255,255,255,0.8)',
      duration: 0.6,
    }, '-=0.5')

    // 3) Label fades out
    .to('.door-intro__label', {
      opacity: 0,
      duration: 0.3,
    }, '-=0.6')

    // 4) ZOOM IN - we rush toward the door (scale the whole door up + move viewer through)
    .to(doorWrapper, {
      scale: 8,
      duration: 1.0,
      ease: 'power3.in',
    }, '-=0.2')

    // 5) White flash - we've entered the door
    .to(doorFlash, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.4')

    // 6) Transition complete
    .call(() => {
      doorIntro.style.display = 'none';
      portfolio.classList.add('portfolio--visible');
      initHeroEntrance();
    })

    // 7) Flash fades out (now on the portfolio side)
    .to(doorFlash, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }
}

function initHeroEntrance() {
  const tl = gsap.timeline({ delay: 0.3 });

  // Doraemon appears from right
  tl.from('#heroDoraemon', {
    x: 300,
    opacity: 0,
    scale: 0.7,
    duration: 0.9,
    ease: 'back.out(1.2)',
  })
  .from('.hero__greeting', { opacity: 0, y: 20, duration: 0.4 }, '-=0.4')
  .from('.hero__name', { opacity: 0, y: 30, duration: 0.5 }, '-=0.2')
  .from('.hero__title', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
  .from('.hero__desc', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
  .from('.hero__buttons', { opacity: 0, y: 20, duration: 0.4 }, '-=0.1')
  .from('.hero__scroll-indicator', { opacity: 0, duration: 0.4 }, '-=0.1');

  // Doraemon float loop
  gsap.to('#heroDoraemon', {
    y: -10,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1.5,
  });
}
