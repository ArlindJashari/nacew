import { useEffect, useRef, useState, useContext } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Grainient from './Grainient';
import { HeroTabContext } from './HeroTabContext';

// FontAwesome-style SVG Icons
const I = {
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  card: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  chart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  dollar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
};

const MODULES = [
  {
    id: 'analytics',
    title: 'Custom Analytics',
    description: 'Track what actually matters. Build reports that reflect your unique KPIs without navigating complex enterprise software dashboards.',
    icon: I.chart,
    stats: [
      { val: 'Real-time', lbl: 'Sync' },
      { val: 'Custom', lbl: 'Dashboards' }
    ],
    accent: '#8B5CF6'
  },
  {
    id: 'booking',
    title: 'Booking System',
    description: 'Seamlessly manage appointments, schedules, and resources. Our fully owned booking module eliminates per-user subscription limits.',
    icon: I.calendar,
    stats: [
      { val: '10x', lbl: 'Faster' },
      { val: '0', lbl: 'Recurring Fees' }
    ],
    accent: '#2D88FF'
  },
  {
    id: 'payments',
    title: 'Payments Hub',
    description: "Process invoices and recurring payments with direct gateways. No hidden percentage cuts beyond your processor's base fee.",
    icon: I.card,
    stats: [
      { val: '100%', lbl: 'Your Revenue' },
      { val: 'PCI', lbl: 'Compliant' }
    ],
    accent: '#10B981'
  }
];

// Curated high-fidelity color combinations matching the modern mesh gradient aesthetic
const getGrainientColors = (tab) => {
  switch (tab) {
    case 0: // Analytics (Vibrant Magenta + Velvet Violet + Deep Obsidian Purple)
      return { color1: '#F35588', color2: '#9B51E0', color3: '#0F0314' };
    case 1: // Cost Comparison (Vibrant Ruby Red + Sunset Orange + Dark Crimson Voids)
      return { color1: '#FF0844', color2: '#FFB199', color3: '#1A0006' };
    case 2: // Booking (Vibrant Cyan + Electric Blue + Dark Space Navy)
      return { color1: '#00F2FE', color2: '#4FACFE', color3: '#0A0C1B' };
    case 3: // Payments (Neon Green + Royal Blue + Deep Emerald Black)
    default:
      return { color1: '#00F260', color2: '#0575E6', color3: '#031C12' };
  }
};

