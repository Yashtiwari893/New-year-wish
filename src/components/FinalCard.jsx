"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FinalCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#0a0616] to-[#020104] px-4">

      <div className="w-full max-w-[360px] flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[26px] font-semibold text-white leading-tight">
            For my Cutiepie :)
          </h2>
          <p className="mt-2 text-xs italic text-white/60 tracking-wide">
            Tap the card to read
          </p>
        </div>

        {/* Card */}
        <div
          className="relative cursor-pointer transition-transform duration-300 ease-out
                     hover:scale-[1.02] active:scale-[0.97]"
          style={{ perspective: "2000px", width: "300px", height: "440px" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Inside */}
          <div className="absolute inset-0 rounded-[24px] bg-[#fffdf8]
                          shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                          px-8 py-10 flex items-center justify-center">
            <div className="max-w-[220px] text-center space-y-4 text-zinc-800 text-[14.5px] leading-relaxed italic">
              <p>I hope this year brings you calm mornings, peaceful nights,</p>
              <p>and little moments that make you smile without any reason.</p>
              <p>No matter what this year holds for you,</p>
              <p>I hope you always feel supported, valued, and understood.</p>
              <p>May every challenge turn into strength,</p>
              <p>and every quiet day remind you of how special you truly are.</p>

              <p className="pt-6 text-purple-600 font-semibold not-italic">
                — Yours truly ❤️
              </p>
            </div>
          </div>

          {/* Cover */}
          <motion.div
            initial={false}
            animate={{ rotateY: isOpen ? -155 : 0 }}
            transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left",
            }}
            className="absolute inset-0"
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-[24px] overflow-hidden
                         shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="./images/cover.webp"
                alt="Happy New Year"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-[24px] bg-[#f5ecff]
                         flex items-center justify-center px-6"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <p className="text-purple-400 italic text-sm text-center">
                Wishing you a year full of happiness,
                <br /> warmth and beautiful moments ✨
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
