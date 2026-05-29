import { useEffect } from 'react';
import Lenis from 'lenis';
import { parseHTMLWithAnimations } from './parser';
// The full Framer-exported page markup lives in a sibling .html file and is
// imported as a raw string (Vite `?raw`). It is fed verbatim into the runtime
// parser below, which swaps in the interactive React/Framer-Motion components.
import htmlContent from './content/page.html?raw';
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
    <>
      {parseHTMLWithAnimations(htmlContent)}
    </>
  );
}
