import { useContext } from 'react';
import './HeroGrainBackground.css';
import { HeroTabContext } from './HeroTabContext';

export function useHeroGrainTab() {
  const context = useContext(HeroTabContext);
  return context ? context.activeTab : 0;
}

export default function HeroGrainBackground() {
  return (
    <div className="hero-grain" aria-hidden>
      <div className="hero-grain-blob-wrap">
        <div className="hero-grain-blob" />
        <div className="hero-grain-noise" />
      </div>
    </div>
  );
}
