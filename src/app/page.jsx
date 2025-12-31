"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeartStep from '@/components/HeartStep';
import ClearDistractions from '@/components/ClearDistractions';
import TicketReveal from '@/components/TicketReveal';
import PhotoGallery from '@/components/PhotoGallery';
import FinalCard from '@/components/FinalCard';

export default function Home() {
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);

  // This only runs once the component is mounted in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="relative  min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Stars - Only render if we are on the client */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isClient && [...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`, 
              width: `${Math.random() * 3}px`, 
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 3}s`
            }} 


     
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && <HeartStep onComplete={() => setStep(2)} />}
        {step === 2 && <ClearDistractions onComplete={() => setStep(3)} />}
        {step === 3 && <TicketReveal onComplete={() => setStep(4)} />}
        {step === 4 && <PhotoGallery onComplete={() => setStep(5)} />}
        {step === 5 && <FinalCard />}
      </AnimatePresence>
    </main>
  );
}