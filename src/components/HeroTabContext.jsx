import { createContext, useState } from 'react';

export const HeroTabContext = createContext(null);

export function HeroStateProvider({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <HeroTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </HeroTabContext.Provider>
  );
}
