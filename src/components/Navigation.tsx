import { useEffect, useState, type ReactElement } from 'react';
import { useLenis } from 'lenis/react';
import { BRAND, NAV_LINKS } from '../data/content';
import { useScrolled } from '../hooks/useViewport';
import StarMark from './ui/StarMark';

/**
 * Minimalist sticky header. Transparent above the fold; resolves into a
 * glassmorphic bar once the visitor begins to scroll.
 */
export default function Navigation(): ReactElement {
  const scrolled = useScrolled(32);
  const [open, setOpen] = useState<boolean>(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  const glass = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${
        glass
          ? 'border-b border-ivory/[0.06] bg-forest-950/60 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className={`container-luxe flex items-center justify-between transition-[height] duration-700 ease-luxe ${
          scrolled ? 'h-[4.5rem]' : 'h-24'
        }`}
      >
        <a href="#top" className="group flex items-center gap-3" aria-label={`${BRAND.name} — home`}>
          <StarMark className="h-7 w-7 text-champagne transition-transform duration-[1200ms] ease-luxe group-hover:rotate-[51.4deg]" />
          <span className="font-display text-[1.35rem] leading-none font-normal tracking-[0.02em] text-ivory">
            Paradisul <span className="text-champagne">7</span> Stele
          </span>
        </a>

        <ul className="hidden items-center gap-11 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative py-2 text-[0.7rem] font-normal tracking-[0.32em] text-ivory/75 uppercase transition-colors duration-500 hover:text-ivory"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-champagne/80 transition-transform duration-700 ease-luxe group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden border border-champagne/40 px-6 py-3 text-[0.66rem] font-medium tracking-[0.3em] text-champagne-light uppercase transition-all duration-700 ease-luxe hover:border-champagne hover:bg-champagne hover:text-forest-950 lg:inline-block"
        >
          Private Viewing
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-ivory transition-transform duration-500 ease-luxe ${open ? 'translate-y-[4px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-ivory transition-transform duration-500 ease-luxe ${open ? '-translate-y-[4px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-luxe lg:hidden ${
          open ? 'max-h-[80vh] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <ul className="container-luxe flex flex-col gap-1 pt-4 pb-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-ivory/[0.06]">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-5 font-display text-3xl font-light text-ivory"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-block border border-champagne/50 px-7 py-4 text-[0.68rem] tracking-[0.3em] text-champagne-light uppercase"
            >
              Arrange a Private Viewing
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

