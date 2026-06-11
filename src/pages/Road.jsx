import { useEffect, useRef } from 'react';
import {
  Palette,
  Globe,
  Smartphone,
  Server,
  LayoutDashboard,
  Layers,
  Workflow,
  BarChart3,
  Plug,
  Building2,
  CalendarDays,
  CreditCard,
  Wrench,
  ShieldCheck,
} from 'lucide-react';
import './Road.css';

/*
 * Each column mirrors the reference layout: stacked pastel cards,
 * the last card of every column squares off and "melts" into a long
 * curved gradient tail that leans toward the bottom center, fading
 * into a soft colored mist with "... and much more" beneath.
 */
const COLUMNS = [
  {
    lean: 30,
    cards: [
      {
        title: 'UX/UI Design',
        desc: 'Flows, wireframes and pixel-perfect interfaces your users actually enjoy using.',
        bg: '#EBDCFB',
        accent: '#7C3AED',
        Icon: Palette,
        minH: 330,
      },
      {
        title: 'Web Apps',
        desc: 'Fast, scalable web applications — from landing pages to full platforms.',
        bg: '#D6EAF9',
        accent: '#2563EB',
        Icon: Globe,
        minH: 320,
      },
      {
        title: 'Mobile Apps',
        desc: 'Native-feeling iOS and Android apps from one codebase, shipped to both stores.',
        bg: '#FBDCC7',
        accent: '#F97316',
        Icon: Smartphone,
        minH: 360,
        tail: true,
      },
    ],
  },
  {
    lean: 14,
    cards: [
      {
        title: 'Backend & APIs',
        desc: 'Robust backends, clean APIs and infrastructure that scales with your business.',
        bg: '#BFEFCF',
        accent: '#16A34A',
        Icon: Server,
        minH: 330,
      },
      {
        title: 'CRM & Dashboards',
        desc: 'Custom CRMs and dashboards shaped around your workflow — not the other way around.',
        bg: '#FBE9A9',
        accent: '#D97706',
        Icon: LayoutDashboard,
        minH: 320,
      },
      {
        title: 'App Builder',
        desc: 'Your own internal platform: build, deploy and iterate on tools without vendors.',
        bg: '#FAD9BE',
        accent: '#EA580C',
        Icon: Layers,
        minH: 360,
        tail: true,
      },
    ],
  },
  {
    lean: 0,
    cards: [
      {
        title: 'Workflow Automations',
        desc: 'Repetitive work runs itself — approvals, handoffs and follow-ups on autopilot.',
        bg: '#F8CFD6',
        accent: '#DB2777',
        Icon: Workflow,
        minH: 330,
      },
      {
        title: 'Custom Analytics',
        desc: 'Live reports built on your data, answering the questions dashboards usually dodge.',
        bg: '#FAE6DC',
        accent: '#C2410C',
        Icon: BarChart3,
        minH: 330,
      },
      {
        title: 'Integrations',
        desc: 'Your CRM, billing, email and warehouse finally talking to each other.',
        bg: '#C9E5FA',
        accent: '#0284C7',
        Icon: Plug,
        minH: 330,
        tail: true,
      },
    ],
  },
  {
    lean: -14,
    cards: [
      {
        title: 'Internal OS',
        desc: 'Approvals, expenses, directory — your company operations in one internal tool.',
        bg: '#D2F5D2',
        accent: '#15803D',
        Icon: Building2,
        minH: 330,
      },
      {
        title: 'Booking Systems',
        desc: 'Scheduling, availability and reminders tailored to how your team really books.',
        bg: '#FBE5A9',
        accent: '#B45309',
        Icon: CalendarDays,
        minH: 320,
      },
      {
        title: 'Payments Hub',
        desc: 'Invoicing, subscriptions and payment recovery in one place.',
        bg: '#F9CDD3',
        accent: '#E11D48',
        Icon: CreditCard,
        minH: 230,
        tail: true,
      },
    ],
  },
  {
    lean: -30,
    cards: [
      {
        title: 'Maintenance & Support',
        desc: 'We stay after launch — monitoring, fixes and improvements every month.',
        bg: '#DCDCDE',
        accent: '#374151',
        Icon: Wrench,
        minH: 330,
      },
      {
        title: 'Security & Ownership',
        desc: 'You own the code, the data and the platform. No lock-in, ever.',
        bg: '#FBF3C5',
        accent: '#A16207',
        Icon: ShieldCheck,
        minH: 430,
        tail: true,
      },
    ],
  },
];

function Tail({ color, lean, colIndex }) {
  const k = lean;
  const d =
    `M 0 0 L 100 0 ` +
    `C 100 70 ${100 + k} 120 ${100 + k} 200 ` +
    `L ${k} 200 ` +
    `C ${k} 120 0 70 0 0 Z`;
  const gid = `road-tail-grad-${colIndex}`;
  return (
    <svg
      className="road-tail"
      data-reveal
      viewBox="0 0 100 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="1" />
          <stop offset="0.45" stopColor={color} stopOpacity="0.55" />
          <stop offset="0.78" stopColor={color} stopOpacity="0.22" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${gid})`} />
    </svg>
  );
}

export default function Road() {
  const rootRef = useRef(null);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = '#ffffff';
    return () => {
      document.body.style.background = prevBg;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const els = root.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('road-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="road-page" ref={rootRef}>
      <div className="road-wrap">
        <div className="road-grid">
          {COLUMNS.map((col, ci) => (
            <div className={`road-col road-col-${ci + 1}`} key={ci}>
              {col.cards.map((card, i) => {
                const { Icon } = card;
                return (
                  <article
                    className={`road-card${card.tail ? ' road-card-tail' : ''}`}
                    data-reveal
                    key={card.title}
                    style={{
                      background: card.bg,
                      minHeight: card.minH,
                      transitionDelay: `${i * 90}ms`,
                    }}
                  >
                    <div className="road-card-head">
                      <span className="road-icon" style={{ background: card.accent }}>
                        <Icon strokeWidth={2.1} />
                      </span>
                      <h3>{card.title}</h3>
                    </div>
                    <p>{card.desc}</p>
                  </article>
                );
              })}
              <Tail
                color={col.cards[col.cards.length - 1].bg}
                lean={col.lean}
                colIndex={ci}
              />
            </div>
          ))}
        </div>
        <div className="road-mist" />
        <p className="road-more">... and much more</p>
      </div>
    </div>
  );
}
