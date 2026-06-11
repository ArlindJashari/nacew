import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlowFrame } from './FAQ';
import './ToolComparison.css';

const tools = [
  // Front Layer
  { name: 'Slack', icon: '/logos/slack.svg', x: 50, y: 30, rotate: -5, scale: 1.3, zIndex: 10, notifications: 19 },
  { name: 'Zoom', icon: '/logos/zoom.svg', x: -30, y: 35, rotate: 8, scale: 1.2, zIndex: 9, notifications: 3 },
  { name: 'Notion', icon: '/logos/notion.svg', x: -100, y: 15, rotate: -8, scale: 1.1, zIndex: 8, notifications: 7 },
  
  // Middle Layer
  { name: 'Docs', icon: '/logos/docs.svg', x: -110, y: -45, rotate: 12, scale: 1.0, zIndex: 7 },
  { name: 'Figma', icon: '/logos/figma.svg', x: -15, y: -30, rotate: -5, scale: 1.1, zIndex: 6, notifications: 12 },
  { name: 'Teams', icon: '/logos/teams.svg', x: 115, y: 15, rotate: -15, scale: 0.9, zIndex: 7, notifications: 5 },
  { name: 'Confluence', icon: '/logos/confluence.svg', x: 50, y: -50, rotate: -8, scale: 1.0, zIndex: 6, notifications: 8 },
  
  // Back Layer
  { name: 'Asana', icon: '/logos/asana.svg', x: -60, y: -80, rotate: 5, scale: 0.8, zIndex: 5, notifications: 2 },
  { name: 'Drive', icon: '/logos/drive.svg', x: 130, y: -20, rotate: 20, scale: 0.8, zIndex: 4, notifications: 15 },
  { name: 'Loom', icon: '/logos/loom.svg', x: -140, y: -10, rotate: -5, scale: 0.7, zIndex: 4 },
  { name: 'Trello', icon: '/logos/trello.svg', x: 10, y: -80, rotate: 15, scale: 0.9, zIndex: 3 },
];

function FloatingTool({ tool, spreadMultiplier }) {
  const x = useTransform(spreadMultiplier, (multiplier) => tool.x * multiplier);
  const y = useTransform(spreadMultiplier, (multiplier) => tool.y * multiplier);
  const rotate = useTransform(spreadMultiplier, (multiplier) => tool.rotate * multiplier);

  return (
    <motion.div
      className="tc-floating-logo"
      style={{
        x,
        y,
        rotate,
        scale: tool.scale || 1,
        zIndex: tool.zIndex || 1,
      }}
    >
      <img
        src={tool.icon}
        alt={tool.name}
        className="tc-logo-img"
      />
      {tool.notifications && (
        <div className="tc-notification-bubble">
          {tool.notifications}
        </div>
      )}
    </motion.div>
  );
}

export default function ToolComparison() {
  const containerRef = useRef(null);
  
  // Track scroll progress within the component's boundaries
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Spread out multiplier - animates from 0.2 (bunched up) to 1.2 (spread out)
  const spreadMultiplier = useTransform(scrollYProgress, [0, 1], [0.1, 1.1]);

  return (
    <section className="tool-comparison-section" ref={containerRef}>
      <div className="tc-container">
        <div className="tc-grid">
          {/* BEFORE SIDE */}
          <div className="tc-column">
            <div className="tc-visualization tc-chaos-viz">
              {tools.map((tool) => (
                <FloatingTool
                  key={tool.name}
                  tool={tool}
                  spreadMultiplier={spreadMultiplier}
                />
              ))}
            </div>

            <div className="tc-divider-wrapper">
              <div className="tc-divider-line"></div>
              <div className="tc-divider-pill">Before</div>
              <div className="tc-divider-line"></div>
            </div>

            <ul className="tc-feature-list tc-feature-list-before">
              <li>Paying for 10+ <u>SaaS subscriptions</u></li>
              <li>Endless per-seat <u>pricing that scales</u></li>
              <li>Locked into rigid, off-the-shelf features</li>
              <li>Zero ownership of your <u>source code</u></li>
              <li>Fragmented tools and scattered billing</li>
            </ul>

            <div className="tc-scribble">
              <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 18C8 14 12 6 18 6C24 6 28 14 34 14C40 14 44 6 50 6C56 6 58 10 58 10" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* AFTER SIDE */}
          <div className="tc-column">
            <div className="tc-visualization tc-unified-viz">
              <motion.div 
                className="tc-nacew-logo-container"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <GlowFrame
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
                  radius="36px"
                  innerRadius="35px"
                  background="var(--token-aecd04de-bd30-4743-90e2-2b56d3d58e1b, rgba(255, 255, 255, 0.1))"
                  innerBackground="var(--token-9a0a5818-786e-4389-a1ff-e52b77b8236e, rgba(23, 23, 23, 0.85))"
                  proximity={80}
                />
                <img src="/logo.svg" alt="Nacew" className="tc-nacew-logo" />
              </motion.div>
            </div>

            <div className="tc-divider-wrapper">
              <div className="tc-divider-line"></div>
              <div className="tc-divider-pill">After</div>
              <div className="tc-divider-line"></div>
            </div>

            <ul className="tc-feature-list tc-feature-list-after">
              <li>Custom apps built <u>exactly for your workflow</u></li>
              <li>100% proprietary <u>code ownership</u></li>
              <li>Host on your cloud or let us manage it</li>
              <li>Tailored features with <u>unlimited flexibility</u></li>
              <li>Clear, structured development roadmaps</li>
            </ul>
            
            <div className="tc-oh-yeah">OH YEAH, AND...</div>
            
            <ul className="tc-feature-list tc-feature-list-after">
              <li>Pay once, <u>use forever</u> with unlimited users</li>
              <li>Stop renting your software, <u>own it</u></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
