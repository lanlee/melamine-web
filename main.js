// Language toggle
let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  const btn = document.getElementById('langBtn');
  btn.textContent = currentLang === 'en' ? '中文' : 'English';
  document.body.classList.toggle('zh', currentLang === 'zh');
  applyLang();
}

function applyLang() {
  const attr = `data-${currentLang}`;
  document.querySelectorAll(`[${attr}]`).forEach(el => {
    const val = el.getAttribute(attr);
    if (val) el.textContent = val;
  });
}

// Sticky nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Hamburger menu
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// Particle canvas
function initParticles() {
  const container = document.getElementById('particles');
  const count = 60;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1;
    Object.assign(dot.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: Math.random() > 0.5 ? 'rgba(96,239,255,0.4)' : 'rgba(167,139,250,0.3)',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animation: `float ${6 + Math.random() * 8}s ease-in-out infinite`,
      animationDelay: Math.random() * 8 + 's',
    });
    container.appendChild(dot);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
      33% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
      66% { transform: translateY(10px) translateX(-8px); opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
}

// Intersection observer for fade-in
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const targets = document.querySelectorAll(
    '.product-card, .app-card, .why-card, .about-grid, .contact-grid, .map-inner, .stat'
  );
  targets.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    observer.observe(el);
  });
}

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const toast = document.getElementById('toast');
  const msgAttr = currentLang === 'zh' ? 'data-zh' : 'data-en';
  const span = toast.querySelector('span');
  if (span) span.textContent = span.getAttribute(msgAttr) || span.textContent;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
  e.target.reset();
}

// Animate stat numbers on scroll
function animateStats() {
  const stats = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const unit = el.querySelector('.stat-unit');
      const unitText = unit ? unit.textContent : '';
      const raw = el.textContent.replace(unitText, '').trim();
      const target = parseFloat(raw.replace(/,/g, ''));
      if (isNaN(target)) return;
      const isDecimal = raw.includes('.');
      const hasSep = raw.includes(',');
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;
        let display = isDecimal ? current.toFixed(1) : Math.round(current).toString();
        if (hasSep && !isDecimal) display = Number(display).toLocaleString();
        el.childNodes[0].textContent = display;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initFadeIn();
  animateStats();
});
