/* ============================================
   ROBERT BERNHARDT — main.js
   v2 — reveals, stats, nav, modals, burger menu
   ============================================ */

(function () {
  'use strict';

  // ——————————————————————————
  // 1. SCROLL REVEAL
  // ——————————————————————————

  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );
  revealEls.forEach((el) => revealObs.observe(el));

  // ——————————————————————————
  // 2. STAT BARS
  // ——————————————————————————

  const statFills = document.querySelectorAll('.stat__fill');
  const statsObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.width + '%';
          statsObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statFills.forEach((f) => statsObs.observe(f));

  // ——————————————————————————
  // 3. ACTIVE NAV LINK
  // ——————————————————————————

  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY + window.innerHeight / 3;
    sections.forEach((s) => {
      if (s.offsetTop <= scrollY) current = s.id;
    });
    navLinks.forEach((l) => {
      l.classList.toggle('active', l.dataset.section === current);
    });
  }

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
  // 4. NAV HIDE / SHOW ON SCROLL
  // ——————————————————————————

  let lastScrollY = 0;
  const nav = document.getElementById('main-nav');
  const navH = nav.offsetHeight;

  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    if (cur > lastScrollY && cur > navH * 2) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScrollY = cur;
  });

  // ——————————————————————————
  // 5. SMOOTH SCROLL NAV LINKS
  // ——————————————————————————

  document.querySelectorAll('.nav__link, .nav__brand').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 56;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      // close mobile menu if open
      closeMobileMenu();
    });
  });

  // ——————————————————————————
  // 6. MOBILE BURGER MENU
  // ——————————————————————————

  const burger = document.getElementById('nav-burger');
  const navLinksWrap = document.getElementById('nav-links');

  function closeMobileMenu() {
    burger.classList.remove('open');
    navLinksWrap.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    navLinksWrap.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinksWrap.classList.contains('open') &&
      !navLinksWrap.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // ——————————————————————————
  // 7. MODAL SYSTEM
  // ——————————————————————————

  const modalOverlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalImageWrap = document.getElementById('modal-image-wrap');
  const modalImage = document.getElementById('modal-image');
  const modalBody = document.getElementById('modal-body');

  // load modal data from embedded JSON
  let modalData = {};
  try {
    const dataScript = document.getElementById('modal-data');
    if (dataScript) modalData = JSON.parse(dataScript.textContent);
  } catch (err) {
    console.warn('modal data parse error:', err);
  }

  function openModal(key) {
    const data = modalData[key];
    if (!data) return;

    // build image
    if (data.image) {
      modalImage.outerHTML = `<img class="modal__image" id="modal-image" src="${data.image}" alt="${data.title}" />`;
    } else {
      // keep placeholder
      const imgEl = document.getElementById('modal-image');
      if (imgEl.tagName === 'IMG') {
        const div = document.createElement('div');
        div.className = 'modal__image placeholder-img';
        div.id = 'modal-image';
        div.textContent = '[ bild ]';
        imgEl.replaceWith(div);
      }
    }

    // build body
    let html = '';
    if (data.label) html += `<span class="modal__label">${data.label}</span>`;
    if (data.title) html += `<h2 class="modal__title">${data.title}</h2>`;

    if (data.blocks) {
      data.blocks.forEach((b) => {
        if (!b.text && !b.images) return;
        html += `<div class="modal__block modal__block--${b.type}">`;
        if (b.label) html += `<span class="modal__block-label">${b.label}</span>`;
        if (b.text) html += `<div class="modal__text"><p>${b.text}</p></div>`;
        if (b.images) {
          html += '<div class="modal__gallery">';
          b.images.forEach((img) => {
            html += `<img src="${img.src}" alt="${img.alt || ''}" />`;
          });
          html += '</div>';
        }
        html += '</div>';
      });
    }

    modalBody.innerHTML = html;

    // open
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // click handlers on cards, book-cards, interest-tiles
  document.querySelectorAll('[data-modal]').forEach((el) => {
    el.addEventListener('click', () => openModal(el.dataset.modal));
  });

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
})();
