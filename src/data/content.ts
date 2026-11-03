/**
 * Centralised, typed editorial content for the estate.
 * Copy lives here so components remain purely presentational.
 */

export type IconName = 'pavilion' | 'gazebo' | 'table' | 'bar' | 'garden' | 'light';

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface Pillar {
  numeral: string;
  title: string;
  body: string;
}

export interface Amenity {
  icon: IconName;
  category: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  featured?: boolean;
}

export interface ContactDetails {
  street: string;
  locality: string;
  county: string;
  country: string;
  /** Leave as null until confirmed — the UI hides empty channels. */
  phone: string | null;
  email: string | null;
  mapsUrl: string;
}

export const BRAND = {
  name: 'Paradisul 7 Stele',
  legalName: 'Paradisul 7 Stele SRL',
  tagline: 'A private estate for celebration, recreation and quiet distinction.',
  subline: 'Moments from Bucharest. A world removed.',
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'The Estate', href: '#experience' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const PILLARS: readonly Pillar[] = [
  {
    numeral: 'I',
    title: 'Privacy',
    body: 'Each occasion enjoys exclusive use of the grounds — no shared halls, no neighbouring events.',
  },
  {
    numeral: 'II',
    title: 'Craft',
    body: 'Décor, linens and florals are composed for every gathering by our in-house stylists.',
  },
  {
    numeral: 'III',
    title: 'Hospitality',
    body: 'A dedicated team, attentive yet unobtrusive, from the first welcome to the final farewell.',
  },
];

export const AMENITIES: readonly Amenity[] = [
  {
    icon: 'pavilion',
    category: 'Celebrations & Galas',
    title: 'The Star Pavilion',
    description:
      'A grand pavilion beneath draped silk and a canopy of warm light, its floor inlaid with the estate’s signature stars.',
  },
  {
    icon: 'gazebo',
    category: 'Al Fresco',
    title: 'The Garden Gazebo',
    description:
      'An open-air timber gazebo for long summer evenings, intimate dinners and receptions under the Ilfov sky.',
  },
  {
    icon: 'table',
    category: 'Styling',
    title: 'Bespoke Table Design',
    description:
      'Emerald linens, fine crystal and seasonal florals, arranged with precision to the character of your occasion.',
  },
  {
    icon: 'bar',
    category: 'Service',
    title: 'Private Bar & Hospitality',
    description:
      'A dedicated bar and service brigade, ensuring every guest is attended to with discretion and warmth.',
  },
  {
    icon: 'garden',
    category: 'Leisure',
    title: 'Family Recreation',
    description:
      'Secure, landscaped grounds where younger guests may play freely while the celebration continues in view.',
  },
  {
    icon: 'light',
    category: 'Atmosphere',
    title: 'Evening Illumination',
    description:
      'Thousands of soft lights and an integrated audiovisual system compose the atmosphere from dusk onward.',
  },
];

export const GALLERY: readonly GalleryImage[] = [
  {
    src: '/images/pavilion-panorama.jpg',
    alt: 'Panoramic view of The Star Pavilion — draped ceilings, warm canopy lighting and star-inlaid floor',
    caption: 'The Star Pavilion Panorama',
    featured: true,
  },
  {
    src: '/images/pavilion-axis.jpg',
    alt: 'The Star Pavilion dressed for a reception, viewed along its central axis',
    caption: 'The Grand Axis',
  },
  {
    src: '/images/pavilion-tables.jpg',
    alt: 'Reception tables set with white linens, emerald napkins and crystal',
    caption: 'Reception Hall',
  },
  {
    src: '/images/table-detail.jpg',
    alt: 'Detail of a place setting with an emerald napkin and silver ring',
    caption: 'Table Composition',
  },
  {
    src: '/images/garden-gazebo.jpg',
    alt: 'The timber garden gazebo illuminated at dusk',
    caption: 'Garden Gazebo at Dusk',
  },
];

export const CONTACT: ContactDetails = {
  street: 'Strada Agromec nr. 14',
  locality: 'Moara Vlăsiei',
  county: 'Ilfov',
  country: 'România',
  phone: null,
  email: null,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Strada+Agromec+14%2C+Moara+Vl%C4%83siei%2C+Ilfov%2C+Romania',
};

export const OCCASIONS: readonly string[] = [
  'Wedding reception',
  'Christening',
  'Private celebration',
  'Corporate gathering',
  'Other enquiry',
];

