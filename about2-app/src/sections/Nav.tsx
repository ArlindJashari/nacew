import "./Nav.css";
import { homeUrl } from "../urls";

export function Nav() {
  return (
    <header className="site-nav">
      <a href="#home" className="site-nav-logo" aria-label="Nacew about">
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" width={88} height={21} />
      </a>
      <nav className="site-nav-links" aria-label="Primary">
        <a href={homeUrl()}>Home</a>
        <a href="#research">Research</a>
        <a href="#what-you-get">Services</a>
        <a href="mailto:contact@nacew.com" className="site-nav-cta">
          Contact
        </a>
      </nav>
    </header>
  );
}
