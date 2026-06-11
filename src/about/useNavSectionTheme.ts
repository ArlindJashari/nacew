import { useEffect, useState } from "react";

const NAV_SAMPLE_Y = 76;

export function navSurfaceAtBand(): "dark" | "light" {
  const shell = document.querySelector(".nacew-nav-shell") as HTMLElement | null;
  const prevPointer = shell?.style.pointerEvents;
  if (shell) shell.style.pointerEvents = "none";

  const x = Math.round(window.innerWidth / 2);
  const y = NAV_SAMPLE_Y;
  let node = document.elementFromPoint(x, y) as Element | null;

  if (shell) shell.style.pointerEvents = prevPointer ?? "";

  while (node && node !== document.documentElement) {
    const theme = node.getAttribute("data-nav-theme");
    if (theme === "light" || theme === "dark") {
      return theme;
    }
    node = node.parentElement;
  }

  return window.scrollY < window.innerHeight * 0.55 ? "dark" : "light";
}

/** Background tone under the fixed nav — drives backdrop, not link color. */
export function useNavSurfaceTheme() {
  const [surfaceTheme, setSurfaceTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      setSurfaceTheme(navSurfaceAtBand());
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return surfaceTheme;
}
