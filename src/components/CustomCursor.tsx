"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    
    // Add cursor-none class to all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select");
    interactiveElements.forEach((el) => {
      el.classList.add("cursor-none");
    });

    return () => {
      document.body.style.cursor = "auto";
      interactiveElements.forEach((el) => {
        el.classList.remove("cursor-none");
      });
    };
  }, []);

  return (
    <>
      {/* Inner cursor (dot) */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gradient-1 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isClicking ? 0.5 : isHovering ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Outer cursor (ring) */}
      <motion.div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white z-[9998] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.8,
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 rounded-full bg-gradient-conic opacity-30 z-[9997] pointer-events-none blur-xl"
        animate={{
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
          scale: isHovering ? 1.2 : isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 1,
        }}
      />
    </>
  );
};

export default CustomCursor;