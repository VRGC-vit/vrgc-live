import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // 1. Grid & Grouped Cards Stagger Scroll Animation
      const cardGridGroups = [
        '.pillar-cards-grid > .pillar-card',
        '.dept-grid > .dept-card',
        '.circular-team-grid > .circ-member-card',
        '.lab-specs-grid > .lab-spec-box',
        '.vod-grid > .vod-card',
        '.bracket-rounds-grid .bracket-match-node',
        '.trust-signals-bar > .trust-item',
      ];

      cardGridGroups.forEach((selector) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector);
        if (elements.length > 0) {
          gsap.fromTo(
            elements,
            {
              opacity: 0,
              y: 45,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: elements[0].parentElement || elements[0],
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // 2. Individual Standalone Cards & Rows
      const individualCardSelectors = [
        '.faculty-card',
        '.schedule-row-card',
        '.events-standby-card',
        '.community-status-card',
        '.crimson-stream-box',
        '.stadium-scoreboard',
        '.live-chat-panel',
      ];

      individualCardSelectors.forEach((selector) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector);
        elements.forEach((el) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 35,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });

      // 3. Pictures & Feature Media Zoom & Unblur Reveal
      const mediaSelectors = [
        '.isf-card-media',
        '.pillar-asset-wrap',
        '.vod-thumb',
      ];

      mediaSelectors.forEach((selector) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector);
        elements.forEach((el) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              scale: 0.92,
              filter: 'blur(4px)',
            },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });

      // 4. Floating 3D Pictures Drifting Parallax on Scroll
      const floatingPictures = gsap.utils.toArray<HTMLElement>(
        '.ipb-floating-card, .iss-floating-photo, .polaroid-float'
      );

      floatingPictures.forEach((pic, idx) => {
        const speed = ((idx % 3) + 1) * 40;
        const rotateOffset = (idx % 2 === 0 ? 1 : -1) * 6;
        gsap.to(pic, {
          y: -speed,
          rotation: `+=${rotateOffset}`,
          ease: 'none',
          scrollTrigger: {
            trigger: pic.parentElement || pic,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    });

    // 5. Interactive Mouse Parallax for Floating Elements
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const floatingElements = Array.from(
      document.querySelectorAll<HTMLElement>('.ipb-floating-card, .iss-floating-photo, .polaroid-float')
    );

    const tick = () => {
      if (floatingElements.length > 0) {
        floatingElements.forEach((card, idx) => {
          const factorX = (idx % 2 === 0 ? 1 : -1) * 10;
          const factorY = (idx % 3 === 0 ? 1 : -1) * 12;
          card.style.transform = `translate3d(${mouseX * factorX}px, ${mouseY * factorY}px, 0)`;
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

