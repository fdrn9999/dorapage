/**
 * DoraPage - Air Cannon (공기포)
 * Frame 1 (서기) → Frame 2 (들기) + 캐논 등장 → Frame 3 (발사) + 공기 발사
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const wrap = document.getElementById('cannonDoraWrap');
  const frame1 = document.getElementById('cannonFrame1');
  const frame2 = document.getElementById('cannonFrame2');
  const frame3 = document.getElementById('cannonFrame3');
  const gun = document.getElementById('cannonGun');
  const air = document.getElementById('cannonAir');
  const scene = wrap && wrap.closest('.cannon-scene');

  if (!wrap || !scene) return;

  function showFrame(n) {
    frame1.style.display = (n === 0) ? 'block' : 'none';
    frame2.style.display = (n === 1) ? 'block' : 'none';
    frame3.style.display = (n === 2) ? 'block' : 'none';
  }

  function resetAll() {
    showFrame(0);
    gsap.set(wrap, { opacity: 0, x: 0 });
    gsap.set(gun, { opacity: 0 });
    gsap.set(air, { opacity: 0, x: 0, scaleX: 1, scaleY: 1 });
  }

  var playing = false;
  resetAll();

  ScrollTrigger.create({
    trigger: '#cannonDivider',
    start: 'top 70%',
    onEnter: function () { if (!playing) play(); },
    onLeaveBack: function () { playing = false; resetAll(); },
  });

  function play() {
    playing = true;
    resetAll();

    var tl = gsap.timeline({
      onComplete: function () { playing = false; },
    });

    // 1) Doraemon slides in (Frame 1)
    showFrame(0);
    tl.to(wrap, { opacity: 1, duration: 0.01 });
    tl.from(wrap, { x: -40, duration: 0.35, ease: 'back.out(1.4)' });

    // 2) Frame 2 (arm raised) + cannon appears on hand
    tl.call(function () { showFrame(1); }, null, '+=0.3');
    tl.to(gun, { opacity: 1, duration: 0.12 }, '<');

    // 3) Frame 3 (fire!) + recoil
    tl.call(function () { showFrame(2); }, null, '+=0.2');
    tl.to(wrap, { x: -6, duration: 0.05, ease: 'power2.in' }, '<');
    tl.to(wrap, { x: 0, duration: 0.15, ease: 'elastic.out(1, 0.5)' });

    // 4) Air blast from cannon muzzle
    tl.call(function () {
      // Position air at cannon's right edge (muzzle)
      var gunRect = gun.getBoundingClientRect();
      var sceneRect = scene.getBoundingClientRect();
      gsap.set(air, {
        left: (gunRect.right - sceneRect.left) + 'px',
        top: (gunRect.top - sceneRect.top + gunRect.height * 0.2) + 'px',
      });
    });
    tl.to(air, { opacity: 1, duration: 0.01 });
    tl.fromTo(air,
      { x: 0, scaleX: 0.4, scaleY: 0.4 },
      { x: 250, scaleX: 1.6, scaleY: 1.6, duration: 0.5, ease: 'power2.out' }
    );
    tl.to(air, { opacity: 0, duration: 0.15 }, '-=0.15');

    // 5) Doraemon exits
    tl.to(wrap, {
      opacity: 0, x: -15, duration: 0.3, ease: 'power2.in',
    }, '+=0.2');
  }
});
