import "./HomeHero.css";
import HeroAboutIntro from "../../components/HeroAboutIntro";
import { ProgressiveBlur } from "../components/ProgressiveBlur";
import { ContactModalProvider } from "../../components/ContactModal";
import { Nav } from "../sections/Nav";
import { ResearchInteract } from "./ResearchInteract";
import { TheShift } from "./TheShift";
import { WorldReach } from "./WorldReach";
import { ProcessHero } from "./ProcessHero";
import { StartCta } from "../sections/StartCta";
import { Footer } from "../sections/Footer";
import { Testimonials } from "@nacew/sections";

export function Home() {
  return (
    <ContactModalProvider>
    <>
      <ProgressiveBlur heroId="home" edge="bottom" height={100} />
      <Nav />
      <section className="hh" id="home" data-nav-theme="dark">
        <div className="hh-grain" aria-hidden>
          <div className="hh-grain-blob-wrap">
            <div className="hh-grain-blob hh-grain-blob--purple" />
            <div className="hh-grain-blob hh-grain-blob--red" />
            <div className="hh-grain-blob hh-grain-blob--teal" />
            <div className="hh-grain-blob hh-grain-blob--green" />
            <div className="hh-grain-noise" />
          </div>
        </div>

        <HeroAboutIntro variant="about" />

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
    </ContactModalProvider>
  );
}
