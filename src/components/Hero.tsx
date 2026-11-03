import type { ReactElement } from 'react';
import { Aurora, BlurText, Magnet, Particles, ShinyText, SplitText } from './reactbits';
import { BRAND, CONTACT } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/useViewport';
import { ArrowIcon } from './ui/Icons';
import StarMark from './ui/StarMark';

/* Stable references — Particles re-initialises if its colour array identity changes. */
const AURORA_STOPS: [string, string, string] = ['#1c3a2f', '#6f6141', '#173328'];
const STAR_COLOURS: string[] = ['#e3d3a8', '#c8b07a', '#f4f0e8'];
const LUXE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero(): ReactElement {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="grain relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-forest-950"
    >
      {/* ---- React Bits backgrounds ------------------------------------ */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 opacity-80">
        <Aurora colorStops={AURORA_STOPS} amplitude={0.7} blend={0.65} speed={reducedMotion ? 0.05 : 0.35} />
      </div>

      {!reducedMotion && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
          <Particles
            particleColors={STAR_COLOURS}
            particleCount={120}
            particleSpread={12}
            speed={0.04}
            particleBaseSize={110}
            sizeRandomness={1.1}
            alphaParticles
            moveParticlesOnHover
            particleHoverFactor={0.35}
          />
        </div>
      )}

      {/* Vignette + fade into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,18,16,0.55)_70%,rgba(11,18,16,0.9)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-transparent to-forest-950"
      />

      {/* ---- Content ----------------------------------------------------- */}
      <div className="container-luxe relative flex flex-col items-center pt-24 text-center">
        <StarMark className="mb-10 h-10 w-10 text-champagne/80" strokeWidth={1.6} />

        <ShinyText
          text={`${CONTACT.locality} · ${CONTACT.county} · ${CONTACT.country}`}
          speed={7}
          shineColor="rgba(244, 240, 232, 0.9)"
          className="mb-10 text-[0.68rem] font-medium tracking-[0.5em] text-champagne/70 uppercase"
        />

        <h1 className="sr-only">{BRAND.legalName}</h1>
        <SplitText
          tag="p"
          text={BRAND.name}
          splitType="chars"
          mask="chars"
          delay={55}
          duration={1.6}
          ease="expo.out"
          from={{ yPercent: 105, opacity: 0 }}
          to={{ yPercent: 0, opacity: 1 }}
          threshold={0.1}
          rootMargin="0px"
          textAlign="center"
          className="font-display text-[clamp(3.4rem,10.5vw,9.5rem)] leading-[0.95] font-light tracking-[-0.02em] text-ivory"
        />

        <div className="mt-10 flex flex-col items-center gap-3">
          <BlurText
            text={BRAND.tagline}
            delay={60}
            stepDuration={0.7}
            direction="bottom"
            easing={LUXE_EASE}
            animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 14 }}
            animationTo={[
              { filter: 'blur(4px)', opacity: 0.5, y: 5 },
              { filter: 'blur(0px)', opacity: 1, y: 0 },
            ]}
            className="max-w-2xl justify-center font-display text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug font-light text-ivory/85 italic"
          />
          <p className="text-[0.72rem] tracking-[0.36em] text-stone uppercase">{BRAND.subline}</p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
          <Magnet padding={60} magnetStrength={6} disabled={reducedMotion}>
            <a
              href="#experience"
              className="group relative isolate inline-flex items-center gap-4 overflow-hidden border border-champagne/60 bg-champagne/[0.04] px-10 py-5 text-[0.7rem] font-medium tracking-[0.34em] text-champagne-light uppercase backdrop-blur-sm transition-colors duration-700 ease-luxe hover:text-forest-950"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-champagne transition-transform duration-700 ease-luxe group-hover:scale-y-100"
              />
              Discover the Estate
              <ArrowIcon className="h-4 w-4 transition-transform duration-700 ease-luxe group-hover:translate-x-1" />
            </a>
          </Magnet>

          <a
            href="#contact"
            className="text-[0.68rem] tracking-[0.32em] text-ivory/60 uppercase underline decoration-champagne/40 underline-offset-[10px] transition-colors duration-500 hover:text-ivory hover:decoration-champagne"
          >
            Arrange a private viewing
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#experience"
        aria-label="Scroll to The Experience"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-[0.6rem] tracking-[0.4em] text-ivory/40 uppercase"
      >
        Scroll
        <span className="relative h-14 w-px overflow-hidden bg-ivory/10">
          <span className="absolute top-0 left-0 h-5 w-px animate-drift bg-champagne" />
        </span>
      </a>
    </section>
  );
}
