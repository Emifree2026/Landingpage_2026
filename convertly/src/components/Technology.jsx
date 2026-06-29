import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CircleCheck, MoveRight, ArrowRight
} from 'lucide-react';

import stepEcoPreFiltration from '../assets/Tech/Step1.1_ECOAIR.jpg';
import stepEcoCoalescence from '../assets/Tech/Step2.1_ECOAIR.webp';
import stepEcoSelfCleaning from '../assets/Tech/Step3_clean.webp';

import stepEariaPreFilter from '../assets/Tech/Step 1.webp';
import stepEariaIonization from '../assets/Tech/Step 2.webp';
import stepEariaCollectorPlates from '../assets/Tech/Step 3.webp';
import stepEariaOilCollection from '../assets/Tech/Step 4.webp';

const Technology = () => {
  // Refs for scroll navigation
  const processEcoRef = useRef(null);
  const processEariaRef = useRef(null);

  // Smooth scroll helper with offset for the fixed header.
  // The header height is measured live so it stays correct across
  // responsive breakpoints.
  const scrollToElement = (elementRef) => {
    const element = elementRef?.current;
    if (!element) return;
    const headerHeight = document.querySelector('header')?.offsetHeight ?? 64;
    const offset = headerHeight + 8; // +8 = breathing room
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  };

  return (
    <div
      id="technology"
      className="relative w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden scroll-mt-20"
    >
      {/* 1. Hero / Decision Intro */}
      <section className="pt-24 pb-8 md:pt-20 md:pb-12 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Choose the Right <span className="text-blue-700">Filtration Technology</span> for Your Process
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Whether you handle oil mist, emulsions, smoke, or ultra-fine aerosols — our self-cleaning
            filtration systems deliver cleaner air, lower maintenance, and stable performance.
          </p>
          <p className="text-slate-400 text-sm mt-3">
            Compare technologies below or jump directly to the right solution.
          </p>
        </motion.div>
      </section>

      {/* 2. Technology Selector Cards */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ECO AIR Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border border-slate-100"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-4">
              Best for Oil Mist & Emulsions
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">ECO AIR CLEANER</h3>
            <p className="text-slate-500 text-sm mt-1">Mechanical Oil Mist Separator</p>
            <p className="text-slate-600 mt-4">
              Constant suction performance through self-cleaning mechanical filtration and oil recycling.
            </p>
            <ul className="mt-5 space-y-2">
              {['Self-cleaning system', 'No filter mats', 'Oil recycling', 'Up to 1,500 m³/h'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-700">
                  <CircleCheck size={18} className="text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollToElement(processEcoRef)}
              className="mt-6 text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              Learn How It Works → <MoveRight size={16} />
            </button>
          </motion.div>

          {/* EARIA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border border-slate-100"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-4">
              Best for Smoke & Fine Aerosols
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">EARIA</h3>
            <p className="text-slate-500 text-sm mt-1">Electrostatic Filtration System</p>
            <p className="text-slate-600 mt-4">
              Electrostatic filtration for smoke, oil mist and ultra-fine particles with minimal maintenance.
            </p>
            <ul className="mt-5 space-y-2">
              {['Smoke & aerosol capture', 'Electrostatic filtration', 'No cartridge exchange', 'Adjustable up to 1000 m³/h'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-700">
                  <CircleCheck size={18} className="text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollToElement(processEariaRef)}
              className="mt-6 text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              Learn How It Works → <MoveRight size={16} />
            </button>
          </motion.div>
        </div>

      </section>

      {/* 4. How It Works - side by side */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProcessSection
            title="How ECO AIR Works"
            subtitle="Mechanical separation + coalescence"
            steps={[
              { title: 'Pre-Filtration', desc: 'Stainless steel mesh captures larger droplets before separation.' },
              { title: 'Coalescence', desc: 'Rotating drums enlarge tiny oil particles into larger droplets for efficient separation and oil recovery.' },
              { title: 'Self-Cleaning & Recycling', desc: 'Integrated spraying nozzles maintain constant performance and recycle collected oil.' },
            ]}
            imagePlaceholders={[
              stepEcoPreFiltration,
              stepEcoCoalescence,
              stepEcoSelfCleaning,
            ]}
            refProp={processEcoRef}
          />
          <ProcessSection
            title="How EARIA Works"
            subtitle="Electrostatic filtration"
            steps={[
              { title: 'Stainless steel pre-filter', desc: 'First stage captures larger particles to protect ionizer.' },
              { title: 'Ionization', desc: 'High voltage ionizer charges particles for electrostatic capture.' },
              { title: 'Collector plates', desc: 'Alternating plates attract and hold charged particles.' },
              { title: 'Oil particle collection', desc: 'Self-cleaning drain removes collected oil automatically.' },
            ]}
            imagePlaceholders={[
              stepEariaPreFilter,
              stepEariaIonization,
              stepEariaCollectorPlates,
              stepEariaOilCollection,
            ]}
            refProp={processEariaRef}
          />
        </div>
      </div>

      {/* 6. CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-slate-100 rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
            Not sure which filtration technology fits your application?
          </h3>
          <p className="text-slate-700 text-lg mt-4 max-w-2xl mx-auto">
            Tell us your contamination type, airflow requirements, or machine setup — we'll recommend the right solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a
              href="/#contact"
              className="px-6 py-3 border border-slate-300 bg-white rounded-full font-medium text-slate-800 hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get expert recommendation
            </a>
            <a
              href="/#knowledge"
              className="px-6 py-3 rounded-full font-medium text-blue-700 hover:text-blue-800 inline-flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              View more Technical Specs <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ------------------------------------------------------------------
// Interactive Process Component
// ------------------------------------------------------------------
const ProcessSection = ({ title, subtitle, steps, imagePlaceholders, refProp }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.section
      ref={refProp}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-slate-500 text-sm mb-6">{subtitle}</p>

      {isMobile ? (
        <div className="mb-6 overflow-x-auto whitespace-nowrap flex gap-2 pb-2">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeStep === idx
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 mb-6">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`text-left px-4 py-3 rounded-xl transition-all ${
                activeStep === idx
                  ? 'bg-blue-50 font-semibold text-blue-800'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <span className="text-sm font-medium">{step.title}</span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-2"
        >
          <div className="rounded-2xl overflow-hidden bg-slate-100 h-64 md:h-80 flex items-center justify-center p-4">
            <img
              src={imagePlaceholders[activeStep]}
              alt={steps[activeStep].title}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Illustration';
              }}
            />
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">{steps[activeStep].title}</h4>
            <p className="text-slate-600 mt-1">{steps[activeStep].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
};

// ------------------------------------------------------------------
// Product Variants with Tabs — removed (September 2026 cleanup).
// The "View more Technical Specs" CTA from this section lives in the
// CTA card above, alongside "Get expert recommendation".
// ------------------------------------------------------------------

export default Technology;