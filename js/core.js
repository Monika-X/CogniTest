/**
 * CogniTest - Core JavaScript Module
 * Handles: Theme, RTL, Navbar, Scroll, Animations, Counters, Toast
 */

'use strict';

// ===== UTILITY FUNCTIONS =====
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const LS = {
  get: (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

// ===== THEME MANAGER =====
const ThemeManager = {
  init() {
    const saved = LS.get('cognitest-theme') || 'dark';
    this.apply(saved);
    $$('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    LS.set('cognitest-theme', theme);
    $$('[data-theme-toggle]').forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    this.apply(current === 'dark' ? 'light' : 'dark');
  },
};

// ===== RTL MANAGER =====
const RTLManager = {
  init() {
    const saved = LS.get('cognitest-dir') || 'ltr';
    this.apply(saved);
    $$('[data-rtl-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },
  apply(dir) {
    document.documentElement.setAttribute('dir', dir);
    LS.set('cognitest-dir', dir);
    $$('[data-rtl-toggle]').forEach(btn => {
      btn.textContent = dir === 'ltr' ? 'RTL' : 'LTR';
      btn.title = dir === 'ltr' ? 'Switch to RTL' : 'Switch to LTR';
    });
  },
  toggle() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    this.apply(current === 'ltr' ? 'rtl' : 'ltr');
  },
};

// ===== NAVBAR =====
const Navbar = {
  init() {
    this.navbar = $('#main-navbar');
    this.hamburger = $('#hamburger');
    this.mobileNav = $('#mobile-nav');
    this.mobileToggleBtns = $$('.mobile-nav-item[data-sub]');

    if (!this.navbar) return;

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.onScroll();

    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileNav());
    }

    this.mobileToggleBtns.forEach(item => {
      item.addEventListener('click', () => this.toggleMobileSub(item));
    });

    // Close mobile nav on link click
    $$('.mobile-nav-link:not([data-sub])').forEach(link => {
      link.addEventListener('click', () => this.closeMobileNav());
    });

    // Active link
    this.setActiveLink();
  },
  onScroll() {
    if (window.scrollY > 20) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  },
  toggleMobileNav() {
    this.hamburger.classList.toggle('active');
    this.mobileNav.classList.toggle('open');
    document.body.style.overflow = this.mobileNav.classList.contains('open') ? 'hidden' : '';
  },
  closeMobileNav() {
    this.hamburger?.classList.remove('active');
    this.mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  },
  toggleMobileSub(item) {
    const subId = item.dataset.sub;
    const sub = $(`#${subId}`);
    if (sub) {
      sub.classList.toggle('open');
      const icon = item.querySelector('.mobile-arrow');
      if (icon) icon.style.transform = sub.classList.contains('open') ? 'rotate(180deg)' : '';
    }
  },
  setActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    $$('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href')?.split('/').pop();
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  },
};

// ===== BACK TO TOP =====
const BackToTop = {
  init() {
    this.btn = $('#back-to-top');
    if (!this.btn) return;
    window.addEventListener('scroll', () => {
      this.btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
};

// ===== PAGE LOADER =====
const PageLoader = {
  init() {
    this.loader = $('#page-loader');
    if (!this.loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.loader.classList.add('hidden');
      }, 800);
    });
  },
};

// ===== SCROLL REVEAL =====
const ScrollReveal = {
  observer: null,
  init() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      this.observer.observe(el);
    });
  },
};

// ===== ANIMATED COUNTERS =====
const CounterAnimation = {
  init() {
    const counters = $$('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  },
  animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration) || 2000;
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const start = performance.now();

    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },
};

// ===== FAQ ACCORDION =====
const FAQAccordion = {
  init() {
    $$('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        $$('.faq-item.open').forEach(openItem => openItem.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  },
};

// ===== HERO SLIDER =====
const HeroSlider = {
  current: 0,
  slides: [],
  dots: [],
  timer: null,
  interval: 5000,
  init() {
    const container = $('#hero-slides');
    if (!container) return;
    this.slides = $$('.hero-slide', container);
    this.dots = $$('.hero-dot');
    if (this.slides.length < 2) return;
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });
    this.startAuto();
  },
  goTo(index) {
    this.current = index;
    const container = $('#hero-slides');
    if (container) container.style.transform = `translateX(-${index * 100}%)`;
    this.dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  },
  startAuto() {
    this.timer = setInterval(() => {
      this.goTo((this.current + 1) % this.slides.length);
    }, this.interval);
  },
};

