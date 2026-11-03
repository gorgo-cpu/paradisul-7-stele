/**
 * ShinyText — React Bits (https://reactbits.dev/text-animations/shiny-text)
 * Installed via: npx shadcn@latest add https://reactbits.dev/r/ShinyText-TS-TW
 *
 * A slow band of light passes across the glyphs. Requires the `shine`
 * keyframes / `animate-shine` utility declared in index.css.
 */
import type { ReactElement } from 'react';

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  /** Seconds per sweep. */
  speed?: number;
  className?: string;
  /** Colour of the travelling highlight. */
  shineColor?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = '',
  shineColor = 'rgba(255, 255, 255, 0.8)',
}: ShinyTextProps): ReactElement {
  return (
    <span
      className={`inline-block bg-clip-text ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, ${shineColor} 50%, rgba(255, 255, 255, 0) 60%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}

