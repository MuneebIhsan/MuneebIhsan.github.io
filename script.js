const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

const setMenuState = (isOpen) => {
  if (!menuBtn || !nav) return;
  nav.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  const icon = menuBtn.querySelector('span');
  if (icon) icon.textContent = isOpen ? '×' : '☰';
};

menuBtn?.addEventListener('click', () => {
  setMenuState(!nav?.classList.contains('open'));
});

document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('click', event => {
  if (!nav?.classList.contains('open')) return;
  if (nav.contains(event.target) || menuBtn?.contains(event.target)) return;
  setMenuState(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    setMenuState(false);
    menuBtn?.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 700) setMenuState(false);
});

document.getElementById('year').textContent = new Date().getFullYear();


const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxStage = document.getElementById('lightboxStage');

let activeGallery = [];
let activeIndex = 0;
let lastFocusedElement = null;
let touchStartX = 0;

const updateLightbox = () => {
  if (!activeGallery.length || !lightboxImage) return;

  const item = activeGallery[activeIndex];
  const img = item.querySelector('img');
  const project = item.closest('.featured-project');
  const projectTitle = project?.querySelector('h3')?.textContent?.trim() || 'Gameplay Screenshot';

  lightboxImage.src = item.getAttribute('href') || img?.src || '';
  lightboxImage.alt = img?.alt || projectTitle;
  lightboxTitle.textContent = projectTitle;
  lightboxCounter.textContent = `${activeIndex + 1} / ${activeGallery.length}`;

  const showNavigation = activeGallery.length > 1;
  lightboxPrev.hidden = !showNavigation;
  lightboxNext.hidden = !showNavigation;
};

const openLightbox = (link) => {
  const gallery = link.closest('.game-gallery');
  if (!gallery || !lightbox) return;

  activeGallery = [...gallery.querySelectorAll('a')];
  activeIndex = Math.max(0, activeGallery.indexOf(link));
  lastFocusedElement = document.activeElement;

  updateLightbox();

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');

  if (lightboxImage) {
    lightboxImage.src = '';
  }

  lastFocusedElement?.focus?.();
};

const moveLightbox = (direction) => {
  if (!activeGallery.length) return;
  activeIndex = (activeIndex + direction + activeGallery.length) % activeGallery.length;
  updateLightbox();
};

document.querySelectorAll('.game-gallery a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    openLightbox(link);
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => moveLightbox(-1));
lightboxNext?.addEventListener('click', () => moveLightbox(1));

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', event => {
  if (!lightbox?.classList.contains('open')) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeLightbox();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    moveLightbox(-1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    moveLightbox(1);
  }
});

lightboxStage?.addEventListener('touchstart', event => {
  touchStartX = event.changedTouches[0]?.screenX || 0;
}, { passive: true });

lightboxStage?.addEventListener('touchend', event => {
  const touchEndX = event.changedTouches[0]?.screenX || 0;
  const delta = touchEndX - touchStartX;

  if (Math.abs(delta) < 45) return;
  moveLightbox(delta > 0 ? -1 : 1);
}, { passive: true });


const backToTop = document.getElementById('backToTop');

const updateBackToTop = () => {
  backToTop?.classList.toggle('visible', window.scrollY > 650);
};

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

backToTop?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
});
