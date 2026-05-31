// Footer — declarative React. Link data lives in the arrays below and is
// rendered through small helpers; the surrounding markup mirrors the original
// Framer-export classes/styles so the existing CSS in src/index.css renders it
// unchanged. No dependency on src/content/page.html or the runtime parser.

const PRODUCT_LINKS = [
  { cls: 'framer-1v0ps5u', href: './#about', label: 'Approach' },
  { cls: 'framer-5lc3vm', href: './#services', label: 'Platforms' },
  { cls: 'framer-k0yq1n', href: './#what-you-get', label: 'Use Cases' },
  { cls: 'framer-1va48o1', href: './#pricing', label: 'Pricing', strong: true },
];

const COMPANY_LINKS = [
  { cls: 'framer-1l1t6ji', href: 'mailto:join@nacew.com', label: 'Join Nacew' },
  { cls: 'framer-1l1t6ji', href: 'mailto:contact@nacew.com', label: 'Contact' },
  { cls: 'framer-1l1t6ji', href: './terms-of-use', label: 'Terms of Use' },
  { cls: 'framer-1yrbxnb', href: './privacy-policy', label: 'Privacy Policy' },
];

// A column heading ("Product" / "Company") rendered as Framer's two responsive
// SSR variants (the mobile copy centers its text).
function ColumnTitle({ cls, label }) {
  return (
    <>
      <div className="ssr-variant hidden-k7b1cf">
        <div className={cls} data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={{ '--framer-text-color': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))' }}>{label}</p>
        </div>
      </div>
      <div className="ssr-variant hidden-65kzqc hidden-1t24cya">
        <div className={cls} data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={{ '--framer-text-alignment': 'center', '--framer-text-color': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))' }}>{label}</p>
        </div>
      </div>
    </>
  );
}

// A footer link rendered as Framer's two responsive SSR variants. Framer's CSS
// hides whichever variant does not match the active breakpoint.
function FooterLink({ cls, href, label, strong }) {
  const text = strong ? <strong className="framer-text">{label}</strong> : label;
  return (
    <>
      <div className="ssr-variant hidden-k7b1cf">
        <div className={cls} data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto"><a className="framer-text framer-styles-preset-v2iiak" data-styles-preset="Bh7brll6H" href={href}>{text}</a></p>
        </div>
      </div>
      <div className="ssr-variant hidden-65kzqc hidden-1t24cya">
        <div className={cls} data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={{ '--framer-text-alignment': 'center' }}><a className="framer-text framer-styles-preset-v2iiak" data-styles-preset="Bh7brll6H" href={href}>{text}</a></p>
        </div>
      </div>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="framer-15kwehq" data-border="true" data-framer-name="Footer">
      <div className="framer-zz81tn" data-framer-name="container">
        <div className="framer-123zn8e">
          <div className="framer-yk6mz3"><img alt="" className="framer-BDJ8W framer-1dd3oij" src="data:image/svg+xml,<svg display=&quot;block&quot; role=&quot;presentation&quot; viewBox=&quot;0 0 72 72&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;M 43.21 0 C 51.378 0 58 6.622 58 14.79 L 58 43.21 C 58 51.378 51.378 58 43.21 58 L 14.79 58 C 6.622 58 0 51.378 0 43.21 L 0 14.79 C 0 6.622 6.622 0 14.79 0 Z M 39.683 12.083 C 23.683 12.083 18.645 25.254 18.125 31.84 L 18.125 45.917 L 25.397 45.917 C 25.397 32.625 36.197 32.005 39.683 31.84 L 39.683 25.419 C 29.412 25.419 27.216 28.876 25.397 30.605 C 28.348 20.134 36.151 18.34 39.683 18.751 Z&quot; fill=&quot;rgb(255, 255, 255)&quot; height=&quot;58px&quot; id=&quot;yVjjUiPgo&quot; transform=&quot;translate(7 7)&quot; width=&quot;58px&quot;/></svg>" /></div>
          <div className="framer-2gawpk">
            <div className="framer-zbagcq">
              <ColumnTitle cls="framer-3gkhif" label="Product" />
              <div className="framer-1evr4bd">
                {PRODUCT_LINKS.map((link) => <FooterLink key={link.label} {...link} />)}
              </div>
            </div>
            <div className="framer-1rraqux">
              <ColumnTitle cls="framer-48hbrp" label="Company" />
              <div className="framer-1k9b3rk">
                {COMPANY_LINKS.map((link) => <FooterLink key={link.label} {...link} />)}
                <div className="framer-18wseok-container"><button className="__framer-cookie-component-button" aria-label="Cookie Trigger" style={{ width: "100%", height: "100%", background: "none", display: "flex", border: "none", padding: "0", color: "var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))", fontSize: "14px", cursor: "pointer", fontFamily: "&quot", "Inter&quo": "Inter&quot", ", &quo": ", &quot", "Inter Placeholder&quo": "Inter Placeholder&quot", ", sansSeri": ", sans-serif", fontStyle: "normal", fontWeight: "400", letterSpacing: "0em", lineHeight: "1.4em" }}><span style={{ whiteSpace: "nowrap" }}>Cookie Settings</span></button></div>
              </div>
            </div>
          </div>
        </div>
        <div className="framer-70az75" />
        <div className="framer-dtf6w2">
          <div className="framer-lt1zyc" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}><p className="framer-text framer-styles-preset-10qv886" data-styles-preset="dvE5DE7ca" dir="auto" style={{ "--framer-text-color": "var(--token-c6de8ea4-3684-4c2f-917e-fc3d1879d6b0, rgba(255, 255, 255, 0.65))" }}>© 2026 Nacew. All rights reserved.</p></div>
          <div className="framer-gaqks3"><div className="framer-8j3hvm" data-framer-component-type="RichTextContainer" style={{ willChange: "transform", opacity: "0", transform: "translateY(24px)" }}><p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto"><a className="framer-text framer-styles-preset-v2iiak" data-styles-preset="Bh7brll6H" href="mailto:contact@nacew.com" rel="noopener">contact@nacew.com</a></p></div></div>
        </div>
      </div>
    </footer>
  );
}
