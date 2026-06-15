import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import ClientLogo1 from '../assets/logo_clients/mb_svg.svg';
import ClientLogo2 from '../assets/logo_clients/bmw.svg';
import ClientLogo3 from '../assets/logo_clients/gm.svg';
import ClientLogo4 from '../assets/logo_clients/NSK.svg';
import ClientLogo5 from '../assets/logo_clients/knorr.svg';
import ClientLogo6 from '../assets/logo_clients/siemens_logo.svg';

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

  // Two rows on mobile: row1 = 3 logos, row2 = 3 logos — all fit without wrapping
  const clientLogos = [
    { name: 'Mercedes-Benz', logo: ClientLogo1, maxWidth: 'clamp(28px, 4.5vw, 50px)' },
    { name: 'BMW',           logo: ClientLogo2, maxWidth: 'clamp(30px, 5vw,  55px)'  },
    { name: 'GM',            logo: ClientLogo3, maxWidth: 'clamp(30px, 5vw,  55px)'  },
    { name: 'NSK',           logo: ClientLogo4, maxWidth: 'clamp(45px, 8vw,  100px)' },
    { name: 'Knorr-Bremse',  logo: ClientLogo5, maxWidth: 'clamp(60px, 11vw, 130px)' },
    { name: 'Siemens',       logo: ClientLogo6, maxWidth: 'clamp(55px, 9vw,  100px)' },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-[#0a0a0a]">

        {/* Background Videos */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
        </div>

        {/* MAIN CONTENT — vertically centered, leaves room for logos at bottom */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-5 text-center"
             style={{ paddingBottom: 'clamp(120px, 22vh, 180px)' }}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Low maintenance air filtration solutions
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-emerald-100 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Engineered to clean itself.
          </motion.p>

          <motion.button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            See how it works
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* LOGOS — anchored to bottom, two rows on mobile */}
        <motion.div
          className="absolute left-0 right-0 z-20 w-full"
          style={{ bottom: 'clamp(24px, 5vh, 48px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider mb-2 text-center">
              Trusted by industry leaders
            </p>

            {/* Mobile: 2 rows of 3. sm+: single row */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:flex-nowrap sm:gap-6 md:gap-8 lg:gap-12">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={client.name}
                  // On mobile each item is ~33% wide so 3 fit per row
                  className="flex items-center justify-center w-[30%] sm:w-auto h-6 sm:h-8 md:h-10 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-auto object-contain brightness-0 invert"
                    style={{ maxWidth: client.maxWidth }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* DOTS */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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

      </section>
    </div>
  );
}

export default Hero;