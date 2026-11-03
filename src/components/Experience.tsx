import type { ReactElement } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from './reactbits';
import SectionHeading from './ui/SectionHeading';
import { PILLARS } from '../data/content';

const LUXE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Experience(): ReactElement {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative bg-forest-950 py-32 md:py-44">
      <div className="container-luxe grid items-center gap-20 lg:grid-cols-12 lg:gap-16">
        {/* ---- Text pane ------------------------------------------------- */}
        <div className="lg:col-span-6 xl:col-span-5">
          <div id="experience-title">
            <SectionHeading eyebrow="I — The Experience" title="An estate composed for the rarest occasions" />
          </div>

          <ScrollReveal
            baseOpacity={0.12}
            baseRotation={1.5}
            blurStrength={5}
            containerClassName="mt-12"
            textClassName="font-display text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.5] font-light text-ivory/90"
            wordAnimationEnd="center center"
            rotationEnd="center center"
          >
            Set among the open fields and quiet woodland of Moara Vlăsiei, Paradisul 7 Stele is a private sanctuary for
            those who expect every detail to be considered.
          </ScrollReveal>

          <p className="mt-8 max-w-xl text-[0.98rem] leading-[1.9] text-ivory-muted">
            Only a short drive north of Bucharest, the estate offers the rare luxury of space: a dressed pavilion, an
            open-air garden gazebo and secluded grounds, reserved entirely for you and your guests. Every gathering is
            planned in personal consultation and executed by a team that measures success in the details no one notices.
          </p>

          <dl className="mt-16 grid gap-10 border-t border-ivory/[0.08] pt-12 sm:grid-cols-3 sm:gap-8">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: LUXE_EASE }}
              >
                <dt className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-champagne italic">{pillar.numeral}.</span>
                  <span className="font-display text-xl font-normal text-ivory">{pillar.title}</span>
                </dt>
                <dd className="mt-3 text-[0.85rem] leading-[1.8] text-stone">{pillar.body}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* ---- Image pane ------------------------------------------------ */}
        <div className="relative lg:col-span-6 xl:col-span-6 xl:col-start-7">
          <div aria-hidden="true" className="absolute -top-6 -right-6 hidden h-full w-full border border-champagne/25 md:block" />

          <motion.figure
            initial={{ clipPath: 'inset(12% 0% 12% 0%)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.8, ease: LUXE_EASE }}
            className="relative aspect-[4/5] overflow-hidden bg-forest-800"
          >
            <motion.img
              src="/images/pavilion-panorama.jpg"
              alt="The Star Pavilion at dusk — draped ceilings, warm lights and a star-inlaid floor"
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.6, ease: LUXE_EASE }}
              className="h-full w-full object-cover object-[50%_45%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-forest-950/70 via-transparent to-transparent" />
            <figcaption className="absolute right-8 bottom-8 left-8 flex items-end justify-between gap-6">
              <span className="font-display text-2xl font-light text-ivory italic">The Star Pavilion</span>
              <span className="text-[0.6rem] tracking-[0.36em] text-champagne-light/80 uppercase">Est. Moara Vlăsiei</span>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, delay: 0.5, ease: LUXE_EASE }}
            className="absolute -bottom-14 -left-6 hidden w-44 border-[6px] border-forest-950 shadow-2xl shadow-black/50 md:block lg:-left-14 xl:w-52"
          >
            <img
              src="/images/table-detail.jpg"
              alt="Place setting with emerald napkin, silver ring and crystal glassware"
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

