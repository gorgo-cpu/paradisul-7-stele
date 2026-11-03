/**
 * SpotlightCard — React Bits (https://reactbits.dev/components/spotlight-card)
 * Installed via: npx shadcn@latest add https://reactbits.dev/r/SpotlightCard-TS-TW
 *
 * A radial light follows the cursor across the card surface.
 * Local refinement: pointer position is written to CSS custom properties via a
 * ref rather than React state, so hovering never triggers re-renders.
 */
import { useRef, useState, type MouseEvent, type ReactElement, type ReactNode } from 'react';

export interface SpotlightCardProps {
  children?: ReactNode;
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})` | string;
  /** Radius of the light, as a CSS length. */
  spotlightSize?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  spotlightSize = '80%',
}: SpotlightCardProps): ReactElement {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    const node = divRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    node.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
      onFocus={() => setOpacity(0.6)}
      onBlur={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent ${spotlightSize})`,
        }}
      />
      {children}
    </div>
  );
}

