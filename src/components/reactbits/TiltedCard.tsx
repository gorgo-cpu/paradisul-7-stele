/**
 * TiltedCard — React Bits (https://reactbits.dev/components/tilted-card)
 * Installed via: npx shadcn@latest add https://reactbits.dev/r/TiltedCard-TS-TW
 *
 * A spring-damped 3D tilt that follows the pointer, with a trailing caption.
 * Local additions: `borderRadius`, `tooltipClassName` and `className` props so
 * the card can adopt the estate's square-cut, champagne-accented styling.
 */
import { useRef, useState, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, type SpringOptions } from 'motion/react';

export interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  borderRadius?: string;
  tooltipClassName?: string;
  className?: string;
  onClick?: () => void;
}

const springValues: SpringOptions = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  borderRadius = '15px',
  tooltipClassName = 'rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d]',
  className = '',
  onClick,
}: TiltedCardProps): ReactElement {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const [lastY, setLastY] = useState<number>(0);

  function handleMouse(e: MouseEvent<HTMLElement>): void {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter(): void {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave(): void {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View ${captionText || altText}` : undefined}
      className={`relative flex h-full w-full flex-col items-center justify-center [perspective:800px] ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {showMobileWarning && (
        <div className="absolute top-4 block text-center text-sm sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ width: imageWidth, height: imageHeight, rotateX, rotateY, scale }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          loading="lazy"
          decoding="async"
          className="absolute top-0 left-0 object-cover will-change-transform [transform:translateZ(0)]"
          style={{ width: imageWidth, height: imageHeight, borderRadius }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] h-full w-full will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className={`pointer-events-none absolute top-0 left-0 z-[3] hidden opacity-0 sm:block ${tooltipClassName}`}
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

