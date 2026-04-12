/**
 * DoraPage - Navigation
 * Anywhere Door navigation + smooth scroll + active section tracking
 */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const hamburger = document.getElementById('navHamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const doorOverlay = document.getElementById('doorOverlay');
  const sections = document.querySelectorAll('section[id]');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Nav scroll effect ---
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      nav.classList.toggle('nav--scrolled', self.progress > 0);
    }
  });

  // --- Active section tracking ---
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveLink(section.id),
      onEnterBack: () => setActiveLink(section.id),
    });
  });

  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('nav__link--active',
        link.getAttribute('data-section') === id && !link.classList.contains('nav__link--cta'));
    });
  }

  // --- Anywhere Door smooth scroll ---
  function navigateToSection(href) {
    const target = document.querySelector(href);
    if (!target) return;

    if (prefersReduced) {
      target.scrollIntoView({ behavior: 'auto' });
      return;
    }

    // Door animation
    const doorTl = gsap.timeline();
    const door = doorOverlay.querySelector('.door-overlay__door');

    doorTl
      .set(doorOverlay, { opacity: 0, pointerEvents: 'auto' })
      .to(doorOverlay, { opacity: 1, duration: 0.2 })
      .to(door, { rotateY: -110, duration: 0.5, ease: 'power2.inOut' })
      .to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 0.6, ease: 'power2.inOut' }, '-=0.3')
      .to(door, { rotateY: 0, duration: 0.4, ease: 'power2.in' }, '+=0.1')
      .to(doorOverlay, { opacity: 0, duration: 0.2 })
      .set(doorOverlay, { pointerEvents: 'none' });
  }

  // Desktop nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToSection(link.getAttribute('href'));
    });
  });

  // Logo
  document.querySelector('.nav__logo').addEventListener('click', (e) => {
    e.preventDefault();
    navigateToSection('#hero');
  });

  // --- Mobile nav ---
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('mobile-nav--open');
    if (isOpen) {
      closeMobileNav();
    } else {
      mobileNav.classList.add('mobile-nav--open');
      mobileNav.setAttribute('aria-hidden', 'false');
      hamburger.classList.add('nav__hamburger--open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  });

  mobileNavClose.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileNav();
      setTimeout(() => navigateToSection(link.getAttribute('href')), 300);
    });
  });

  function closeMobileNav() {
    mobileNav.classList.remove('mobile-nav--open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('nav__hamburger--open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
      closeMobileNav();
    }
  });
});
