import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Import client logos
import ClientLogo1 from '../assets/logo_clients/bmw.svg';
import ClientLogo2 from '../assets/logo_clients/gm.svg';
import ClientLogo3 from '../assets/logo_clients/mb.svg';
import ClientLogo4 from '../assets/logo_clients/knorr.svg';
import ClientLogo5 from '../assets/logo_clients/siemens.svg';
import ClientLogo6 from '../assets/logo_clients/volkswagen.svg';

const VIDEOS = [
  '/videos/Landing Video_2.1.mp4',
  '/videos/Video Project 7_web.mp4',
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef0 = useRef(null);
  const videoRef1 = useRef(null);
  const videoRefs = [videoRef0, videoRef1];

  const handleVideoEnd = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  useEffect(() => {
    videoRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      if (i === activeIndex) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const el = videoRefs[activeIndex].current;
    if (!el) return;
    el.addEventListener('ended', handleVideoEnd);
    return () => el.removeEventListener('ended', handleVideoEnd);
  }, [activeIndex, handleVideoEnd]);

  const clientLogos = [
    { name: 'Client 1', logo: ClientLogo1 },
    { name: 'Client 2', logo: ClientLogo2 },
    { name: 'Client 3', logo: ClientLogo3 },
    { name: 'Client 4', logo: ClientLogo4 },
    { name: 'Client 5', logo: ClientLogo5 },
    { name: 'Client 6', logo: ClientLogo6 },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <section
        className="relative w-full min-h-screen flex flex-col justify-start overflow-hidden bg-[#0a0a0a] pt-20 md:pt-32"
        style={{ willChange: 'transform' }} // helps with orientation repaint
      >
        {/* Background Videos - full width coverage */}
        <div className="absolute inset-0 w-full h-full">
          {VIDEOS.map((src, i) => (
            <motion.video
              key={src}
              ref={videoRefs[i]}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: activeIndex === i ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <source src={src} type="video/mp4" />
            </motion.video>
          ))}

          {/* Overlays - ensure they cover exactly */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent" />
        </div>

        {/* Video indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? 'bg-emerald-400 w-6'
                  : 'bg-white/30 w-1.5 hover:bg-white/50'
              }`}
              aria-label={`Switch to video ${i + 1}`}
            />
          ))}
        </div>

        {/* Main Content - responsive padding & text */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mt-6 md:mt-8">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-3 md:mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Low maintenance filtration solutions
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-emerald-100 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Engineered to clean itself.
          </motion.p>

          <motion.button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3 mx-auto transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact us
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Trusted By - Responsive logos */}
        <motion.div
          className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-20 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 text-center">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={client.name}
                  className="flex items-center justify-center h-6 sm:h-8 md:h-10 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-auto max-w-[60px] sm:max-w-[80px] md:max-w-[100px] object-contain brightness-0 invert"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Hero;