// InlineIcon — declarative replacement for the parser's SVG <use> icon swaps
// (CheckIconSvg / ChevronIconSvg / LeftArrowIconSvg / RightArrowIconSvg in
// src/parser/nodeReplacers.jsx). Same 24x24 viewBox, paths, stroke vars and
// default token colors, so converted markup keeps identical icons without
// depending on the Framer <symbol> sprite in page.html.

const PATHS = {
  check: 'M20 6 9 17l-5-5',
  chevron: 'M6 15l6-6 6 6',
  arrowLeft: 'M15 19l-7-7 7-7',
  arrowRight: 'M9 5l7 7-7 7',
};

// Default stroke color tokens, matching the parser's per-icon defaults.
const DEFAULT_COLOR = {
  check: 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  chevron: 'var(--token-c6de8ea4-3684-4c2f-917e-fc3d1879d6b0, rgba(255, 255, 255, 0.65))',
  arrowLeft: 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  arrowRight: 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
};

export default function InlineIcon({ name = 'check', color, style, ...props }) {
  const stroke = `var(--4rxgx6, ${color || DEFAULT_COLOR[name]})`;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={style} {...props}>
      <path
        d={PATHS[name]}
        fill="none"
        stroke={stroke}
        strokeWidth="var(--1ww558a, 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
