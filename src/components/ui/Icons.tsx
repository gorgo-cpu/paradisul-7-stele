import type { ReactElement, SVGProps } from 'react';
import type { IconName } from '../../data/content';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

/** Fine-line architectural pictograms, drawn on a 48px grid. */
const PATHS: Record<IconName, ReactElement> = {
  pavilion: (
    <>
      <path d="M4 20 24 7l20 13" />
      <path d="M8 18v22M40 18v22M16 22v18M32 22v18M24 20v20" />
      <path d="M4 40h40" />
      <path d="M8 22c5 3 11 3 16 0 5 3 11 3 16 0" />
    </>
  ),
  gazebo: (
    <>
      <path d="M6 18 24 6l18 12H6Z" />
      <path d="M10 18v22M38 18v22M24 18v4" />
      <path d="M16 40v-8h16v8" />
      <path d="M4 40h40" />
    </>
  ),
  table: (
    <>
      <path d="M17 6h6l-1 10a2 2 0 0 1-4 0L17 6Z" />
      <path d="M20 18v10M16 28h8" />
      <path d="M27 9h6l-.8 8a2.2 2.2 0 0 1-4.4 0L27 9Z" />
      <path d="M30 19v9M27 28h6" />
      <path d="M6 34h36M10 34v8M38 34v8" />
    </>
  ),
  bar: (
    <>
      <path d="M12 8h24L24 24 12 8Z" />
      <path d="M24 24v14M17 40h14" />
      <path d="M16 13h16" />
    </>
  ),
  garden: (
    <>
      <path d="M24 42V22" />
      <path d="M24 22c-8 0-12-6-12-14 8 0 12 6 12 14Z" />
      <path d="M24 28c6 0 10-4 10-10-6 0-10 4-10 10Z" />
      <path d="M8 42h32" />
    </>
  ),
  light: (
    <>
      <path d="M4 10c10 8 30 8 40 0" />
      <path d="M12 14v4M20 16v6M28 16v6M36 14v4" />
      <circle cx="12" cy="20" r="2" />
      <circle cx="20" cy="24" r="2" />
      <circle cx="28" cy="24" r="2" />
      <circle cx="36" cy="20" r="2" />
      <path d="M24 32v10M19 37h10" />
    </>
  ),
};

interface AmenityIconProps extends IconProps {
  name: IconName;
}

export function AmenityIcon({ name, ...props }: AmenityIconProps): ReactElement {
  return (
    <svg {...base} {...props}>
      {PATHS[name]}
    </svg>
  );
}

export function ArrowIcon(props: IconProps): ReactElement {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function PinIcon(props: IconProps): ReactElement {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps): ReactElement {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps): ReactElement {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps): ReactElement {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

