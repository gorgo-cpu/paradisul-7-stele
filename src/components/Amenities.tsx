import type { ReactElement } from 'react';
import { motion } from 'motion/react';
import { SpotlightCard } from './reactbits';
import SectionHeading from './ui/SectionHeading';
import { AmenityIcon } from './ui/Icons';
import { AMENITIES } from '../data/content';

const LUXE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Amenities(): ReactElement {
  return (
    <section
      id="amenities"
      aria-label="Amenities and recreation"
      className="relative overflow-hidden bg-forest-900 py-32 md:py-44"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-forest-700/30 blur-[140px]"
      />

      <div className="container-luxe relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="II — Amenities & Recreation" title="Spaces for celebration, leisure and repose" />
          <p className="max-w-sm text-[0.95rem] leading-[1.9] text-ivory-muted lg:pb-3">
            Each element of the estate has been considered as part of a single composition — so that a celebration
            flows naturally from arrival to the last light of the evening.
          </p>
        </div>

        <ul className="mt-20 grid gap-px bg-ivory/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((amenity, i) => (
            <motion.li
              key={amenity.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, delay: (i % 3) * 0.12, ease: LUXE_EASE }}
              className="bg-forest-900"
            >
              <SpotlightCard
                spotlightColor="rgba(200, 176, 122, 0.16)"
                spotlightSize="65%"
                className="group h-full bg-forest-900 p-10 transition-colors duration-700 ease-luxe hover:bg-forest-800/60 md:p-12"
              >
                <article className="relative flex h-full min-h-[22rem] flex-col">
                  <div className="flex items-start justify-between">
                    <AmenityIcon
                      name={amenity.icon}
                      className="h-12 w-12 text-champagne transition-transform duration-1000 ease-luxe group-hover:-translate-y-1"
                    />
                    <span className="font-display text-sm text-ivory/30 italic">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-auto pt-16">
                    <p className="eyebrow mb-4 text-[0.6rem] text-champagne/70">{amenity.category}</p>
                    <h3 className="font-display text-[1.9rem] leading-tight font-light text-ivory">{amenity.title}</h3>
                    <p className="mt-5 text-[0.88rem] leading-[1.85] text-stone transition-colors duration-700 group-hover:text-ivory-muted">
                      {amenity.description}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-8 block h-px w-10 bg-champagne/50 transition-all duration-1000 ease-luxe group-hover:w-24 group-hover:bg-champagne"
                    />
                  </div>
                </article>
              </SpotlightCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

