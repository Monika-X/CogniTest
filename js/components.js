/**
 * CogniTest - Shared HTML Components
 * Injects Navbar, Footer, Loader, Back-to-Top into every page
 */

const SITE_ROOT = (function() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  if (path.includes('/dashboard')) return '../';
  return './';
})();

const SVG_ICONS = {
  logo: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  bank: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3L2 10h20L12 3z"/></svg>`,
  gov: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7h20L12 2zM4 10v9M9 10v9M15 10v9M20 10v9M2 21h20"/></svg>`,
  money: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  chart: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  train: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M4 11h16M12 3v8M8 19l-3 3M16 19l3 3M9 19h6"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  gear: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  flask: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55A1 1 0 0 0 5.617 22h12.766a1 1 0 0 0 .897-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2M8.5 2h7M7 16h10"/></svg>`,
  layers: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.55.64 2.92 1.66 3.9.76.76 1.23 1.52 1.41 2.5h6z"/></svg>`,
  teacher: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  trophy: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`,
  creditCard: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  book: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  telegram: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`,
  login: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>`
};

// Bind click-to-open behaviour on every .profile-menu (idempotent)
const initProfileMenus = () => {
  const closeMenu = (menu) => {
    menu.classList.remove('open');
    menu.querySelector('.profile-toggle')?.setAttribute('aria-expanded', 'false');
  };
  document.querySelectorAll('.profile-menu').forEach(menu => {
    if (menu.dataset.profileBound) return;
    menu.dataset.profileBound = 'true';
    const toggle = menu.querySelector('.profile-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !menu.classList.contains('open');
      document.querySelectorAll('.profile-menu.open').forEach(other => { if (other !== menu) closeMenu(other); });
      menu.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
    menu.querySelectorAll('.dropdown-link').forEach(link => {
      link.addEventListener('click', () => closeMenu(menu));
    });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) closeMenu(menu);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu(menu);
    });
  });
};

const injectComponents = () => {
  // Dashboard uses its own app shell; no-header-footer pages skip navbar/footer chrome
  const isDashboardLayout = document.body.classList.contains('dashboard-body');
  const noHeaderFooter = document.body.hasAttribute('data-no-header-footer') || 
                         document.body.hasAttribute('data-no-nav-footer');
  const navOnly = document.body.hasAttribute('data-nav-only');

  if (isDashboardLayout || noHeaderFooter) {
    if (noHeaderFooter && !isDashboardLayout && !document.querySelector('.top-right-controls')) {
      const controls = document.createElement('div');
      controls.className = 'top-right-controls';
      controls.innerHTML = `
        <button class="nav-action-btn" data-theme-toggle aria-label="Toggle theme" title="Toggle Light/Dark Mode">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="nav-action-btn" data-rtl-toggle aria-label="Toggle RTL" style="font-size:0.7rem;font-weight:700;font-family:var(--font-heading)" title="Toggle RTL/LTR">RTL</button>
      `;
      document.body.prepend(controls);
    }
    initProfileMenus();
    return;
  }

  // ===== LOADER =====
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = `
    <div class="loader-inner">
      <div class="loader-logo">CogniTest</div>
      <div class="loader-bar"><div class="loader-fill"></div></div>
    </div>`;
  document.body.prepend(loader);

  // ===== NAVBAR =====
  const navHTML = `
  <nav id="main-navbar" class="navbar" role="navigation" aria-label="Main Navigation">
    <div class="nav-container">
      <!-- Logo -->
      <a href="${SITE_ROOT}index.html" class="nav-logo" aria-label="CogniTest Home">
        <div class="nav-logo-icon" aria-hidden="true">${SVG_ICONS.logo}</div>
        <div class="nav-logo-text">
          <span class="nav-logo-primary">CogniTest</span>
          <span class="nav-logo-tagline">Excel. Qualify. Succeed.</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <div class="nav-links" role="menubar">

        <div class="nav-item" role="none">
          <a href="${SITE_ROOT}index.html" class="nav-link" role="menuitem">Home</a>
        </div>

        <div class="nav-item" role="none">
          <a href="${SITE_ROOT}pages/home2.html" class="nav-link" role="menuitem">Home 2</a>
        </div>

        <div class="nav-item" role="none">
          <a href="${SITE_ROOT}pages/about.html" class="nav-link" role="menuitem">About</a>
        </div>

        <!-- Courses Mega -->
        <div class="nav-item" role="none">
          <a href="${SITE_ROOT}pages/courses.html" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false">
            Courses <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="dropdown-menu mega" role="menu">
            <div>
              <div class="dropdown-section-title">Banking</div>
              <a href="${SITE_ROOT}pages/courses.html#banking" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.bank}</div>IBPS PO / Clerk</a>
              <a href="${SITE_ROOT}pages/courses.html#banking" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.gov}</div>SBI PO / Clerk</a>
              <a href="${SITE_ROOT}pages/courses.html#banking" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.money}</div>RBI Grade B</a>
              <a href="${SITE_ROOT}pages/courses.html#banking" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.chart}</div>NABARD</a>
            </div>
            <div>
              <div class="dropdown-section-title">Government</div>
              <a href="${SITE_ROOT}pages/courses.html#ssc" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.clipboard}</div>SSC CGL / CHSL</a>
              <a href="${SITE_ROOT}pages/courses.html#railways" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.train}</div>Railway RRB NTPC</a>
              <a href="${SITE_ROOT}pages/courses.html#railways" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.shield}</div>Defence CDS / NDA</a>
              <a href="${SITE_ROOT}pages/courses.html#ssc" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.zap}</div>State PSC</a>
            </div>
            <div>
              <div class="dropdown-section-title">Engineering</div>
              <a href="${SITE_ROOT}pages/courses.html#engineering" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.gear}</div>JEE Main & Advanced</a>
              <a href="${SITE_ROOT}pages/courses.html#engineering" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.flask}</div>GATE</a>
              <a href="${SITE_ROOT}pages/courses.html#engineering" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.layers}</div>ISRO / DRDO</a>
              <a href="${SITE_ROOT}pages/courses.html#engineering" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.lightbulb}</div>ESE / IES</a>
            </div>
          </div>
        </div>

        <div class="nav-item" role="none">
          <a href="${SITE_ROOT}pages/services.html" class="nav-link" role="menuitem">Services</a>
        </div>

        <div class="nav-item" role="none">
          <a href="${SITE_ROOT}pages/blog.html" class="nav-link" role="menuitem">Blog</a>
        </div>

        <div class="nav-item" role="none">
          <a href="${SITE_ROOT}pages/contact.html" class="nav-link" role="menuitem">Contact</a>
        </div>

        <!-- More Dropdown -->
        <div class="nav-item" role="none">
          <a href="#" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false">
            More <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="dropdown-menu" role="menu">
            <a href="${SITE_ROOT}pages/faculty.html" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.teacher}</div>Faculty</a>
            <a href="${SITE_ROOT}pages/results.html" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.trophy}</div>Results</a>
            <a href="${SITE_ROOT}pages/fees.html" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.creditCard}</div>Fees & Plans</a>
          </div>
        </div>

      </div>

      <!-- Actions -->
      <div class="nav-actions">
        <!-- Profile Menu -->
        <div class="profile-menu" id="profile-menu">
          <button class="nav-action-btn profile-toggle" id="profile-toggle" aria-haspopup="true" aria-expanded="false" aria-label="Account menu" title="Account">
            ${SVG_ICONS.user}
          </button>
          <div class="dropdown-menu profile-dropdown" role="menu" aria-label="Account Menu">
            <a href="${SITE_ROOT}pages/dashboard.html" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.dashboard}</div>User Dashboard</a>
            <a href="${SITE_ROOT}pages/dashboard.html#admin" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.shield}</div>Admin Dashboard</a>
            <div class="profile-dropdown-divider" role="separator"></div>
            <a href="${SITE_ROOT}pages/login.html" class="dropdown-link" role="menuitem"><div class="dropdown-link-icon">${SVG_ICONS.login}</div>Login / Signup</a>
          </div>
        </div>
        <button class="nav-action-btn" data-theme-toggle id="theme-toggle" aria-label="Toggle theme" title="Toggle Light/Dark Mode">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="nav-action-btn" data-rtl-toggle id="rtl-toggle" aria-label="Toggle RTL" style="font-size:0.7rem;font-weight:700;font-family:var(--font-heading)" title="Toggle RTL/LTR">RTL</button>
        <a href="${SITE_ROOT}pages/signup.html" class="btn btn-primary btn-sm">Get Started</a>
      </div>

      <!-- Hamburger -->
      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- Mobile Nav -->
  <div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
    <div class="mobile-nav-inner">
      <a href="${SITE_ROOT}index.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.home}</span> Home</a>
      <a href="${SITE_ROOT}pages/home2.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.home}</span> Home 2</a>
      <a href="${SITE_ROOT}pages/about.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.info}</span> About</a>
      <a href="${SITE_ROOT}pages/courses.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.book}</span> Courses</a>
      <a href="${SITE_ROOT}pages/services.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.star}</span> Services</a>
      <a href="${SITE_ROOT}pages/blog.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.edit}</span> Blog</a>
      <a href="${SITE_ROOT}pages/contact.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.phone}</span> Contact</a>
      <a href="${SITE_ROOT}pages/faculty.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.teacher}</span> Faculty</a>
      <a href="${SITE_ROOT}pages/results.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.trophy}</span> Results</a>
      <a href="${SITE_ROOT}pages/fees.html" class="mobile-nav-link"><span class="dropdown-link-icon">${SVG_ICONS.creditCard}</span> Fees & Plans</a>
      <div class="mobile-nav-divider"></div>
      <div class="mobile-nav-cta">
        <a href="${SITE_ROOT}pages/login.html" class="btn btn-outline w-full">Login</a>
        <a href="${SITE_ROOT}pages/signup.html" class="btn btn-primary w-full">Get Started Free</a>
      </div>
    </div>
  </div>`;

  const navContainer = document.createElement('div');
  navContainer.innerHTML = navHTML;
  document.body.insertBefore(navContainer, document.body.firstChild);

  if (navOnly) {
    initProfileMenus();
    return;
  }

  // ===== FOOTER =====
  const footerHTML = `
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <!-- Col 1: Brand -->
        <div class="footer-brand">
          <a href="${SITE_ROOT}index.html" class="nav-logo" style="margin-bottom:var(--space-4)">
            <div class="nav-logo-icon">${SVG_ICONS.logo}</div>
            <div class="nav-logo-text">
              <span class="nav-logo-primary">CogniTest</span>
              <span class="nav-logo-tagline">Excel. Qualify. Succeed.</span>
            </div>
          </a>
          <p>India's most exclusive destination for competitive exam preparation. A curated sanctuary where every aspirant reaches their full potential.</p>
          <div class="footer-socials" aria-label="Social Media Links">
            <a href="#" class="footer-social" aria-label="Instagram" title="Follow us on Instagram">${SVG_ICONS.instagram}</a>
            <a href="#" class="footer-social" aria-label="Facebook" title="Follow us on Facebook">${SVG_ICONS.facebook}</a>
            <a href="#" class="footer-social" aria-label="Twitter/X" title="Follow us on X">${SVG_ICONS.twitter}</a>
            <a href="#" class="footer-social" aria-label="YouTube" title="Subscribe on YouTube">${SVG_ICONS.youtube}</a>
          </div>
        </div>

        <!-- Col 2: Courses / Categories -->
        <div>
          <div class="footer-heading">COURSES</div>
          <div class="footer-links">
            <a href="${SITE_ROOT}pages/courses.html#banking" class="footer-link">Banking (IBPS / SBI)</a>
            <a href="${SITE_ROOT}pages/courses.html#ssc" class="footer-link">SSC CGL / CHSL</a>
            <a href="${SITE_ROOT}pages/courses.html#railways" class="footer-link">Railways RRB</a>
            <a href="${SITE_ROOT}pages/courses.html#engineering" class="footer-link">JEE Main & Advanced</a>
            <a href="${SITE_ROOT}pages/courses.html#engineering" class="footer-link">GATE Preparation</a>
          </div>
        </div>

        <!-- Col 3: Navigation (Matches Top Navbar Sequence) -->
        <div>
          <div class="footer-heading">NAVIGATION</div>
          <div class="footer-links">
            <a href="${SITE_ROOT}index.html" class="footer-link">Home</a>
            <a href="${SITE_ROOT}pages/home2.html" class="footer-link">Home 2</a>
            <a href="${SITE_ROOT}pages/about.html" class="footer-link">About</a>
            <a href="${SITE_ROOT}pages/services.html" class="footer-link">Services</a>
            <a href="${SITE_ROOT}pages/blog.html" class="footer-link">Blog</a>
            <a href="${SITE_ROOT}pages/contact.html" class="footer-link">Contact</a>
          </div>
        </div>

        <!-- Col 4: Newsletter Form (The Private List style) -->
        <div class="footer-newsletter-col">
          <div class="footer-heading">EXAM UPDATES</div>
          <p class="footer-newsletter-text">Receive exclusive exam notifications, free mock test alerts, and study insights before anyone else.</p>
          <form class="footer-inline-form" id="footer-newsletter-form" novalidate>
            <div class="footer-inline-input-wrap">
              <input type="email" class="footer-inline-input" id="footer-email-input" placeholder="Your email" required aria-label="Your Email Address">
              <button type="submit" class="btn btn-primary footer-inline-btn">JOIN</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Divider Line with Ring Dot in Center -->
      <div class="footer-divider-wrap">
        <div class="footer-divider-line"></div>
        <div class="footer-divider-badge">
          <div class="footer-divider-dot"></div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-bottom-text">© 2026 CogniTest. All rights reserved. Established 2024, India.</p>
        <div class="footer-bottom-links">
          <a href="${SITE_ROOT}pages/privacy-policy.html" class="footer-bottom-link">Privacy Policy</a>
          <a href="${SITE_ROOT}pages/terms-conditions.html" class="footer-bottom-link">Terms & Conditions</a>
          <a href="${SITE_ROOT}pages/sitemap.html" class="footer-bottom-link">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>`;

  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = footerHTML;
  else document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ===== FOOTER NEWSLETTER SUBMIT =====
  const newsletterForm = document.getElementById('footer-newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('footer-email-input');
      if (input && input.value.trim() !== '' && input.value.includes('@')) {
        if (window.CogniTest && window.CogniTest.Toast) {
          window.CogniTest.Toast.show('Successfully subscribed to exam updates!', 'success');
        } else {
          alert('Successfully subscribed to exam updates!');
        }
        input.value = '';
      } else {
        if (window.CogniTest && window.CogniTest.Toast) {
          window.CogniTest.Toast.show('Please enter a valid email address.', 'error');
        } else {
          alert('Please enter a valid email address.');
        }
      }
    });
  }

  // ===== BACK TO TOP =====
  document.body.insertAdjacentHTML('beforeend', `
    <button id="back-to-top" aria-label="Back to top" title="Back to Top">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  `);

  // ===== TOAST CONTAINER =====
  document.body.insertAdjacentHTML('beforeend', `<div class="toast-container" id="toast-container"></div>`);

  // ===== PROFILE DROPDOWN =====
  initProfileMenus();
};

document.addEventListener('DOMContentLoaded', injectComponents);

