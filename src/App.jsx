import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Services from './components/Services';
import WhatYouGet from './components/WhatYouGet';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { HeroStateProvider } from './components/HeroTabContext';
import './index.css';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HeroStateProvider>
      <div
        id="main"
        data-framer-hydrate-v2='{"routeId":"jOgyCWBcf","localeId":"default","breakpoints":[{"hash":"k7b1cf","mediaQuery":"(min-width: 1440px)"},{"hash":"1t24cya","mediaQuery":"(min-width: 1024px) and (max-width: 1439.98px)"},{"hash":"65kzqc","mediaQuery":"(min-width: 810px) and (max-width: 1023.98px)"},{"hash":"4dcyrn","mediaQuery":"(max-width: 809.98px)"}]}'
        data-framer-ssr-released-at="2026-05-07T11:49:57.802Z"
        data-framer-page-optimized-at="2026-05-17T14:14:27.918Z"
        data-framer-generated-page=""
      >
        <style data-framer-html-style="">
          {':root body { background: var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(0, 9, 18)); }'}
        </style>
        <div
          className="framer-3JG10 framer-9C3FS framer-gF1Dm framer-knjRQ framer-cqiiB framer-KVnNX framer-1t24cya"
          data-layout-template="true"
          style={{ minHeight: '100vh', width: 'auto' }}
        >
          <div className="framer-qlkypp-container">
            <link href="https://unpkg.com/lenis@1.3.19/dist/lenis.css" rel="stylesheet" />
          </div>
          <Header />
          <Hero />
          <Intro />
          <Services />
          <WhatYouGet />
          <Pricing />
          <FAQ />
          <CTA />
          <Footer />
        </div>
        <div id="template-overlay" />
      </div>
    </HeroStateProvider>
  );
}
