import type { ReactElement } from 'react';
import { BRAND, CONTACT, NAV_LINKS } from '../data/content';
import StarMark from './ui/StarMark';

export default function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ivory/[0.06] bg-ink pt-24 pb-12">
      <div className="container-luxe">
        <div className="flex flex-col items-center text-center">
          <StarMark className="h-9 w-9 text-champagne/80" strokeWidth={1.8} />
          <p className="mt-8 font-display text-[clamp(2rem,4vw,3rem)] font-light text-ivory">
            Paradisul <span className="text-champagne">7</span> Stele
          </p>
          <p className="mt-4 font-display text-lg text-ivory/50 italic">{BRAND.subline}</p>
        </div>

        <nav aria-label="Footer" className="mt-16">
          <ul className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.66rem] tracking-[0.32em] text-ivory/50 uppercase transition-colors duration-500 hover:text-champagne"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-ivory/[0.06] pt-10 text-[0.7rem] tracking-[0.08em] text-stone md:flex-row">
          <p>
            © {year} {BRAND.legalName}. All rights reserved.
          </p>
          <p>
            {CONTACT.street}, {CONTACT.locality}, {CONTACT.county}
          </p>
        </div>
      </div>
    </footer>
  );
}

