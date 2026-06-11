import "./StartCta.css";
import ContactTrigger from "../../components/ContactTrigger";

export function StartCta() {
  return (
    <section className="branch-install-section" id="start" data-nav-theme="dark">
      <div className="branch-install-container">
        <h2 className="branch-install-heading">
          Start
          <br />
          Nacew project now
        </h2>
        <ContactTrigger className="branch-install-button">
          <span className="branch-install-button-text">
            <span className="branch-install-button-cmd">Contact us </span>
            <span className="branch-install-button-arg">Get in touch</span>
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </ContactTrigger>
      </div>
    </section>
  );
}
