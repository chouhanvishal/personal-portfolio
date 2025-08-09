"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ParallaxContextType {
  scrollY: number;
}

const ParallaxContext = createContext<ParallaxContextType>({ scrollY: 0 });

export const useParallax = () => useContext(ParallaxContext);

interface ParallaxProviderProps {
  children: ReactNode;
}

export const ParallaxProvider: React.FC<ParallaxProviderProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ParallaxContext.Provider value={{ scrollY }}>
      {children}
    </ParallaxContext.Provider>
  );
};