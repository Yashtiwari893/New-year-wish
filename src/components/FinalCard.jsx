"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FinalCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05030a] px-4 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-900/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-[360px] flex flex-col items-center relative z-10">
        {/* Header */}
        <div className="text-center mb-10 select-none">
          <h2 className="text-[26px] font-bold text-white leading-tight tracking-tight">
            For my Cutiepie :)
          </h2>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
            Tap the card to read
          </p>
        </div>

        {/* Card Container */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative cursor-pointer"
          style={{ perspective: "2000px", width: "300px", height: "450px" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Inside Page (Stationary) */}
          <div className="absolute inset-0 rounded-[24px] bg-[#fffdf8] border-[8px] border-[#A855F7] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
            {/* Scrollable Content Wrapper */}
            <div className="flex-1 overflow-y-auto p-6 pt-8 custom-scrollbar">
              <div className="space-y-4 text-zinc-800 text-[15px] leading-relaxed italic text-center pb-4">
                <p className="font-bold not-italic text-purple-600">Sunny, love you yaar ❤️</p>
                
                <p>
                  Mujhe pata hai shayad tumhari side se kuchh nahi hai,
                  but phir bhi main karta hoon, because my heart doesn’t know how to stop.
                </p>

                <p>
                  Tumhari ek chhoti si message, ek normal si chat,
                  ya bas tumhara naam notification mein dikh jaana —
                  that alone makes me really happy.
                </p>

                <p>
                  New Year ke iss new start mein bas itna kehna hai,
                  even if I’m not important to you,
                  you are very important to me.
                </p>

                <p>
                  Chahe jo bhi ho, jaise bhi ho,
                  I’ll always silently wish the best for you.
                </p>

                <p className="pt-4 text-purple-600 font-bold not-italic border-t border-purple-100">
                  — Yours truly ❤️
                </p>
              </div>
            </div>
          </div>

          {/* Cover Page (Animated Flip) */}
          <motion.div
            initial={false}
            animate={{ rotateY: isOpen ? -150 : 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d", transformOrigin: "left" }}
            className="absolute inset-0 z-20"
          >
            {/* Front Cover */}
            <div
              className="absolute inset-0 rounded-[24px] overflow-hidden border-[8px] border-[#A855F7] shadow-2xl"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="/images/cover.webp"
                alt="Happy New Year"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://i.ibb.co/vY8pY8n/image-745893.jpg"; }}
              />
            </div>

            {/* Backside of Cover */}
            <div
              className="absolute inset-0 rounded-[24px] bg-[#F6F0FF] border-[8px] border-[#A855F7] flex items-center justify-center px-6"
              style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            >
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-6">
                <p className="text-purple-400 italic text-sm text-center leading-relaxed">
                  Wishing you a year full of happiness, warmth and beautiful moments ✨
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #A855F7;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}