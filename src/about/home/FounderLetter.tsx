import "./FounderLetter.css";
import { FOUNDER_COVER, CLIRIM_SIGNATURE } from "../assets";

export function FounderLetter() {
  return (
    <div className="ph-letter" id="letter" data-nav-theme="light">
      <div className="ph-letter-inner">
        <figure className="ph-letter-hero">
          <img
            src={FOUNDER_COVER}
            alt="Nacew team in the studio"
            width={1080}
            height={608}
            loading="lazy"
          />
        </figure>

        <div className="ph-letter-content">
          <h2 className="ph-letter-title">
            An open letter from our founder: the future of product design is human-first.
          </h2>

          <div className="ph-letter-body">
            <p>
              The rise of AI has brought us to a crossroads in how products are built. Many teams
              are choosing to replace human judgment with automation and shortcuts. We&apos;ve taken
              a different path at nacew. We believe deeply in the irreplaceable value of human
              insight in product design.
            </p>
            <p>
              Our mission isn&apos;t to hand teams a polished interface and walk away. It&apos;s to
              amplify what makes great products human. We run the research, strategy, and design
              work that drains a product team&apos;s week, so they can focus on what matters most:
              understanding users and shipping what actually moves the business.
            </p>
            <p>
              What sets nacew apart? Every project starts with evidence: market context, user
              interviews, and a clear job for the product. We adapt to your organization&apos;s
              specific needs while giving teams context on why each design decision matters. While
              many agencies minimize thinking and maximize pixels, we&apos;re maximizing clarity and
              human potential.
            </p>
            <p>
              For founders and product leaders, we&apos;re ending the frustrating gap between vision
              and shipped experience. Everyone deserves a partner who sees the full picture:
              research, strategy, and craft in one thread. Through honest feedback and structured
              design, we help teams navigate a changing landscape with confidence and dignity.
            </p>
          </div>

          <h3 className="ph-letter-subhead">A future where everyone wins.</h3>

          <div className="ph-letter-body ph-letter-closing">
            <p>
              We&apos;re building a future where teams connect with their users more effectively,
              companies ship the right product faster, and the people behind the work receive the
              guidance they need to succeed.
            </p>
            <p>
              This is product design reimagined. Where research elevates human judgment, strategy
              sets direction, and craft handles the details so people can focus on the remarkable.
            </p>
            <p>Join us in building this future.</p>
          </div>

          <div className="ph-letter-sign">
            <p>Sincerely,</p>
            <p className="ph-letter-name">Clirim Vokshi</p>
            <p className="ph-letter-role">CEO</p>
            <img
              className="ph-letter-signature"
              src={CLIRIM_SIGNATURE}
              alt=""
              width={168}
              height={48}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
