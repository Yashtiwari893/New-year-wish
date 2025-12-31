"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
/* Video ke matching icons */
import { Briefcase, Brain, CloudRain, MapPin, Gift } from 'lucide-react';

const initialCardsData = [
  { 
    id: 1, 
    text: 'Distance', 
    color: 'bg-[#b4d4ff] text-blue-900', 
    icon: <MapPin size={32} strokeWidth={1.5} /> 
  },
  { 
    id: 2, 
    text: 'Stress', 
    color: 'bg-[#fff5ba] text-yellow-900', 
    icon: <Brain size={32} strokeWidth={1.5} /> 
  },
  { 
    id: 3, 
    text: 'Work', 
    color: 'bg-[#ffd1a9] text-orange-900', 
    icon: <Briefcase size={32} strokeWidth={1.5} /> 
  },
  { 
    id: 4, 
    text: 'Bad Days', 
    color: 'bg-[#ffcce5] text-pink-900', 
    icon: <CloudRain size={32} strokeWidth={1.5} /> 
  },
];

export default function ClearDistractions({ onComplete }) {
  const [cards, setCards] = useState(initialCardsData);

  const handleDragEnd = (cardId, info) => {
    // Agar card 100px se zyada move ho ya fast swipe (velocity) ho
    const isFlicked = Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500;
    
    if (isFlicked) {
      setCards((prev) => {
        const remaining = prev.filter((c) => c.id !== cardId);
        return remaining;
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Something is waiting for you</h2>
        <p className="text-zinc-500 italic">Move the little distractions aside</p>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Revealed Gift Box (Bottom Layer) */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: cards.length === 0 ? 1.2 : 1, 
            opacity: 1 
          }}
          className="absolute z-0"
        >
          <button 
            onClick={() => cards.length === 0 && onComplete()}
            className={`p-10 rounded-3xl transition-all duration-500 ${
              cards.length === 0 
              ? 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_0_50px_rgba(236,72,153,0.6)] cursor-pointer hover:scale-110' 
              : 'bg-zinc-800/50 opacity-20'
            }`}
          >
            <Gift size={64} className="text-white" />
          </button>
        </motion.div>

        {/* Draggable Cards Stack (Top Layer) */}
        <AnimatePresence shadow-xl>
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={(_, info) => handleDragEnd(card.id, info)}
              initial={{ scale: 1, rotate: (i - 1) * 6 }}
              exit={{ 
                x: (Math.random() - 0.5) * 1000, 
                y: (Math.random() - 0.5) * -500, 
                rotate: 120, 
                opacity: 0 
              }}
              whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing' }}
              className={`absolute w-36 h-52 ${card.color} rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 cursor-grab border-[6px] border-white`}
              style={{ 
                zIndex: i + 1,
                // Video jaisa stack look dene ke liye random positions
                top: `${15 + (i * 2)}%`,
                left: `${22 + (i * 1)}%`,
              }}
            >
              <div className="mb-4 opacity-80">{card.icon}</div>
              <span className="font-bold text-xl text-center leading-tight tracking-tight">
                {card.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-16">
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase font-semibold animate-pulse">
          {cards.length > 0 ? "Flick cards away" : "Open your gift"}
        </p>
      </div>
    </div>
  );
}