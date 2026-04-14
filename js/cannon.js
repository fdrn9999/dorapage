/**
 * DoraPage - Air Cannon (공기포) - Interactive
 * Scroll in: F1 (entry, 11:30) → F2 (aiming, 1-2 o'clock) → F3 (ready/standing, waiting)
 * Click/touch: F4 (mouth open, firing) + air blast → back to F3
 * Scroll out: reset
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const wrap = document.getElementById('cannonDoraWrap');
  const frames = [
    document.getElementById('cannonFrame1'),
    document.getElementById('cannonFrame2'),
    document.getElementById('cannonFrame3'),
    document.getElementById('cannonFrame4'),
  ];
  const gun = document.getElementById('cannonGun');
  const air = document.getElementById('cannonAir');
  const scene = wrap && wrap.closest('.cannon-scene');
  const divider = document.getElementById('cannonDivider');

  if (!wrap || !scene || !divider) return;

  // Cannon position per frame
  // F1: arm at 11:30 → cannon at -135°
  // F2: arm at 2 o'clock → cannon at 1-2 o'clock (~-30°)
  // F3: ready/standing → cannon horizontal, held forward
  // F4: firing (mouth open) → cannon horizontal
  const CANNON_F1 = { left: 14, top: 40, rotation: -135 };
  const CANNON_F2 = { left: 24, top: 36, rotation: -30 };
  const CANNON_F3 = { left: 27, top: 42, rotation: 0 };
  const CANNON_F4 = { left: 27, top: 45, rotation: 0 };

  var state = 'idle';
  var activeTl = null;

  function showFrame(n) {
    frames.forEach((f, i) => {
      f.style.display = (i === n) ? 'block' : 'none';
    });
  }

  function killTl() {
    if (activeTl) { activeTl.kill(); activeTl = null; }
  }

  function reset() {
    killTl();
    state = 'idle';
    divider.classList.remove('cannon-divider--ready');
    showFrame(0);
    gsap.set(wrap, { opacity: 0, x: 0 });
    gsap.set(gun, {
      opacity: 0,
      x: 0,
      left: CANNON_F1.left,
      top: CANNON_F1.top,
      rotation: CANNON_F1.rotation,
      transformOrigin: 'left center',
    });
    gsap.set(air, { opacity: 0, x: 0, scaleX: 1, scaleY: 1 });
  }

  function enter() {
    if (state !== 'idle') return;
    killTl();
    state = 'entering';

    var tl = gsap.timeline({
      onComplete: function () {
        state = 'ready';
        divider.classList.add('cannon-divider--ready');
        activeTl = null;
      },
    });
    activeTl = tl;

    // F1: slide in with tilted cannon
    showFrame(0);
    tl.to([wrap, gun], { opacity: 1, duration: 0.01 });
    tl.from(wrap, { x: -40, duration: 0.3, ease: 'back.out(1.4)' }, '<');
    tl.from(gun, { x: -40, duration: 0.3, ease: 'back.out(1.4)' }, '<');

    // Flip-book: frame + cannon snap together atomically at each step
    const STEP = 0.09;  // 90ms per frame

    tl.call(function () {
      showFrame(1);
      gsap.set(gun, {
        left: CANNON_F2.left,
        top: CANNON_F2.top,
        rotation: CANNON_F2.rotation,
      });
    }, null, `+=${STEP}`);

    tl.call(function () {
      showFrame(2);
      gsap.set(gun, {
        left: CANNON_F3.left,
        top: CANNON_F3.top,
        rotation: CANNON_F3.rotation,
      });
    }, null, `+=${STEP}`);
  }

  function fire() {
    if (state !== 'ready') return;
    killTl();
    state = 'firing';
    divider.classList.remove('cannon-divider--ready');

    // Hard reset air blast state before new fire
    gsap.killTweensOf(air);
    gsap.set(air, { opacity: 0, x: 0, scaleX: 1, scaleY: 1 });

    var tl = gsap.timeline({
      onComplete: function () {
        state = 'ready';
        divider.classList.add('cannon-divider--ready');
        activeTl = null;
      },
    });
    activeTl = tl;

    // F4 (mouth open) + cannon drop slightly + recoil
    tl.call(function () { showFrame(3); });
    tl.to(gun, {
      left: CANNON_F4.left,
      top: CANNON_F4.top,
      rotation: CANNON_F4.rotation,
      duration: 0.06,
      ease: 'power2.in',
    }, '<');
    tl.to(wrap, { x: -6, duration: 0.05, ease: 'power2.in' }, '<');
    tl.to(wrap, { x: 0, duration: 0.15, ease: 'elastic.out(1, 0.5)' });

    // Air blast from muzzle
    tl.call(function () {
      var gunRect = gun.getBoundingClientRect();
      var sceneRect = scene.getBoundingClientRect();
      gsap.set(air, {
        opacity: 1,
        x: 0,
        scaleX: 0.4,
        scaleY: 0.4,
        left: (gunRect.right - sceneRect.left) + 'px',
        top: (gunRect.top - sceneRect.top + gunRect.height * 0.2) + 'px',
      });
    });
    tl.to(air, {
      x: 250, scaleX: 1.6, scaleY: 1.6, duration: 0.5, ease: 'power2.out',
    });
    tl.to(air, { opacity: 0, duration: 0.15 }, '-=0.15');

    // Return to F3 (ready)
    tl.call(function () { showFrame(2); }, null, '+=0.05');
    tl.to(gun, {
      left: CANNON_F3.left,
      top: CANNON_F3.top,
      rotation: CANNON_F3.rotation,
      duration: 0.15,
      ease: 'power2.out',
    }, '<');
  }

  reset();

  ScrollTrigger.create({
    trigger: '#cannonDivider',
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: enter,
    onEnterBack: enter,
    onLeave: reset,
    onLeaveBack: reset,
  });

  divider.addEventListener('click', fire);
  divider.addEventListener('touchstart', function (e) {
    e.preventDefault();
    fire();
  }, { passive: false });
});
