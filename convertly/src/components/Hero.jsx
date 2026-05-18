import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const VIDEOS = [
  '/videos/Landing Video_2.1.mp4',
  'videos/Video Project 7_web.mp4',
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef0 = useRef(null);
  const videoRef1 = useRef(null);
  const videoRefs = [videoRef0, videoRef1];

  const handleVideoEnd = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  // Play the active video and pause the inactive one
  useEffect(() => {
    videoRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      if (i === activeIndex) {
        el.currentTime = 0;
        el.play().catch(() => { });
      } else {
        el.pause();
      }
    });
  }, [activeIndex]);

  // Attach ended listener to whichever video is active
  useEffect(() => {
    const el = videoRefs[activeIndex].current;
    if (!el) return;
    el.addEventListener('ended', handleVideoEnd);
    return () => el.removeEventListener('ended', handleVideoEnd);
  }, [activeIndex, handleVideoEnd]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">

      {/* Background Videos — both always mounted in the DOM */}
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

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
      </div>

      {/* Video indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i
                ? 'bg-emerald-400 w-6'
                : 'bg-white/30 w-1.5 hover:bg-white/50'}`}
            aria-label={`Switch to video ${i + 1}`} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          className="inline-flex items-center px-5 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Star className="w-4 h-4 mr-2" />
          Self-Cleaning Technology
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tighter mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Low maintenance filtration solutions
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-emerald-100 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Engineered to clean itself.
        </motion.p>

        <motion.button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center gap-3 mx-auto transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Contact us
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;