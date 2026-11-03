/**
 * ScrollReveal — React Bits (https://reactbits.dev/text-animations/scroll-reveal)
 * Installed via: npx shadcn@latest add https://reactbits.dev/r/ScrollReveal-TS-TW
 *
 * Words gain opacity and focus, and the block settles from a slight rotation,
 * scrubbed against scroll position.
 * Local refinements: cleanup is scoped with gsap.context() so it never kills
 * ScrollTriggers owned by other components, and the wrapper is a <div> to keep
 * the markup valid.
 */
import { useEffect, useMemo, useRef, type ReactElement, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}: ScrollRevealProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo<ReactNode[]>(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span className="word inline-block" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: { trigger: el, scroller, start: 'top bottom', end: rotationEnd, scrub: true },
        },
      );

      const wordElements = el.querySelectorAll<HTMLElement>('.word');

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true },
        },
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={textClassName}>{splitText}</p>
    </div>
  );
}

