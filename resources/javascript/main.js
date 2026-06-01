/* ============================================
   ROBERT BERNHARDT — main.js
   scroll reveals, stat bar animation, nav active
   ============================================ */

(function () {
  'use strict';

  // ——————————————————————————
  // 1. SCROLL REVEAL
  // ——————————————————————————

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ——————————————————————————
  // 2. STAT BARS — ANIMATE ON SCROLL
  // ——————————————————————————

  const statFills = document.querySelectorAll('.stat__fill');

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statFills.forEach((fill) => statsObserver.observe(fill));

  // ——————————————————————————
  // 3. ACTIVE NAV LINK ON SCROLL
  // ——————————————————————————

  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id], .hero[id]');

  function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
  }

  // throttle scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ——————————————————————————
  // 4. NAV HIDE ON SCROLL DOWN, SHOW ON UP
  // ——————————————————————————

  let lastScrollY = 0;
  const nav = document.getElementById('main-nav');
  const navHeight = nav.offsetHeight;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > navHeight * 2) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
  });

  // ——————————————————————————
  // 5. SMOOTH SCROLL FOR NAV LINKS
  // ——————————————————————————

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const yOffset = -60; // account for fixed nav
        const y = targetEl.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ——————————————————————————
  // 6. PARALLAX GLOW ON HERO (subtle)
  // ——————————————————————————

  const hero = document.querySelector('.hero');

  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      hero.style.setProperty('--glow-x', x + 'px');
      hero.style.setProperty('--glow-y', y + 'px');
    });
  }
})();
