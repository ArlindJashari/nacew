import "./StartCta.css";

const SIGNUP_URL = "https://auth.nacew.com/signup";

export function StartCta() {
  return (
    <section className="branch-install-section" id="start">
      <div className="branch-install-container">
        <h2 className="branch-install-heading">
          Start
          <br />
          Nacew project now
        </h2>
        <button
          type="button"
          className="branch-install-button"
          onClick={() => {
            window.location.href = SIGNUP_URL;
          }}
        >
          <span className="branch-install-button-text">
            <span className="branch-install-button-cmd">Contact us </span>
            <span className="branch-install-button-arg">auth.nacew.com</span>
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
        </button>
      </div>
    </section>
  );
}
