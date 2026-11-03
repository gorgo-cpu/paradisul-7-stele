/**
 * SplitText — React Bits (https://reactbits.dev/text-animations/split-text)
 * Installed via: npx shadcn@latest add https://reactbits.dev/r/SplitText-TS-TW
 *
 * Splits text into chars / words / lines with GSAP's SplitText plugin and
 * reveals them with a staggered, scroll-triggered tween.
 * Extended with an optional `mask` prop (native GSAP SplitText feature) for
 * the "rising from beneath a hairline" reveal used in editorial typography.
 */
import { useEffect, useRef, useState, type ElementType, type ReactElement } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitKind = 'chars' | 'words' | 'lines' | 'words, chars';
type TweenVars = gsap.TweenVars;

export interface SplitTextProps {
  text: string;
  className?: string;
  /** Stagger between pieces, in milliseconds. */
  delay?: number;
  /** Duration of each piece, in seconds. */
  duration?: number;
  ease?: string;
  splitType?: SplitKind;
  from?: TweenVars;
  to?: TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: 'left' | 'center' | 'right';
  /** Clip each piece inside an overflow-hidden wrapper. */
  mask?: 'lines' | 'words' | 'chars';
  onLetterAnimationComplete?: () => void;
}

interface SplitHost extends HTMLElement {
  _rbsplitInstance?: GSAPSplitText | null;
}

export default function SplitText({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  mask,
  onLetterAnimationComplete,
}: SplitTextProps): ReactElement {
  const ref = useRef<HTMLElement>(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      void document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      const el = ref.current as SplitHost | null;
      if (!el || !text || !fontsLoaded) return;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {
          /* already reverted */
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1] ?? '0') : 0;
      const marginUnit = marginMatch ? (marginMatch[2] ?? 'px') : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        ...(mask ? { mask } : {}),
        onSplit: (self: GSAPSplitText) => {
          let targets: Element[] = self.chars;
          if (splitType.includes('chars') && self.chars.length) targets = self.chars;
          else if (splitType.includes('words') && self.words.length) targets = self.words;
          else if (splitType.includes('lines') && self.lines.length) targets = self.lines;

          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
              },
              onComplete: () => onCompleteRef.current?.(),
              willChange: 'transform, opacity',
              force3D: true,
            },
          );
        },
      });
      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          /* already reverted */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        mask,
        fontsLoaded,
      ],
      scope: ref,
    },
  );

  const Tag = tag as ElementType;

  return (
    <Tag
      ref={ref}
      className={`split-parent inline-block overflow-hidden whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: 'break-word',
        willChange: 'transform, opacity',
        // Avoid a flash of un-split text while web fonts are still loading.
        visibility: fontsLoaded ? 'visible' : 'hidden',
      }}
    >
      {text}
    </Tag>
  );
}
