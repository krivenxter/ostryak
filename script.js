// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

if (menuToggle && navMobile) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('open');
    const isOpen = navMobile.classList.contains('open');
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMobile.classList.remove('open');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
    });
  });
}

// Marquee seamless loop
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  const group = document.querySelector('.marquee-group');
  if (!track || !group) return;
  const width = group.offsetWidth;
  track.style.setProperty('--marquee-width', `${width}px`);
  // Adjust duration based on width so speed stays consistent (~100px/s)
  const duration = Math.max(15, width / 100);
  track.style.setProperty('--marquee-duration', `${duration}s`);
}
initMarquee();
window.addEventListener('resize', initMarquee);

// Scroll reveal animations with stagger
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '-40px 0px',
});

revealElements.forEach((el) => revealObserver.observe(el));

// Stagger children within grids
const staggerContainers = document.querySelectorAll('.cards-grid, .menu-preview-grid, .menu-layout, .spice-grid, .events-grid, .contacts-grid, .gallery-split');
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.reveal, .card, .menu-preview-card, .menu-category, .spice-card, .events-text, .contacts-card, .gallery-cell');
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.08}s`;
        child.classList.add('visible');
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.05,
  rootMargin: '-20px 0px',
});

staggerContainers.forEach((el) => staggerObserver.observe(el));

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
  lastScroll = currentScroll;
}, { passive: true });

// Hero parallax
const heroBg = document.querySelector('.hero-bg img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.25}px) scale(1.1)`;
      }
    }
  }, { passive: true });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Menu modal
const menuModal = document.getElementById('menuModal');
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');

function openMenu() {
  if (!menuModal) return;
  menuModal.classList.add('active');
  menuModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
  if (closeMenuBtn) closeMenuBtn.focus();
}

function closeMenu() {
  if (!menuModal) return;
  menuModal.classList.remove('active');
  menuModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
  if (openMenuBtn) openMenuBtn.focus();
}

if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
document.querySelectorAll('[data-open-menu]').forEach((card) => {
  card.addEventListener('click', openMenu);
});
if (menuModal) {
  menuModal.addEventListener('click', (e) => {
    if (e.target === menuModal || e.target.classList.contains('menu-modal-backdrop')) {
      closeMenu();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('active')) {
      closeMenu();
    }
  });
}

// Mouse glow effect on cards
document.querySelectorAll('.card, .menu-preview-card, .spice-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add('visible'));
}
