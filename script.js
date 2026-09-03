/* ═══════════════════════════════════════════════════════════════════
   VRGC — SCRIPT.JS
   Cinematic Loader · Awwwards-quality scroll & parallax
   Page transitions · Navbar · Mobile menu · Utility functions
   Zero external dependencies beyond what's in the HTML.
   ═══════════════════════════════════════════════════════════════════ */

'use strict';







/* ─────────────────────────────────────────────────────────────────
   2. NAVBAR — scroll class + mobile toggle
   ───────────────────────────────────────────────────────────────── */
(function initNavbar() {
  const nav    = document.getElementById('ink-navbar');
  const toggle = document.getElementById('mobileToggle');
  const links  = document.getElementById('navLinks');

  if (nav) {
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled',          y > 40);
      nav.classList.toggle('nav-scrolled-deep', y > window.innerHeight * 0.55);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', links.classList.contains('nav-open'));
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) links.classList.remove('nav-open');
    });
  }
})();


/* ─────────────────────────────────────────────────────────────────
   3. AWWWARDS-QUALITY SCROLL SYSTEM
   Uses a single rAF loop for buttery 60fps transforms.
   Parallax, reveal, title scrub — all in one smooth tick.
   ───────────────────────────────────────────────────────────────── */
(function initScrollSystem() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── A. Reveal Observer — sections slide up on enter ── */
  const revealItems = [];

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseFloat(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('is-visible');
          if (el.classList.contains('reveal-parent') || el.classList.contains('ink-hero-content')) {
            el.classList.add('is-revealed');
          }
        }, delay * 1000);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -50px 0px' });

  function registerReveal(selector, stagger = false) {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (!el.classList.contains('will-reveal') && !el.classList.contains('reveal-parent') && !el.classList.contains('ink-hero-content')) {
        el.classList.add('will-reveal');
      }
      if (stagger) {
        const d = (i * 0.07).toFixed(2);
        el.dataset.delay         = d;
        el.style.transitionDelay = d + 's';
      }
      revealObserver.observe(el);
      revealItems.push(el);
    });
  }


  if (!reduced) {
    // Sections — reveal as one block
    [
      '.citadel-stats-bar',
      '.community-live-ticker-wrap',
      '#discord-preview',
      '#life-gallery',
      '#spotlights',
      '#membership-tiers',
      '#weekly-calendar',
      '.reg-section-wrap',
      '.gta-wheel-section',
      '.trust-signals-bar',
      '.ink-studio-light > div',
      '.calm-arena-section',
      '.reveal-parent',
      '.ink-hero-content',
    ].forEach(s => registerReveal(s));

    // Grids — stagger children
    [
      '.tourney-grid > .tourney-card',
      '.discord-features-grid > .df-card',
      '.campus-gallery-grid > .cg-card',
      '.membership-tiers-grid > .tier-card',
      '.circular-team-grid > .circ-member-card',
      '.spotlight-grid > .spotlight-card',
      '.dept-grid > div',
    ].forEach(s => registerReveal(s, true));
  }

  /* ── B. rAF-based Parallax Loop ── */
  if (reduced) return;

  let scrollY   = window.scrollY;
  let mouseX    = 0;
  let mouseY    = 0;
  let rafId     = null;
  let dirty     = true;

  window.addEventListener('scroll', () => { scrollY = window.scrollY; dirty = true; }, { passive: true });
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;  // -1 to +1
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    dirty  = true;
  }, { passive: true });

  // Hero parallax elements
  const heroTitle   = document.querySelector('.ink-mega-title');
  const heroSub     = document.querySelector('.ink-hero-sub');
  const heroBadge   = document.querySelector('.hero-badge-pill');
  const heroActions = document.querySelector('.ink-hero-actions');
  const heroBg      = document.querySelector('.hero-ambient-canvas');
  const heroScrim   = document.querySelector('.ink-hero-video-scrim');

  // Polaroid photos (studio page)
  const polaroids = Array.from(document.querySelectorAll('.iss-floating-photo'));

  // Studio page colored ambient blobs
  const studioSection = document.querySelector('.ink-studio-light');

  // Floating ipb cards (events page)
  const floatCards = Array.from(document.querySelectorAll('.ipb-floating-card'));

  function tick() {
    if (!dirty) { rafId = requestAnimationFrame(tick); return; }
    dirty = false;

    const vh = window.innerHeight;
    const progress = Math.min(scrollY / vh, 1); // 0-1 over first viewport

    // ── Hero content parallax
    if (heroTitle && scrollY < vh * 1.2) {
      const y = scrollY * 0.28;
      const scale = Math.max(0.88, 1 - scrollY * 0.00025);
      const opacity = Math.max(0, 1 - scrollY / (vh * 0.75));
      heroTitle.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
      heroTitle.style.opacity   = opacity;
    }
    if (heroSub && scrollY < vh) {
      heroSub.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
      heroSub.style.opacity   = Math.max(0, 1 - scrollY / (vh * 0.6));
    }
    if (heroBadge && scrollY < vh) {
      heroBadge.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
      heroBadge.style.opacity   = Math.max(0, 1 - scrollY / (vh * 0.55));
    }
    if (heroActions && scrollY < vh) {
      heroActions.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
      heroActions.style.opacity   = Math.max(0, 1 - scrollY / (vh * 0.58));
    }

    // ── Hero background parallax + mouse tilt
    if (heroBg) {
      const bgY = scrollY * 0.45;
      const tX  = mouseX * 8;
      const tY  = mouseY * 6;
      heroBg.style.transform = `translate3d(${tX}px, calc(${bgY}px + ${tY}px), 0) scale(1.12)`;
    }

    // ── Polaroids (studio page)
    polaroids.forEach((el, i) => {
      const rect    = el.getBoundingClientRect();
      const visible = rect.top < vh && rect.bottom > 0;
      if (visible) {
        const rel = (vh - rect.top) * (0.06 + i * 0.022);
        el.style.transform = `translate3d(0, ${-rel}px, 0)`;
      }
    });

    // ── Studio Color Morph (White -> Dark)
    if (studioSection) {
      // Morph between 50px and 450px scroll depth
      let p = (scrollY - 50) / 400;
      p = Math.max(0, Math.min(1, p));
      
      // bg: #F0F4F8 -> #05000A (240,244,248 -> 5,0,10)
      const r = Math.round(240 - p * (240 - 5));
      const g = Math.round(244 - p * (244 - 0));
      const b = Math.round(248 - p * (248 - 10));
      studioSection.style.backgroundColor = `rgb(${r},${g},${b})`;
      
      // text (h1/h2): #05000A -> #FFFFFF
      const tr = Math.round(5 + p * (255 - 5));
      const tg = Math.round(0 + p * (255 - 0));
      const tb = Math.round(10 + p * (255 - 10));
      const textColor = `rgb(${tr},${tg},${tb})`;
      
      const title = studioSection.querySelector('.isl-title');
      if (title) title.style.color = textColor;
      
      const tag = studioSection.querySelector('.ink-sec-tag-dark');
      if (tag) tag.style.color = `rgba(${tr},${tg},${tb},0.75)`;
      
      const h2s = studioSection.querySelectorAll('h2');
      h2s.forEach(h2 => h2.style.color = textColor);

      // desc/subtext: #1e293b -> #94a3b8 (30,41,59 -> 148,163,184)
      const dr = Math.round(30 + p * (148 - 30));
      const dg = Math.round(41 + p * (163 - 41));
      const db = Math.round(59 + p * (184 - 59));
      const descColor = `rgb(${dr},${dg},${db})`;
      
      const desc = studioSection.querySelector('.isl-desc');
      if (desc) desc.style.color = descColor;
      
      const circNames = studioSection.querySelectorAll('.circ-name');
      circNames.forEach(cn => cn.style.color = textColor);
      
      const circBios = studioSection.querySelectorAll('.circ-bio');
      circBios.forEach(cb => cb.style.color = descColor);
    }

    // ── Floating event cards
    floatCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        const speed   = 0.08 + i * 0.035;
        const offset  = (vh - rect.top) * speed;
        const baseRot = i % 2 === 0 ? -10 : 10;
        card.style.transform = `translate3d(0, ${-offset}px, 0) rotate(${baseRot + offset * 0.04}deg)`;
      }
    });

    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

})();


