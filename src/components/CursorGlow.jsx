// src/components/CursorGlow.jsx
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorGlow = () => {
  const mouseX = useMotionValue(-50);
  const mouseY = useMotionValue(-50);

  // Smooth motion
  const x = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const y = useSpring(mouseY, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 10); // Offset for center
      mouseY.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "2px solid #9333ea", // Your primary color
        pointerEvents: "none",
        x: x,
        y: y,
        zIndex: 9999,
        background: "transparent",
      }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

export default CursorGlow;
