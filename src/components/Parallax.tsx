"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useParallax } from "./ParallaxProvider";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  offset?: number;
  easing?: number;
  disabled?: boolean;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  offset = 0,
  easing = 0.5,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const { scrollY } = useParallax();

  useEffect(() => {
    if (!ref.current) return;
    
    const setValues = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setElementTop(rect.top + window.scrollY);
        setElementHeight(rect.height);
      }
      setClientHeight(window.innerHeight);
    };

    setValues();
    window.addEventListener("resize", setValues);

    return () => {
      window.removeEventListener("resize", setValues);
    };
  }, [ref]);

  const calculateTransform = () => {
    if (disabled) return 0;
    
    const scrollYProgress = Math.max(0, Math.min(1, (scrollY - elementTop + clientHeight) / (elementHeight + clientHeight)));
    
    // Apply easing
    const easedProgress = scrollYProgress === 0 
      ? 0 
      : scrollYProgress === 1 
        ? 1 
        : scrollYProgress < 0.5 
          ? Math.pow(2 * scrollYProgress, easing) / 2 
          : 1 - Math.pow(2 * (1 - scrollYProgress), easing) / 2;
    
    // Calculate the transform value based on direction and speed
    const transformValue = (easedProgress - 0.5) * speed * 100 + offset;
    
    return direction === "up" 
      ? -transformValue 
      : direction === "down" 
        ? transformValue 
        : direction === "left" 
          ? -transformValue 
          : transformValue;
  };

  const transform = calculateTransform();
  
  const style = {
    transform: direction === "up" || direction === "down"
      ? `translateY(${transform}px)`
      : `translateX(${transform}px)`,
    transition: "transform 0.1s ease-out",
  };

  return (
    <div ref={ref} className={className} style={disabled ? {} : style}>
      {children}
    </div>
  );
};

export default Parallax;