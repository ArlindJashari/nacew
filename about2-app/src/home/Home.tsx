import "./HomeHero.css";
import { ProgressiveBlur } from "../components/ProgressiveBlur";
import { Nav } from "../sections/Nav";
import { useClock } from "../hooks";
import { ResearchInteract } from "./ResearchInteract";
import { TheShift } from "./TheShift";
import { WorldReach } from "./WorldReach";
import { ProcessHero } from "./ProcessHero";
import { StartCta } from "../sections/StartCta";
import { Footer } from "../sections/Footer";
import { Testimonials } from "@nacew/sections";

export function Home() {
  const time = useClock("Europe/Belgrade");

  return (
    <>
      <ProgressiveBlur heroId="home" edge="bottom" height={100} />
      <Nav />
      <section className="hh" id="home">
        <div className="hh-grain" aria-hidden>
          <div className="hh-grain-blob-wrap">
            <div className="hh-grain-blob hh-grain-blob--purple" />
            <div className="hh-grain-blob hh-grain-blob--red" />
            <div className="hh-grain-blob hh-grain-blob--teal" />
            <div className="hh-grain-blob hh-grain-blob--green" />
            <div className="hh-grain-noise" />
          </div>
        </div>

        <p className="hh-statement">
          Design for teams who want to build a better version of their product.
        </p>

        <div className="hh-meta">
          <span className="hh-meta-left">
            Global product design studio
            <span className="hh-dot" aria-hidden />
            {time} Gjilan, Kosovo
          </span>
          <span className="hh-scroll">
            Scroll to explore <span aria-hidden>↓</span>
          </span>
        </div>

        <h1 className="hh-wordmark">nacew</h1>
      </section>

      <ResearchInteract />
      <TheShift />
      <WorldReach />
      <ProcessHero />
      <Testimonials />
      <StartCta />
      <Footer />
    </>
  );
}
