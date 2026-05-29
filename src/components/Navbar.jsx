import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <a href="/" className="nav-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="4"></rect>
          <path d="M15 9h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4"></path>
          <path d="M9 15v4"></path>
        </svg>
        Nacew.
      </a>
      
      <div className="nav-links">
        <a href="#about" className="nav-link">About</a>
        <a href="#features" className="nav-link">Features</a>
        <a href="#what-you-get" className="nav-link">What you get</a>
        <a href="#pricing" className="nav-link">Pricing</a>
      </div>

      <div className="nav-actions">
        <a href="#go-to-app" className="nav-btn-outline">Go to app</a>
        <a href="#login" className="nav-link">Login</a>
        <a href="#get-started" className="nav-btn-solid get-started">Get started</a>
      </div>
    </nav>
  );
}
