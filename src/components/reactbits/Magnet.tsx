/**
 * Magnet — React Bits (https://reactbits.dev/animations/magnet)
 * Installed via: npx shadcn@latest add https://reactbits.dev/r/Magnet-TS-TW
 *
 * Gently draws its child toward the cursor when the pointer enters a padded
 * field around the element.
 */
import { useEffect, useRef, useState, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';

export interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  /** Higher values produce a weaker pull. */
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}: MagnetProps): ReactElement {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<boolean>(false);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent): void => {
      if (!magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        activeRef.current = true;
        setIsActive(true);
        setPosition({ x: (e.clientX - centerX) / magnetStrength, y: (e.clientY - centerY) / magnetStrength });
      } else if (activeRef.current) {
        // Only reset once on exit, so distant pointer movement never re-renders.
        activeRef.current = false;
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, disabled, magnetStrength]);

  return (
    <div ref={magnetRef} className={`relative inline-block ${wrapperClassName}`} {...props}>
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
