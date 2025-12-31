"use client";
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { Ticket } from 'lucide-react';

export default function TicketReveal({ onComplete }) {
  useEffect(() => {
    // Video jaisa heavy confetti explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF69B4', '#FFFFFF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FF69B4', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.8, rotateX: -20 }}
      animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ type: "spring", damping: 15 }}
      className="w-full max-w-sm mx-auto perspective-1000"
    >
      {/* Golden Ticket Card */}
      <div className="relative bg-[#1a1a2e] p-1 rounded-[2.5rem] shadow-[0_0_50px_rgba(255,215,0,0.2)] border border-yellow-500/30">
        <div className="bg-[#11111d] rounded-[2.2rem] p-8 text-center border border-white/5 relative overflow-hidden">
          
          {/* Top Yellow Logo Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-500/20 p-3 rounded-full border border-yellow-500/50">
              <Ticket className="text-yellow-500" size={32} />
            </div>
          </div>

          <h2 className="text-yellow-500 font-bold tracking-[0.3em] text-sm mb-1 uppercase">
            Golden Ticket
          </h2>
          <p className="text-zinc-500 text-[10px] mb-6 tracking-wider uppercase">
            Valid for every day ahead
          </p>

          {/* Dotted Separator Line like the video */}
          <div className="relative w-full flex items-center justify-center mb-6">
            <div className="absolute left-[-32px] w-6 h-6 bg-[#1a1a2e] rounded-full border-r border-yellow-500/30"></div>
            <div className="w-full border-t-2 border-dashed border-zinc-800"></div>
            <div className="absolute right-[-32px] w-6 h-6 bg-[#1a1a2e] rounded-full border-l border-yellow-500/30"></div>
          </div>

          <h3 className="text-2xl font-handwriting italic text-white mb-2 leading-tight">
            "Unlimited Love & Smiles"
          </h3>
          <p className="text-zinc-500 text-[10px] italic">No expiration date</p>

          {/* Golden Glow Effect inside */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Claim Button */}
      <button
        onClick={onComplete}
        className="mt-10 group w-full flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-all tracking-[0.2em] uppercase text-[11px] font-bold"
      >
        Claim Ticket 
        <motion.span 
          animate={{ x: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {">"}
        </motion.span>
      </button>
    </motion.div>
  );
}