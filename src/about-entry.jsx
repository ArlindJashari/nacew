import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AboutExperience from './pages/AboutExperience.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutExperience />
  </StrictMode>,
);
