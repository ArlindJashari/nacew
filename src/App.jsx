import { lazy, Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { HeroStateProvider } from './components/HeroTabContext';
import Home from './pages/Home';
import Logo3D from './pages/Logo3D';
import Road from './pages/Road';
import './index.css';

const AboutExperience = lazy(() => import('./pages/AboutExperience.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isLogoPage = pathname === '/3dlogo';
  const isRoadPage = pathname === '/road';
  const isBareLayout = isLogoPage || isRoadPage;

  return (
    <>
      <ScrollToTop />
      {!isBareLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3dlogo" element={<Logo3D />} />
        <Route path="/road" element={<Road />} />
      </Routes>
      {!isBareLayout && <CTA />}
      {!isBareLayout && <Footer />}
    </>
  );
}

function HomeSite() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
        data-framer-hydrate-v2='{"routeId":"jOgyCWBcf","localeId":"default","breakpoints":[{"hash":"kj696b","mediaQuery":"(min-width: 1280px)"},{"hash":"3job37","mediaQuery":"(min-width: 810px) and (max-width: 1279.98px)"},{"hash":"nzvz5l","mediaQuery":"(max-width: 809.98px)"},{"hash":"1t24cya","mediaQuery":"(min-width: 1280px)"},{"hash":"65kzqc","mediaQuery":"(min-width: 810px) and (max-width: 1279.98px)"},{"hash":"k7b1cf","mediaQuery":"(max-width: 809.98px)"}]}'
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
          <AppLayout />
        </div>
        <div id="template-overlay" />
      </div>
    </HeroStateProvider>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();

  if (pathname === '/about') {
    return (
      <Suspense fallback={null}>
        <AboutExperience />
      </Suspense>
    );
  }

  return <HomeSite />;
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