export default function SpatialMockup() {
  const ref = useRef(null);
  const context = useContext(HeroTabContext);
  const [localActiveTab, setLocalActiveTab] = useState(0);
  const activeTab = context ? context.activeTab : localActiveTab;
  const setActiveTab = context ? context.setActiveTab : setLocalActiveTab;
  const [isPaused, setIsPaused] = useState(false);

  // Pointer parallax values
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 18, mass: 0.6 });

  const handleMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    px.set(0);
    py.set(0);
  };

  const midX = useTransform(sx, (v) => v * 15);
  const midY = useTransform(sy, (v) => v * 8);
  const nearX = useTransform(sx, (v) => v * 24);
  const nearY = useTransform(sy, (v) => v * 12);
  const rotY = useTransform(sx, [-1, 1], [3, -3]);
  const rotX = useTransform(sy, [-1, 1], [-2, 2]);

  // Autoplay cycle
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 4);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTabClick = (index) => {
    setIsPaused(true);
    setActiveTab(index);
  };

  const currentColors = getGrainientColors(activeTab);
  
  return (
    <div className="spatial-mockup" ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <style>{css}</style>

      {/* Edge-to-edge high-performance WebGL animated liquid background from React Bits */}
      <div className="grainient-bg-wrapper">
        <Grainient
          color1={currentColors.color1}
          color2={currentColors.color2}
          color3={currentColors.color3}
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Parallax stage */}
      <motion.div className="sm-stage" style={{ rotateY: rotY, rotateX: rotX }}>
        
        {/* Left vertical sidebar */}
        <Layer px={nearX} py={nearY} className="sidebar-layer" enter={{ x: -20, opacity: 0 }} delay={0.1}>
          <div className="sidebar">
            {/* 1. Custom Analytics */}
            <button
              className={`nav-btn ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => handleTabClick(0)}
              style={{ '--btn-accent': '#8B5CF6' }}
              aria-label="Custom Analytics Module"
            >
              <span className="btn-icon">{I.chart}</span>
              <span className="btn-glow" />
            </button>

            {/* 2. Renting vs. Owning */}
            <button
              className={`nav-btn btn-dollar ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => handleTabClick(1)}
              style={{ '--btn-accent': '#EF4444' }}
              aria-label="Cost Comparison"
            >
              <span className="btn-icon">{I.dollar}</span>
              <span className="btn-glow" />
            </button>

            {/* 3. Booking System */}
            <button
              className={`nav-btn ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => handleTabClick(2)}
              style={{ '--btn-accent': '#2D88FF' }}
              aria-label="Booking System Module"
            >
              <span className="btn-icon">{I.calendar}</span>
              <span className="btn-glow" />
            </button>

            {/* 4. Payments Hub */}
            <button
              className={`nav-btn ${activeTab === 3 ? 'active' : ''}`}
              onClick={() => handleTabClick(3)}
              style={{ '--btn-accent': '#10B981' }}
              aria-label="Payments Hub Module"
            >
              <span className="btn-icon">{I.card}</span>
              <span className="btn-glow" />
            </button>
          </div>
        </Layer>

        {/* Content Container */}
        <div className="content-container">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="panel-wrapper"
              >
                <Layer px={midX} py={midY} className="panel-layer">
                  <div className="glass-panel" style={{ '--panel-accent': '#8B5CF6' }}>
                    <div className="panel-header">
                      <div className="icon-wrap">
                        {I.chart}
                      </div>
                      <h2>Custom Analytics</h2>
                    </div>
                    
                    <p className="panel-desc">{MODULES[0].description}</p>
                    
                    <div className="panel-stats">
                      {MODULES[0].stats.map((stat, sIdx) => (
                        <div key={sIdx} className="stat">
                          <span className="val">{stat.val}</span>
                          <span className="lbl">{stat.lbl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Layer>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="cost-comparison"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="panel-wrapper"
              >
                <Layer px={midX} py={midY} className="panel-layer">
                  <div className="glass-panel cost-card">
                    <div className="cost-header">
                      <h2>Renting vs. Owning</h2>
                      <p>Subscriptions compound month-over-month. Custom software is a flat upfront build that pays for itself.</p>
                    </div>

                    <div className="chart-container">
                      <svg viewBox="0 0 400 170" className="chart-svg">
                        <defs>
                          <linearGradient id="subGradient" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.75" />
                          </linearGradient>
                          <linearGradient id="ownGradient" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.75" />
                          </linearGradient>
                        </defs>

                        {/* Chart Grid Lines */}
                        <line x1="40" y1="20" x2="380" y2="20" className="grid-line" />
                        <line x1="40" y1="65" x2="380" y2="65" className="grid-line" />
                        <line x1="40" y1="110" x2="380" y2="110" className="grid-line" />
                        <line x1="40" y1="155" x2="380" y2="155" className="grid-line" />

                        {/* Y-Axis Labels */}
                        <text x="32" y="24" className="chart-label y-axis">$40k</text>
                        <text x="32" y="69" className="chart-label y-axis">$30k</text>
                        <text x="32" y="114" className="chart-label y-axis">$20k</text>

                        {/* SaaS Bundle Bar */}
                        <motion.rect
                          x="110"
                          initial={{ y: 155, height: 0 }}
                          animate={{ y: 25, height: 130 }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          width="60"
                          fill="url(#subGradient)"
                          rx="4"
                          stroke="rgba(239, 68, 68, 0.3)"
                          strokeWidth="1"
                        />
                        <text x="140" y="19" className="chart-label x-axis font-bold text-red">$45,000</text>
                        <text x="140" y="167" className="chart-label x-axis">SaaS Subscriptions</text>

                        {/* Custom Build Bar */}
                        <motion.rect
                          x="250"
                          initial={{ y: 155, height: 0 }}
                          animate={{ y: 85, height: 70 }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                          width="60"
                          fill="url(#ownGradient)"
                          rx="4"
                          stroke="rgba(16, 185, 129, 0.3)"
                          strokeWidth="1"
                        />
                        <text x="280" y="79" className="chart-label x-axis font-bold text-green">$25,000</text>
                        <text x="280" y="167" className="chart-label x-axis">Custom Build</text>
                      </svg>
                    </div>
                  </div>
                </Layer>
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="panel-wrapper"
              >
                <Layer px={midX} py={midY} className="panel-layer">
                  <div className="glass-panel" style={{ '--panel-accent': '#2D88FF' }}>
                    <div className="panel-header">
                      <div className="icon-wrap">
                        {I.calendar}
                      </div>
                      <h2>Booking System</h2>
                    </div>
                    
                    <p className="panel-desc">{MODULES[1].description}</p>
                    
                    <div className="panel-stats">
                      {MODULES[1].stats.map((stat, sIdx) => (
                        <div key={sIdx} className="stat">
                          <span className="val">{stat.val}</span>
                          <span className="lbl">{stat.lbl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Layer>
              </motion.div>
            )}

            {activeTab === 3 && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="panel-wrapper"
              >
                <Layer px={midX} py={midY} className="panel-layer">
                  <div className="glass-panel" style={{ '--panel-accent': '#10B981' }}>
                    <div className="panel-header">
                      <div className="icon-wrap">
                        {I.card}
                      </div>
                      <h2>Payments Hub</h2>
                    </div>
                    
                    <p className="panel-desc">{MODULES[2].description}</p>
                    
                    <div className="panel-stats">
                      {MODULES[2].stats.map((stat, sIdx) => (
                        <div key={sIdx} className="stat">
                          <span className="val">{stat.val}</span>
                          <span className="lbl">{stat.lbl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Layer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}

// Support Components
function Layer({ className, px, py, enter = {}, delay = 0, children }) {
  const { x = 0, y = 0, scale = 1, opacity = 1 } = enter;
  return (
    <motion.div className={`sm-float ${className}`} style={{ x: px, y: py }}>
      <motion.div
        className="sm-enter"
        initial={{ opacity, x, y, scale }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Styling CSS
const css = `
  .spatial-mockup {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 480px;
    border-radius: 36px !important;
    overflow: hidden;
    background: transparent;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif;
    perspective: 1600px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grainient-bg-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.85;
    pointer-events: none;
  }
  
  .sm-stage {
    position: absolute;
    inset: 0;
    z-index: 2;
    transform-style: preserve-3d;
    display: flex;
    align-items: flex-start;
    gap: 32px;
    padding: 30px 40px 40px;
    width: 100%;
    height: 100%;
  }

  .sm-float {
    will-change: transform;
  }

  .sm-enter {
    width: 100%;
    height: 100%;
  }

  .sidebar-layer {
    flex-shrink: 0;
    z-index: 10;
  }

  .content-container {
    flex: 1;
    position: relative;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .panel-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .panel-layer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  /* Glassmorphism Sidebar */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(20, 20, 25, 0.45);
    backdrop-filter: blur(28px) saturate(135%);
    -webkit-backdrop-filter: blur(28px) saturate(135%);
    padding: 20px 14px;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  /* Navigation Button Styling */
  .nav-btn {
    position: relative;
    background: transparent;
    border: none;
    color: rgba(255, 243, 240, 0.6);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
  }

  .nav-btn .btn-icon {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .nav-btn .btn-glow {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--btn-accent);
    opacity: 0;
    transform: scale(0.6);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1;
  }

  .nav-btn:hover {
    color: #fff;
  }

  .nav-btn:hover .btn-icon {
    transform: scale(1.1);
  }

  .nav-btn:hover .btn-glow {
    opacity: 0.15;
    transform: scale(1);
  }

  .nav-btn.active {
    color: #fff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }

  .nav-btn.active .btn-icon {
    transform: scale(1.05);
  }

  .nav-btn.active .btn-glow {
    opacity: 1;
    transform: scale(1);
  }

  /* Glassmorphism Panels */
  .glass-panel {
    width: 100%;
    max-width: 460px;
    padding: 36px;
    background: rgba(24, 25, 32, 0.55);
    backdrop-filter: blur(34px) saturate(135%);
    -webkit-backdrop-filter: blur(34px) saturate(135%);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 24px;
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: border-color 0.4s ease;
  }

  .glass-panel:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--panel-accent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .glass-panel h2 {
    font-size: 23px;
    font-weight: 650;
    letter-spacing: -0.5px;
    margin: 0;
  }

  .panel-desc {
    color: rgba(255, 243, 240, 0.72);
    line-height: 1.6;
    font-size: 14.5px;
    margin: 0;
  }

  .panel-stats {
    display: flex;
    gap: 28px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .stat .val {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .stat .lbl {
    font-size: 11px;
    color: rgba(255, 243, 240, 0.45);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 600;
  }

  /* Cost Card Special Styling */
  .cost-card {
    max-width: 500px;
    text-align: center;
    gap: 16px;
  }

  .cost-header h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .cost-header p {
    font-size: 13.5px;
    color: rgba(255, 243, 240, 0.7);
    line-height: 1.5;
    margin: 0;
  }

  /* Chart Layout */
  .chart-container {
    width: 100%;
    height: 170px;
    margin-top: 4px;
  }

  .chart-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .grid-line {
    stroke: rgba(255, 255, 255, 0.08);
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }

  .chart-label {
    fill: rgba(255, 243, 240, 0.45);
    font-size: 10.5px;
    font-family: -apple-system, sans-serif;
  }

  .chart-label.y-axis {
    text-anchor: end;
    alignment-baseline: middle;
  }

  .chart-label.x-axis {
    text-anchor: middle;
    font-size: 11px;
  }

  .chart-label.font-bold {
    font-weight: 700;
    font-size: 12.5px;
  }

  .text-red {
    fill: #EF4444;
  }

  .text-green {
    fill: #10B981;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .sm-stage {
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 20px;
    }

    .content-container {
      align-items: center;
    }

    .panel-wrapper {
      align-items: center;
    }

    .sidebar {
      flex-direction: row;
      padding: 10px 18px;
      border-radius: 100px;
    }

    .nav-btn {
      width: 40px;
      height: 40px;
    }

    .glass-panel {
      padding: 24px;
      gap: 16px;
    }

    .glass-panel h2 {
      font-size: 20px;
    }

    .panel-desc {
      font-size: 13.5px;
    }

    .stat .val {
      font-size: 18px;
    }

    .cost-card {
      padding: 24px;
    }

    .cost-header h2 {
      font-size: 20px;
    }

    .chart-container {
      height: 150px;
    }
  }
`;
