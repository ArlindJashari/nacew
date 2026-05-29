import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import hillsBg from '../assets/hills-background.png';
import hillsFg from '../assets/hills-foreground.png';

export default function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-pill"
        >
          Custom software for growing teams
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="hero-title"
        >
          Your software<br />should belong to you.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="hero-subtitle"
        >
          Nacew helps companies replace expensive subscription tools with custom-built platforms they fully own — designed around their workflow, brand, and long-term growth.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          href="#"
          className="hero-button"
        >
          Start your project
        </motion.a>
      </div>

      {/* Background Hills */}
      <motion.img 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={hillsBg} 
        className="hero-bg-layer bg-back" 
        alt="" 
      />
      <motion.img 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        src={hillsFg} 
        className="hero-bg-layer bg-front" 
        alt="" 
      />
      <div className="hero-gradient-overlay" />
    </section>
  );
}
