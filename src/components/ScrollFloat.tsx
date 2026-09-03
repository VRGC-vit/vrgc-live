import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollFloatProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  style?: React.CSSProperties;
}

export const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.8,
  ease = 'power3.out',
  scrollStart = 'top 92%',
  scrollEnd = 'bottom 8%',
  stagger = 0.02,
  as: Component = 'h2',
  style,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    if (!text) return children;
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');
    if (!charElements.length) return;

    // Start & End animation with toggleActions: plays on entering sight, reverses/exits when beyond sight
    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          opacity: 0,
          y: 35,
          filter: 'blur(6px)',
          willChange: 'transform, opacity, filter',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: animationDuration,
          ease: ease,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <Component
      // @ts-expect-error dynamic component ref
      ref={containerRef}
      className={`scroll-float ${containerClassName}`}
      style={style}
    >
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </Component>
  );
};

export default ScrollFloat;
