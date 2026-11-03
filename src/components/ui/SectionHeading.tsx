import type { ReactElement } from 'react';
import { BlurText, SplitText } from '../reactbits';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  className?: string;
}

const LUXE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Editorial section header.
 * Title: React Bits SplitText — words rise from beneath a mask, slowly.
 * Lede:  React Bits BlurText — resolves from a soft focus.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className = '',
}: SectionHeadingProps): ReactElement {
  const centered = align === 'center';

  return (
    <header className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <div className={`mb-8 flex items-center gap-5 ${centered ? 'justify-center' : ''}`}>
        <span className="hairline" aria-hidden="true" />
        <p className="eyebrow">{eyebrow}</p>
        {centered && <span className="hairline rotate-180" aria-hidden="true" />}
      </div>

      <SplitText
        tag="h2"
        text={title}
        splitType="words"
        mask="words"
        delay={70}
        duration={1.4}
        ease="power4.out"
        from={{ yPercent: 110, opacity: 0 }}
        to={{ yPercent: 0, opacity: 1 }}
        threshold={0.15}
        rootMargin="-60px"
        textAlign={centered ? 'center' : 'left'}
        className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.05] font-light tracking-[-0.01em] text-ivory"
      />

      {lede && (
        <BlurText
          text={lede}
          delay={35}
          stepDuration={0.55}
          direction="bottom"
          animateBy="words"
          easing={LUXE_EASE}
          animationFrom={{ filter: 'blur(8px)', opacity: 0, y: 12 }}
          animationTo={[
            { filter: 'blur(3px)', opacity: 0.6, y: 4 },
            { filter: 'blur(0px)', opacity: 1, y: 0 },
          ]}
          className={`mt-8 max-w-2xl text-[1.02rem] leading-relaxed text-ivory-muted ${centered ? 'mx-auto justify-center' : ''}`}
        />
      )}
    </header>
  );
}

