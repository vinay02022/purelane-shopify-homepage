(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll Reveal Controller ---------- */
  function initReveals() {
    const revs = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && !reduce) {
      const ro = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            ro.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
      revs.forEach((el) => ro.observe(el));
    } else {
      revs.forEach((el) => el.classList.add('in'));
    }
  }

  /* ---------- Scene Crossfade Controller ---------- */
  let currentScene = 0;

  function setScene(n) {
    if (n === currentScene) return;
    currentScene = n;
    const scenes = Array.from(document.querySelectorAll('.scene'));
    const stage = document.getElementById('scenes');
    scenes.forEach((s, i) => s.classList.toggle('on', i + 1 === n));
    if (stage) stage.setAttribute('data-d', String(n));
  }

  function pickScene() {
    const zones = Array.from(document.querySelectorAll('[data-scene]'));
    if (!zones.length) return;
    const focus = window.scrollY + window.innerHeight * 0.5;
    let n = 1;
    for (let i = 0; i < zones.length; i++) {
      const z = zones[i];
      let top = 0;
      let el = z;
      while (el) {
        top += el.offsetTop;
        el = el.offsetParent;
      }
      if (top <= focus) n = parseInt(z.getAttribute('data-scene'), 10) || n;
    }
    setScene(n);
  }

  /* ---------- Progress Rail Sync ---------- */
  function syncRail() {
    const railLinks = Array.from(document.querySelectorAll('.rail a'));
    if (!railLinks.length) return;
    const targets = railLinks.map((a) => document.querySelector(a.getAttribute('href')));
    const mid = window.scrollY + window.innerHeight * 0.42;
    let idx = 0;
    targets.forEach((t, i) => {
      if (t && t.offsetTop <= mid) idx = i;
    });
    railLinks.forEach((a, i) => a.classList.toggle('on', i === idx));
  }

  /* ---------- Parallax & Header Transitions ---------- */
  let raf = null;
  let mx = 0;
  let my = 0;

  function frame() {
    raf = null;
    const hdr = document.getElementById('hdr');
    const prod = document.getElementById('heroProd');
    const y = window.scrollY || window.pageYOffset;
    
    if (hdr) hdr.classList.toggle('up', y > 90);

    if (!reduce) {
      const wl = document.querySelectorAll('#water .wl');
      for (let i = 0; i < wl.length; i++) {
        const d = [0.05, 0.09, 0.03, 0.02][i] || 0.05;
        wl[i].style.setProperty('--px', (mx * d * 130).toFixed(1) + 'px');
        wl[i].style.setProperty('--py', (-y * d + my * d * 90).toFixed(1) + 'px');
      }
      if (prod) {
        const f = Math.min(y / 700, 1);
        prod.style.transform = `translate3d(${(mx * -16).toFixed(2)}px, ${(-f * 54 + my * -10).toFixed(2)}px, 0) scale(${(1 - f * 0.06).toFixed(3)})`;
        prod.style.opacity = (1 - f * 0.55).toFixed(3);
      }
    }
    syncRail();
    pickScene();
  }

  function onScroll() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  if (!reduce && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      onScroll();
    }, { passive: true });
  }

  /* ---------- Hero Stage Controller ---------- */
  function initHeroStage() {
    const hstage = document.getElementById('hstage');
    if (!hstage) return;

    const hs = Array.from(hstage.querySelectorAll('.hslide'));
    const hd = Array.from(document.querySelectorAll('#hdots button'));
    let hi = 0;
    let htimer = null;

    function hgo(n) {
      hi = (n + hs.length) % hs.length;
      hs.forEach((s, i) => s.classList.toggle('on', i === hi));
      hd.forEach((d, i) => d.classList.toggle('on', i === hi));
    }

    function hplay() {
      if (!htimer && !reduce) htimer = setInterval(() => hgo(hi + 1), 3800);
    }

    function hstop() {
      if (htimer) {
        clearInterval(htimer);
        htimer = null;
      }
    }

    hd.forEach((d, i) => {
      d.addEventListener('click', () => {
        hstop();
        hgo(i);
        hplay();
      });
    });

    hstage.addEventListener('mouseenter', hstop);
    hstage.addEventListener('mouseleave', hplay);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? hplay() : hstop()));
      }, { threshold: 0.2 }).observe(hstage);
    } else {
      hplay();
    }
  }

  /* ---------- Lifecycle Initializer ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initHeroStage();
    frame();
  });

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', () => {
      initReveals();
      initHeroStage();
      frame();
    });
    document.addEventListener('shopify:section:select', () => {
      initReveals();
      initHeroStage();
      frame();
    });
  }
})();
