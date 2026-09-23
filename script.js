const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.getElementById('year').textContent = new Date().getFullYear();
