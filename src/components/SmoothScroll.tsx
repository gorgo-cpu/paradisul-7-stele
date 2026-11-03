/**
 * SmoothScroll — Lenis + GSAP ScrollTrigger Bridge
 *
 * Couples a root Lenis instance directly to GSAP's internal ticker and
 * binds Lenis scroll updates to `ScrollTrigger.update`, eliminating any frame
 * drift between inertial scrolling and scrubbed / triggered GSAP animations.
 */
import { useEffect, useRef, type ReactElement, type ReactNode } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

const LUXE_SCROLL_EASE = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Inner synchroniser that subscribes to Lenis scroll events via `useLenis`
 * and updates GSAP's `ScrollTrigger` on every interpolated frame.
 */
function ScrollTriggerSync(): null {
  useLenis(() => {
    ScrollTrigger.update();
  });

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps): ReactElement {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Drive Lenis from GSAP's ticker (GSAP time is in seconds; Lenis expects ms)
    const updateTicker = (time: number): void => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger calculations once web fonts & layout settle
    void document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.075,
        duration: 1.35,
        easing: LUXE_SCROLL_EASE,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        autoToggle: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        anchors: {
          offset: -72,
          duration: 1.5,
          easing: LUXE_SCROLL_EASE,
        },
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
