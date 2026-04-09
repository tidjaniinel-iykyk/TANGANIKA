// Clean, single-file script for mobile menu and header/footer behaviour
(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');

  let mobileMenu = document.getElementById('mobile-menu');
  let mobileOverlay = document.getElementById('mobile-overlay');

  // create overlay if missing
  if (!mobileOverlay) {
    mobileOverlay = document.createElement('div');
    mobileOverlay.id = 'mobile-overlay';
    mobileOverlay.className = 'mobile-overlay';
    mobileOverlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(mobileOverlay);
  }

  // create mobile menu if missing
  if (!mobileMenu) {
    mobileMenu = document.createElement('nav');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'mobile-menu';
    mobileMenu.setAttribute('role', 'navigation');
    mobileMenu.setAttribute('aria-label', 'Mobile menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.innerHTML = '<button id="mobile-close" class="mobile-close" aria-label="Close menu"></button><ul></ul>';
    document.body.appendChild(mobileMenu);
  }

  // copy desktop links into mobile menu if empty
  try {
    if (mainNav) {
      const desktopLinks = mainNav.querySelectorAll('a');
      const list = mobileMenu.querySelector('ul');
      if (list && list.children.length === 0) {
        desktopLinks.forEach(a => {
          const li = document.createElement('li');
          li.appendChild(a.cloneNode(true));
          list.appendChild(li);
        });
      }
    }
  } catch (err) {
    // fail gracefully
  }

  // header reveal on scroll (homepage only)
  function onScroll() {
    if (!header || !document.body.classList.contains('home')) return;
    if (window.scrollY > 50) header.classList.add('visible'); else header.classList.remove('visible');
  }
  if (document.body.classList.contains('home')) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && !hamburger.hasAttribute('aria-expanded')) hamburger.setAttribute('aria-expanded', 'false');

  const mobileClose = document.getElementById('mobile-close');

  function openMenu() {
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    const main = document.querySelector('#main-content');
    if (main) main.setAttribute('aria-hidden', 'true');
    const focusable = mobileMenu.querySelectorAll('a,button');
    if (focusable.length) focusable[0].focus();
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    const main = document.querySelector('#main-content');
    if (main) main.removeAttribute('aria-hidden');
    if (hamburger) hamburger.focus();
    document.body.classList.remove('menu-open');
  }

  if (hamburger) hamburger.addEventListener('click', () => {
    const open = mobileMenu.getAttribute('aria-hidden') === 'false';
    if (open) closeMenu(); else openMenu();
  });

  mobileOverlay.addEventListener('click', closeMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  try {
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  } catch (err) {}

  // Escape to close + simple focus trap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const open = mobileMenu.getAttribute('aria-hidden') === 'false';
      if (open) closeMenu();
    }
    const open = mobileMenu.getAttribute('aria-hidden') === 'false';
    if (open && e.key === 'Tab') {
      const focusable = mobileMenu.querySelectorAll('a,button');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // footer year
  try {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (err) {}

  // mark current nav link
  (function markCurrentLinks() {
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.split('/').pop() === path) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  })();

})();
