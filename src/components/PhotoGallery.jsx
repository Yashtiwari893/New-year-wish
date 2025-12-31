"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const photos = [
  { 
    id: 1, 
    src: '/images/photo1.jpg', // Aapki real image ka path
    caption: 'Sweetest moments' 
  },
  { 
    id: 2, 
    src: '/images/photo2.jpg', 
    caption: 'Always together' 
  },
  { 
    id: 3, 
    src: '/images/photo3.jpg', 
    caption: 'To more memories' 
  },
];

export default function PhotoGallery({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTap = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex((p) => p + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-white tracking-tight">
        Some moments from this year
      </h2>

      <div className="relative w-72 h-[400px] cursor-pointer" onClick={handleTap}>
        {/* Stacked background effects (Video style) */}
        <div className="absolute inset-0 bg-white/5 rounded-2xl rotate-3 scale-105 blur-sm" />
        <div className="absolute inset-0 bg-white/5 rounded-2xl -rotate-3 scale-105 blur-sm" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, rotate: -10, x: -50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 10, x: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="absolute inset-0 bg-white p-4 pb-12 shadow-2xl rounded-sm flex flex-col"
          >
            {/* Image Container */}
            <div className="relative w-full h-full overflow-hidden bg-zinc-200">
              <img 
                src={photos[currentIndex].src} 
                alt="Memory" 
                className="w-full h-full object-cover"
                // Placeholder error handling agar image na mile
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=Upload+Photo+Here"; }}
              />
            </div>
            
            {/* Handwritten Style Caption */}
            <div className="mt-6 text-center">
              <p className="text-zinc-800 text-xl font-medium tracking-tight" style={{ fontFamily: 'cursive' }}>
                {photos[currentIndex].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Progress Bar (Video style) */}
      <div className="mt-12 w-64 flex flex-col items-center gap-4">
        <div className="flex gap-2 w-full">
          {photos.map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: i <= currentIndex ? "100%" : "0%" }}
                className="h-full bg-pink-400"
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>
        <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] animate-pulse">
          Tap the photo to continue
        </p>
      </div>
    </div>
  );
}