// ResponsiveVariant — the Framer SSR-variant pattern made declarative. Framer
// exports two copies of responsive content and hides whichever does not match
// the active breakpoint via the `hidden-*` CSS classes. These helpers wrap
// children in the correct variant div so converted sections (e.g. Footer) keep
// the exact responsive behavior the existing CSS expects.

export function DesktopVariant({ children }) {
  return <div className="ssr-variant hidden-k7b1cf">{children}</div>;
}

export function MobileVariant({ children }) {
  return <div className="ssr-variant hidden-65kzqc hidden-1t24cya">{children}</div>;
}

// Render desktop + mobile copies from a single render function. `render`
// receives `true` for the mobile pass (e.g. to add centered text alignment).
export function ResponsiveVariant({ render }) {
  return (
    <>
      <DesktopVariant>{render(false)}</DesktopVariant>
      <MobileVariant>{render(true)}</MobileVariant>
    </>
  );
}
