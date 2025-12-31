"use client";
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function HeartStep({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let lastTime;
    const tick = (t) => {
      if (!lastTime) lastTime = t;
      const delta = t - lastTime;
      
      if (isHolding && progress < 100) {
        // Smoothly increase progress over ~2 seconds
        setProgress(prev => Math.min(100, prev + delta / 20));
        lastTime = t;
        rafRef.current = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafRef.current);
      }
    };

    if (isHolding) rafRef.current = requestAnimationFrame(tick);
    if (progress >= 100) {
      setTimeout(onComplete, 500);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [isHolding, progress, onComplete]);

  // Circumference calculation for r=40
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/5 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/10 shadow-2xl w-full max-w-sm text-center"
    >
      <h2 className="text-pink-300 text-3xl font-bold mb-2 tracking-tight">
        A little surprise for you
      </h2>
      <p className="text-zinc-400 text-base mb-12">
        Before this year begins
      </p>

      {/* Main Interaction Area */}
      <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
        {/* Progress Circle SVG */}
        <svg className="w-full h-full absolute -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#f9a8d4"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (circumference * progress) / 100 }}
            strokeLinecap="round"
            transition={{ type: "tween", ease: "linear" }}
          />
        </svg>

        {/* Heart Button */}
        <button
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          className={`relative z-10 p-6 bg-pink-500 rounded-full transition-all duration-300 ${
            isHolding ? 'scale-90 shadow-inner' : 'scale-100 shadow-[0_0_25px_rgba(249,168,212,0.4)]'
          }`}
        >
          <Heart 
            fill="white" 
            color="white" 
            size={36} 
            className={isHolding ? 'animate-pulse' : ''} 
          />
        </button>
      </div>

      <p className="mt-12 text-zinc-500 text-sm tracking-[0.2em] uppercase font-medium">
        Tap and hold
      </p>
    </motion.div>
  );
}