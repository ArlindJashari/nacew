import "./ProgressiveBlur.css";
import { useEffect, useState } from "react";

/**
 * Framer "Progressive Blur" - 8 stacked backdrop layers (Midu how-we-work).
 * @see https://midu.design/how-we-work
 */
const LAYERS = Array.from({ length: 8 }, (_, i) => ({
  blur: 0.13671875 * 2 ** i,
  mask: `linear-gradient(to bottom, rgba(0,0,0,0) ${i * 12.5}%, rgba(0,0,0,1) ${(i + 1) * 12.5}%, rgba(0,0,0,1) ${(i + 2) * 12.5}%, rgba(0,0,0,0) ${(i + 3) * 12.5}%)`,
}));

export function ProgressiveBlur({
  heroId = "home",
  edge = "bottom",
  height = 100,
}: {
  heroId?: string;
  edge?: "bottom" | "top";
  height?: number;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) {
      setOn(true);
      return;
    }
    const sync = () => setOn(hero.getBoundingClientRect().bottom < window.innerHeight * 0.98);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [heroId]);

  return (
    <div
      className={`progressive-blur progressive-blur-${edge}${on ? " is-on" : ""}`}
      style={{ ["--pb-height" as string]: `${height}px` }}
      aria-hidden
    >
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          className="progressive-blur-layer"
          style={{
            zIndex: i + 1,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
}
