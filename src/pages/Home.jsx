import Hero from '../components/Hero';
import ToolComparison from '../components/ToolComparison';
import Intro from '../components/Intro';
import WhatYouGet from '../components/WhatYouGet';
import Bento from '../components/Bento';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <div
      className="framer-pAcom framer-eMoyh framer-knjRQ framer-9C3FS framer-gF1Dm framer-tz6Zq framer-cqiiB framer-kj696b"
      style={{ minHeight: '100vh', width: '100%' }}
    >
      <Hero />
      <ToolComparison />
      <Intro />
      <WhatYouGet />
      <Bento />
      <Testimonials />
      <FAQ />
    </div>
  );
}
