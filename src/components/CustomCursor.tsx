"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isCursorEnabled, setIsCursorEnabled] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Immediate mobile check for SSR safety
  const isMobileImmediate = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Use immediate check if hook hasn't loaded yet
  const shouldHideCursor = isMobile || isMobileImmediate || !isCursorEnabled;
  
  // Debug logging
  console.log('CustomCursor - isMobile:', isMobile, 'isMobileImmediate:', isMobileImmediate, 'isCursorEnabled:', isCursorEnabled, 'shouldHideCursor:', shouldHideCursor);

  // Keyboard shortcut to toggle cursor (C key)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        setIsCursorEnabled(!isCursorEnabled);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isCursorEnabled]);

  useEffect(() => {
    if (shouldHideCursor) {
      // On mobile, don't set initial position - let it follow touch naturally
      return;
    }

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
  }, [isMobile]);

  // Handle touch events for mobile
  useEffect(() => {
    if (!shouldHideCursor) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setMousePosition({ x: touch.clientX, y: touch.clientY });
      setIsTouching(true);
      setIsClicking(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setMousePosition({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
      setIsClicking(false);
    };

    const handleTouchCancel = () => {
      setIsTouching(false);
      setIsClicking(false);
    };

    // Add touch event listeners to the document
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchCancel);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [shouldHideCursor]);

  // Handle interactive element detection for mobile
  useEffect(() => {
    if (!shouldHideCursor) return;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover") ||
        target.closest("[role='button']") ||
        target.closest("[tabindex]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, [shouldHideCursor]);

  // Hide default cursor only on desktop
  useEffect(() => {
    if (shouldHideCursor) {
      // On mobile, keep default cursor behavior
      return;
    }

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
  }, [shouldHideCursor]);

  // Don't render cursor on mobile
  if (shouldHideCursor) {
    return null;
  }

  return (
    <>
      {/* Cursor Toggle Button */}
      <motion.button
        onClick={() => setIsCursorEnabled(!isCursorEnabled)}
        className="fixed top-4 right-4 z-[10000] w-10 h-10 rounded-full bg-gradient-1 border-2 border-white/20 shadow-neon flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isCursorEnabled ? "Disable Custom Cursor" : "Enable Custom Cursor"}
      >
        {isCursorEnabled ? "👁️" : "👁️‍🗨️"}
      </motion.button>

      {/* Inner cursor (dot) */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gradient-1 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 1.5,
          y: mousePosition.y - 1.5,
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