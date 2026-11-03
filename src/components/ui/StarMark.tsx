import type { ReactElement } from 'react';

interface StarMarkProps {
  className?: string;
  strokeWidth?: number;
  title?: string;
}

/**
 * Seven-pointed star {7/3} — the estate's emblem.
 * Vertices are computed rather than hand-written, so the geometry is exact.
 */
const POINTS: string = Array.from({ length: 7 }, (_, i) => {
  const angle = -Math.PI / 2 + (i * 3 * 2 * Math.PI) / 7;
  const x = 50 + 44 * Math.cos(angle);
  const y = 52 + 44 * Math.sin(angle);
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}).join(' ');

export default function StarMark({ className = '', strokeWidth = 2.5, title }: StarMarkProps): ReactElement {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <polygon
        points={POINTS}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

