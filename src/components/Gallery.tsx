import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { TiltedCard } from './reactbits';
import SectionHeading from './ui/SectionHeading';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './ui/Icons';
import { GALLERY } from '../data/content';

const LUXE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(6px)',
  }),
};

export default function Gallery(): ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const lenis = useLenis();

  const total = GALLERY.length;
  const activeImage = activeIndex !== null ? GALLERY[activeIndex] : undefined;

  const openViewer = useCallback((index: number): void => {
    setDirection(1);
    setActiveIndex(index);
  }, []);

  const closeViewer = useCallback((): void => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback((): void => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + total) % total));
  }, [total]);

  const showNext = useCallback((): void => {
    setDirection(1);
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % total));
  }, [total]);

  useEffect(() => {
    if (activeIndex === null) {
      lenis?.start();
      document.body.style.overflow = '';
      return;
    }

    lenis?.stop();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') closeViewer();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, lenis, closeViewer, showPrev, showNext]);

  return (
    <section id="gallery" aria-label="Gallery" className="relative bg-forest-950 py-32 md:py-44">
      <div className="container-luxe">
        <SectionHeading
          align="center"
          eyebrow="III — The Estate in Detail"
          title="Moments, prepared with intent"
          lede="A glimpse of the pavilion and gardens as they are dressed for our guests — every setting arranged by hand, every light placed with purpose."
        />

        <div className="mt-24 grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {GALLERY.map((image, i) => {
            const isFeatured = Boolean(image.featured);
            return (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.4, delay: (i % 4) * 0.12, ease: LUXE_EASE }}
                className={
                  isFeatured
                    ? 'sm:col-span-2 xl:col-span-4 xl:mb-6'
                    : i % 2 === 0
                      ? 'xl:mt-20'
                      : ''
                }
              >
                <TiltedCard
                  imageSrc={image.src}
                  altText={image.alt}
                  captionText="Click to expand"
                  containerHeight={isFeatured ? 'clamp(340px, 44vw, 560px)' : 'clamp(380px, 42vw, 520px)'}
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={isFeatured ? 4 : 7}
                  scaleOnHover={isFeatured ? 1.015 : 1.03}
                  borderRadius="0px"
                  showMobileWarning={false}
                  showTooltip
                  tooltipClassName="border border-champagne/40 bg-forest-950/80 px-3 py-1.5 text-[0.58rem] tracking-[0.3em] text-champagne-light uppercase backdrop-blur-md"
                  displayOverlayContent
                  onClick={() => openViewer(i)}
                  overlayContent={
                    <div className="flex h-full w-full flex-col justify-end bg-linear-to-t from-forest-950/85 via-forest-950/10 to-transparent p-7 sm:p-9">
                      <span className="font-display text-sm text-champagne italic">{String(i + 1).padStart(2, '0')}</span>
                      <span className="mt-1 font-display text-2xl font-light text-ivory sm:text-3xl">{image.caption}</span>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ---- Full-screen Picture View Modal (Portalled) ------------------ */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeIndex !== null && activeImage && (
              <motion.div
                key="gallery-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={`${activeImage.caption} — Picture view`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: LUXE_EASE }}
                onClick={closeViewer}
                className="fixed inset-0 z-[100] flex flex-col justify-between bg-forest-950/75 p-4 backdrop-blur-2xl backdrop-saturate-150 select-none sm:p-8 md:p-10"
              >
                {/* Top bar: Counter, Caption & Close button */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-lg text-champagne italic">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                    <span className="hidden h-px w-8 bg-champagne/40 sm:inline-block" aria-hidden="true" />
                    <p className="font-display text-xl font-light text-ivory sm:text-2xl">{activeImage.caption}</p>
                  </div>

                  <button
                    type="button"
                    onClick={closeViewer}
                    aria-label="Close picture view"
                    className="group flex h-12 w-12 items-center justify-center border border-ivory/15 bg-forest-950/70 text-ivory transition-all duration-500 ease-luxe hover:border-champagne hover:bg-champagne hover:text-forest-950"
                  >
                    <CloseIcon className="h-5 w-5 transition-transform duration-500 ease-luxe group-hover:rotate-90" />
                  </button>
                </div>

                {/* Center stage: Left button, Focused Picture, Right button */}
                <div className="relative my-auto flex w-full max-w-[1440px] flex-1 items-center justify-center self-center py-4 sm:py-6">
                  {/* Previous button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev();
                    }}
                    aria-label="Previous picture"
                    className="group absolute left-1 z-20 flex h-12 w-12 items-center justify-center border border-ivory/20 bg-forest-950/75 text-ivory shadow-xl backdrop-blur-md transition-all duration-500 ease-luxe hover:border-champagne hover:bg-champagne hover:text-forest-950 sm:left-4 sm:h-14 sm:w-14"
                  >
                    <ChevronLeftIcon className="h-6 w-6 transition-transform duration-500 ease-luxe group-hover:-translate-x-0.5" />
                  </button>

                  {/* Active Picture with swipe + directional slide transition */}
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.figure
                      key={activeImage.src}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: LUXE_EASE }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60) showNext();
                        else if (info.offset.x > 60) showPrev();
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative flex max-h-[72vh] max-w-[82vw] flex-col items-center justify-center sm:max-w-[76vw]"
                    >
                      <img
                        src={activeImage.src}
                        alt={activeImage.alt}
                        draggable={false}
                        className="max-h-[70vh] w-auto max-w-full border border-champagne/25 object-contain shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
                      />
                      <figcaption className="mt-4 text-center text-[0.72rem] tracking-[0.28em] text-ivory/70 uppercase">
                        {activeImage.alt}
                      </figcaption>
                    </motion.figure>
                  </AnimatePresence>

                  {/* Next button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showNext();
                    }}
                    aria-label="Next picture"
                    className="group absolute right-1 z-20 flex h-12 w-12 items-center justify-center border border-ivory/20 bg-forest-950/75 text-ivory shadow-xl backdrop-blur-md transition-all duration-500 ease-luxe hover:border-champagne hover:bg-champagne hover:text-forest-950 sm:right-4 sm:h-14 sm:w-14"
                  >
                    <ChevronRightIcon className="h-6 w-6 transition-transform duration-500 ease-luxe group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Bottom thumbnail strip (WhatsApp-style quick jump) */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-20 mx-auto flex items-center justify-center gap-3 pt-2"
                >
                  {GALLERY.map((thumb, idx) => {
                    const isCurrent = idx === activeIndex;
                    return (
                      <button
                        key={thumb.src}
                        type="button"
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          setActiveIndex(idx);
                        }}
                        aria-label={`View ${thumb.caption}`}
                        aria-current={isCurrent ? 'true' : undefined}
                        className={`relative h-14 w-20 overflow-hidden border transition-all duration-500 ease-luxe sm:h-16 sm:w-24 ${
                          isCurrent
                            ? 'scale-105 border-champagne opacity-100 shadow-lg'
                            : 'border-ivory/15 opacity-45 hover:opacity-80'
                        }`}
                      >
                        <img src={thumb.src} alt="" className="h-full w-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