/* ─────────────────────────────────────────────────────────────────
   4. COUNT-UP NUMBERS
   ───────────────────────────────────────────────────────────────── */
(function initCountUp() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function countUp(el, finalText, target, duration) {
    if (reduced) { el.textContent = finalText; return; }
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(easeOutCubic(p) * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = finalText;
    };
    requestAnimationFrame(tick);
  }

  document.querySelectorAll('.csb-val').forEach(el => {
    const finalText = el.textContent.trim();
    const match     = finalText.match(/[\d,]+/);
    if (!match) return;
    const num = parseInt(match[0].replace(/,/g, ''), 10);
    if (!num) return;
    el.textContent = '0';
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { countUp(el, finalText, num, 1600); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
  });
})();





/* ─────────────────────────────────────────────────────────────────
   6. WHEEL CATEGORY SWITCHING (ABOUT PAGE)
   ───────────────────────────────────────────────────────────────── */
function switchWheelCategory(cat, btn) {
  document.querySelectorAll('.gta-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (typeof renderWheel === 'function') renderWheel(cat);
}


/* ─────────────────────────────────────────────────────────────────
   7. EVENTS PAGE — FILTER PILLS
   ───────────────────────────────────────────────────────────────── */
function filterTourneys(cat, btn) {
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const cards      = document.querySelectorAll('#tourneyGrid .tourney-card');
  const emptyState = document.getElementById('tourneyEmptyState');
  let visible = 0;
  cards.forEach(card => {
    const show = cat === 'all' || card.getAttribute('data-cat') === cat;
    if (show) {
      card.style.display = 'flex';
      setTimeout(() => card.style.opacity = '1', 10);
    } else {
      card.style.opacity = '0';
      setTimeout(() => { card.style.display = 'none'; }, 220);
    }
    if (show) visible++;
  });
  if (emptyState) emptyState.classList.toggle('active', visible === 0);
}


/* ─────────────────────────────────────────────────────────────────
   8. COMMUNITY PAGE — LIVE ARENA STAGE SWITCHER (live.html)
   ───────────────────────────────────────────────────────────────── */
function switchStage(stageId, btn) {
  document.querySelectorAll('.stage-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.stage-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('stage-' + stageId);
  if (panel) panel.classList.add('active');
}



