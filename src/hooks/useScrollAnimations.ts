import { useEffect } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Reveal Observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay || '0');
            setTimeout(() => {
              el.classList.add('is-visible');
              if (
                el.classList.contains('reveal-parent') ||
                el.classList.contains('ink-hero-content')
              ) {
                el.classList.add('is-revealed');
              }
            }, delay * 1000);
            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -50px 0px' }
    );

    const selectors = [
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
      '.ink-split-feature',
      '.pillar-cards-grid',
      '.ink-studio-section',
    ];

    if (!reduced) {
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          if (
            !el.classList.contains('will-reveal') &&
            !el.classList.contains('reveal-parent') &&
            !el.classList.contains('ink-hero-content')
          ) {
            el.classList.add('will-reveal');
          }
          revealObserver.observe(el);
        });
      });

      const gridSelectors = [
        '.tourney-grid > .tourney-card',
        '.discord-features-grid > .df-card',
        '.campus-gallery-grid > .cg-card',
        '.membership-tiers-grid > .tier-card',
        '.circular-team-grid > .circ-member-card',
        '.spotlight-grid > .spotlight-card',
        '.dept-grid > div',
        '.pillar-cards-grid > .pillar-card',
      ];

      gridSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el, i) => {
          const htmlEl = el as HTMLElement;
          if (!htmlEl.classList.contains('will-reveal')) {
            htmlEl.classList.add('will-reveal');
          }
          const d = (i * 0.08).toFixed(2);
          htmlEl.dataset.delay = d;
          htmlEl.style.transitionDelay = `${d}s`;
          revealObserver.observe(htmlEl);
        });
      });
    }

    // 2. Parallax and Floating Cards
    let scrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const floatingCards = Array.from(
      document.querySelectorAll<HTMLElement>('.ipb-floating-card, .iss-floating-photo, .polaroid-float')
    );

    const tick = () => {
      if (!reduced && floatingCards.length > 0) {
        floatingCards.forEach((card, idx) => {
          const speed = (idx + 1) * 0.05;
          const factorX = (idx % 2 === 0 ? 1 : -1) * 15 * speed;
          const factorY = (idx % 3 === 0 ? 1 : -1) * 18 * speed;
          card.style.transform = `translate3d(${mouseX * factorX}px, ${mouseY * factorY + scrollY * 0.02 * (idx + 1)}px, 0)`;
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