// ===== TOAST SYSTEM =====
const Toast = {
  container: null,
  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },
  show(message, type = 'success', duration = 4000) {
    const icons = { success: '✓', error: '✕', warning: '⚠' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.success}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Close">✕</button>
    `;
    this.container.appendChild(toast);
    const closeBtn = toast.querySelector('.toast-close');
    const remove = () => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; toast.style.transition = '0.3s ease'; setTimeout(() => toast.remove(), 300); };
    closeBtn.addEventListener('click', remove);
    setTimeout(remove, duration);
  },
};

// ===== FORM VALIDATION =====
const FormValidator = {
  rules: {
    required: (val) => val.trim() !== '' || 'This field is required',
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Enter a valid email address',
    phone: (val) => /^[6-9]\d{9}$/.test(val.replace(/\s/g, '')) || 'Enter a valid 10-digit phone number',
    minLength: (min) => (val) => val.length >= min || `Minimum ${min} characters required`,
    maxLength: (max) => (val) => val.length <= max || `Maximum ${max} characters allowed`,
    password: (val) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val) || 'Password must be 8+ chars with uppercase & number',
  },
  validate(form) {
    let isValid = true;
    $$('[data-validate]', form).forEach(field => {
      const rules = field.dataset.validate.split(',');
      let fieldValid = true;
      for (const rule of rules) {
        const [ruleName, param] = rule.trim().split(':');
        const validator = this.rules[ruleName];
        if (!validator) continue;
        const fn = param ? validator(param) : validator;
        const result = fn(field.value);
        if (result !== true) {
          this.showError(field, result);
          fieldValid = false;
          isValid = false;
          break;
        }
      }
      if (fieldValid) this.clearError(field);
    });
    return isValid;
  },
  showError(field, message) {
    field.classList.add('error');
    const error = field.nextElementSibling;
    if (error?.classList.contains('form-error')) {
      error.textContent = message;
      error.classList.add('show');
    }
  },
  clearError(field) {
    field.classList.remove('error');
    const error = field.nextElementSibling;
    if (error?.classList.contains('form-error')) {
      error.classList.remove('show');
    }
  },
  initRealTime(form) {
    $$('[data-validate]', form).forEach(field => {
      field.addEventListener('input', () => {
        const rules = field.dataset.validate.split(',');
        let valid = true;
        for (const rule of rules) {
          const [ruleName, param] = rule.trim().split(':');
          const validator = this.rules[ruleName];
          if (!validator) continue;
          const fn = param ? validator(param) : validator;
          const result = fn(field.value);
          if (result !== true) {
            this.showError(field, result);
            valid = false;
            break;
          }
        }
        if (valid) this.clearError(field);
      });
    });
  },
};

// ===== SMOOTH SCROLL LINKS =====
const SmoothScroll = {
  init() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = $(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = parseInt(link.dataset.offset) || 100;
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth',
          });
        }
      });
    });
  },
};

// ===== TABS =====
const Tabs = {
  init() {
    $$('[data-tabs]').forEach(tabContainer => {
      const tabBtns = $$('[data-tab]', tabContainer);
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const tabId = btn.dataset.tab;
          const panelContainer = $(tabContainer.dataset.tabs);
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (panelContainer) {
            $$('[data-panel]', panelContainer).forEach(panel => {
              panel.style.display = panel.dataset.panel === tabId ? 'block' : 'none';
            });
          }
        });
      });
    });
  },
};

// ===== SIMPLE BAR CHART (Canvas) =====
const BarChart = {
  draw(canvasId, data, labels, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.offsetWidth || canvas.parentElement?.clientWidth || 360;
    const h = canvas.offsetHeight || canvas.parentElement?.clientHeight || 220;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    const pad = { top: 20, right: 20, bottom: 50, left: 50 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const maxVal = Math.max(...data, 100);
    const barW = (chartW / data.length) * 0.6;
    const gap = (chartW / data.length) * 0.4;
    ctx.clearRect(0, 0, w, h);

    // Grid lines
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (chartH / 5) * i;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,0.6)';
      ctx.font = '11px Manrope, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal - (maxVal / 5) * i), pad.left - 8, y + 4);
    }

    // Bars
    data.forEach((val, i) => {
      const barH = (val / maxVal) * chartH;
      const x = pad.left + i * (chartW / data.length) + gap / 2;
      const y = pad.top + chartH - barH;
      const color = colors?.[i] || '#4338CA';

      // Gradient bar
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '60');
      ctx.fillStyle = grad;
      const r = Math.min(6, barW / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.lineTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();

      // Labels
      if (labels?.[i]) {
        ctx.fillStyle = 'rgba(148,163,184,0.8)';
        ctx.font = '11px Manrope, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barW / 2, pad.top + chartH + 20);
      }

      // Value on bar
      ctx.fillStyle = '#F7F8FA';
      ctx.font = 'bold 11px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(val, x + barW / 2, y - 6);
    });
  },
};

// ===== LINE CHART (Canvas) =====
const LineChart = {
  draw(canvasId, datasets, labels) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.offsetWidth || canvas.parentElement?.clientWidth || 360;
    const h = canvas.offsetHeight || canvas.parentElement?.clientHeight || 220;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    const pad = { top: 20, right: 20, bottom: 50, left: 50 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const allData = datasets.flatMap(d => d.data);
    const maxVal = Math.max(...allData) * 1.1;
    ctx.clearRect(0, 0, w, h);

    // Grid
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (chartH / 5) * i;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,0.5)';
      ctx.font = '11px Manrope, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal - (maxVal / 5) * i), pad.left - 8, y + 4);
    }

    // X labels
    labels?.forEach((label, i) => {
      const x = pad.left + (i / (labels.length - 1)) * chartW;
      ctx.fillStyle = 'rgba(148,163,184,0.6)';
      ctx.font = '11px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, pad.top + chartH + 20);
    });

    // Lines
    datasets.forEach(dataset => {
      const points = dataset.data.map((val, i) => ({
        x: pad.left + (i / (dataset.data.length - 1)) * chartW,
        y: pad.top + chartH - (val / maxVal) * chartH,
      }));

      // Area fill
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
      grad.addColorStop(0, dataset.color + '30');
      grad.addColorStop(1, dataset.color + '00');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(points[0].x, pad.top + chartH);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
      ctx.closePath();
      ctx.fill();

      // Line
      ctx.beginPath();
      ctx.strokeStyle = dataset.color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.stroke();

      // Dots
      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dataset.color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#151923';
        ctx.fill();
      });
    });
  },
};

// ===== DONUT CHART =====
const DonutChart = {
  draw(canvasId, data, colors, labels) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 20;
    const innerRadius = radius * 0.65;
    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = -Math.PI / 2;
    ctx.clearRect(0, 0, w, h);

    data.forEach((value, i) => {
      const angle = (value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, startAngle + angle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      startAngle += angle;
    });

    // Inner hole
    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    ctx.fillStyle = isDark ? '#1e2533' : '#ffffff';
    ctx.fill();

    // Center text
    ctx.fillStyle = '#F7F8FA';
    ctx.font = 'bold 22px Sora, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, cx, cy - 10);
    ctx.fillStyle = 'rgba(148,163,184,0.7)';
    ctx.font = '11px Manrope, sans-serif';
    ctx.fillText('Total', cx, cy + 12);
  },
};

// ===== MODAL =====
const Modal = {
  open(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.addEventListener('click', () => Modal.close(id));
    modal.addEventListener('click', (e) => { if (e.target === modal) Modal.close(id); });
  },
  close(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  },
};

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
  PageLoader.init();
  ThemeManager.init();
  RTLManager.init();
  Navbar.init();
  BackToTop.init();
  ScrollReveal.init();
  CounterAnimation.init();
  FAQAccordion.init();
  HeroSlider.init();
  Toast.init();
  SmoothScroll.init();
  Tabs.init();

  // Add page transition class
  document.body.classList.add('page-transition');
});

const Chart = {
  line(canvasId, datasets, labels) { LineChart.draw(canvasId, datasets, labels); },
  bar(canvasId, data, labels, colors) { BarChart.draw(canvasId, data, labels, colors); },
  donut(canvasId, data, colors, labels) { DonutChart.draw(canvasId, data, colors, labels); }
};

// Export for page-specific usage
window.CogniTest = { Toast, Modal, FormValidator, BarChart, LineChart, DonutChart, Chart, LS };
