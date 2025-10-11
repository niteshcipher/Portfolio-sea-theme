// src/components/InteractiveFish.js

import React from 'react';
import { motion } from 'framer-motion';
import './InteractiveFish.css';

// The component now accepts props with default values
const InteractiveFish = ({ size = 150, duration = 40, delay = 0 }) => {
  const swimAnimation = {
    x: ["-20vw", "110vw", "110vw", "-20vw", "-20vw"],
    y: ["20vh", "50vh", "30vh", "70vh", "20vh"],
    scaleX: [-1, -1, 1, 1, -1],
    rotate: [15, -20, -20, 15, 15],
  };

  const swimTransition = {
    duration: duration, // Use the duration from props
    delay: delay, // Use the delay from props
    repeat: Infinity,
    repeatType: "loop",
    ease: "linear",
    times: [0, 0.45, 0.55, 0.95, 1],
  };

  return (
    // We apply the size directly as an inline style
    <motion.div
      className="fish-wrapper"
      style={{ width: size, height: 'auto' }}
      animate={swimAnimation}
      transition={swimTransition}
    >
      <img
        src="/fish.png"
        alt="Swimming fish"
        className="hero-fish"
      />
    </motion.div>
  );
};

export default InteractiveFish;