import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export function GlowFrame({
  children,
  className,
  radius = "16px",
  innerRadius = "15px",
  background = "rgba(255,255,255,0.08)",
  innerBackground = "rgba(23,23,23,0.9)",
  proximity = 240,
  glowColor = [255, 255, 255, 0.22] as [number, number, number, number],
  fadeBottom = false,
}: {
  children: ReactNode;
  className?: string;
  radius?: string;
  innerRadius?: string;
  background?: string;
  innerBackground?: string;
  proximity?: number;
  glowColor?: [number, number, number, number];
  fadeBottom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, on: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const near =
        e.clientX >= r.left - proximity &&
        e.clientX <= r.right + proximity &&
        e.clientY >= r.top - proximity &&
        e.clientY <= r.bottom + proximity;
      setPos({ x, y, on: near });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [proximity]);

  const style = {
    "--gf-radius": radius,
    "--gf-inner-radius": innerRadius,
    "--gf-bg": background,
    "--gf-inner-bg": innerBackground,
    "--gf-x": `${pos.x}px`,
    "--gf-y": `${pos.y}px`,
    "--gf-glow": `rgba(${glowColor.join(",")})`,
    "--gf-on": pos.on ? 1 : 0,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`glow-frame${fadeBottom ? " glow-frame--fade-bottom" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div className="glow-frame-inner">{children}</div>
    </div>
  );
}
