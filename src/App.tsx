import type { ReactElement } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App(): ReactElement {
  return (
    <SmoothScroll>
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-champagne focus:px-4 focus:py-2 focus:text-forest-950"
      >
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Amenities />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

