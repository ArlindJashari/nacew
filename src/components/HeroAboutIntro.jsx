import { useEffect, useState } from 'react';
import './HeroAboutIntro.css';
import { HeroScrollPrompt, HeroSunIcon } from './HeroMetaEffects';

const STUDIO_LINE = 'Global product building studio';
const LOCATION = 'Gjilan, Kosovo';

const ABOUT_STATEMENT =
  'Product building for teams who want to ship a better version of their product.';

const HOME_STATEMENT = 'Stop renting tools. Build your platform.';

const HOME_SUBTEXT =
  'We design and build custom internal platforms for operations, approvals, reporting, inventory, and team workflows, built around your business, not someone else\'s subscription template.';

function useHeroClock(timeZone) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

export default function HeroAboutIntro({ variant = 'homepage' }) {
  const time = useHeroClock('Europe/Belgrade');
  const isAbout = variant === 'about';
  const statement = isAbout ? ABOUT_STATEMENT : HOME_STATEMENT;

  return (
    <div className={`hero-about-intro${isAbout ? ' hero-about-intro--about' : ''}`}>
      <div className="hero-about-intro-inner">
        <span className="hero-about-meta">
          {STUDIO_LINE}
          <HeroSunIcon />
          <span id="hero-about-time">
            {time} {LOCATION}
          </span>
        </span>
        <div className="hero-about-right">
          <p className="hero-about-statement">{statement}</p>
          {!isAbout ? <p className="hero-about-subtext">{HOME_SUBTEXT}</p> : null}
          <HeroScrollPrompt />
        </div>
      </div>
    </div>
  );
}
