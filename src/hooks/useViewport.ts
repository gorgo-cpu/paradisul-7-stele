import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';

/** Returns true once the viewport has scrolled beyond `threshold` pixels. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useLenis(
    ({ scroll }) => {
      const next = scroll > threshold;
      setScrolled((prev) => (prev === next ? prev : next));
    },
    [threshold],
  );

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/** Mirrors the user's `prefers-reduced-motion` setting. */
export function usePrefersReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

