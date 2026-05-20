// ===== PAGE TRANSITION =====
const transition = document.querySelector('.page-transition');

function navigateTo(href) {
  if (transition) {
    transition.classList.add('enter');
    setTimeout(() => { window.location.href = href; }, 500);
  } else {
    window.location.href = href;
  }
}

window.addEventListener('load', () => {
  if (transition) {
    transition.classList.remove('enter');
    transition.classList.add('exit');
    setTimeout(() => { transition.classList.remove('exit'); }, 600);
  }
});

// Intercept nav links for transition
document.querySelectorAll('a[data-transition]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('http')) {
      e.preventDefault();
      navigateTo(href);
    }
  });
});

// ===== PROGRESS BAR =====
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  if (progressBar) {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  }
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
});

function animateRing() {
  if (ring) {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .card, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor?.classList.add('active'); ring?.classList.add('active'); });
  el.addEventListener('mouseleave', () => { cursor?.classList.remove('active'); ring?.classList.remove('active'); });
});

// ===== NAV SCROLL =====
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 50);
  backTop?.classList.toggle('visible', window.scrollY > 400);
});

// ===== BACK TO TOP =====
const backTop = document.getElementById('back-top');
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== ACTIVE NAV =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ===== TYPED EFFECT =====
function typed(el, words, speed = 100) {
  if (!el) return;
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length) { deleting = true; setTimeout(tick, 1800); return; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}
const typedEl = document.getElementById('typed');
if (typedEl) typed(typedEl, ['Data Scientist', 'AI Researcher', 'NLP Engineer', 'Computer Vision Developer', 'MSc Student @ RGU']);

// ===== COUNTER ANIMATION =====
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = target % 1 === 0 ? Math.round(ease * target) : (ease * target).toFixed(0);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }});
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => countObs.observe(el));
