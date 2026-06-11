import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from './about/home/Home';
import './about/styles/tokens.css';
import './about/styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
