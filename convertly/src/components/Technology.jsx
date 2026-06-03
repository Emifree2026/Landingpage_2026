import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CircleCheck, MoveRight, Wind, Settings, BarChart, Recycle, Cpu,
  RefreshCw, ArrowRight, Check
} from 'lucide-react';

const Technology = () => {
  // Refs for scroll navigation
  const heroRef = useRef(null);
  const selectorRef = useRef(null);
  const comparisonRef = useRef(null);
  const processEcoRef = useRef(null);
  const processEariaRef = useRef(null);
  const benefitsRef = useRef(null);
  const variantsRef = useRef(null);
  const ctaRef = useRef(null);

  const [activeNav, setActiveNav] = useState('eco');

  // Smooth scroll helper with offset for sticky header
  const scrollToElement = (elementRef) => {
    if (elementRef && elementRef.current) {
      const element = elementRef.current;
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Intersection Observer for sticky mini nav
  useEffect(() => {
    const sections = [
      { name: 'eco', ref: processEcoRef },
      { name: 'earia', ref: processEariaRef },
      { name: 'compare', ref: comparisonRef },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = entry.target.getAttribute('data-nav');
            if (name === 'eco') setActiveNav('eco');
            else if (name === 'earia') setActiveNav('earia');
            else if (name === 'compare') setActiveNav('compare');
          }
        });
      },
      { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach(({ name, ref }) => {
      if (ref.current) {
        ref.current.setAttribute('data-nav', name);
        observer.observe(ref.current);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="technology"
      className="relative w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden scroll-mt-20"
    >
      {/* Sticky Mini Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-20 z-30 flex justify-center px-2 py-3 overflow-x-auto"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-full shadow-md px-2 py-1 flex gap-1 border border-slate-200 overflow-x-auto scrollbar-hide">
          {[
            { id: 'eco', label: 'ECO AIR', ref: processEcoRef },
            { id: 'earia', label: 'EARIA', ref: processEariaRef },
            { id: 'compare', label: 'COMPARE', ref: comparisonRef },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToElement(item.ref)}
              className={`flex-shrink-0 px-2.5 md:px-5 py-1.5 md:py-2 text-[11px] md:text-sm font-medium rounded-full transition-all duration-200 ${
                activeNav === item.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 1. Hero / Decision Intro */}
      <section ref={heroRef} className="pt-24 pb-8 md:pt-20 md:pb-12 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Choose the Right
            <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              {' '}Filtration Technology
            </span>
            {' '}for Your Process
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
      <section ref={selectorRef} className="px-6 py-12 max-w-6xl mx-auto">
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

        {/* Micro Decision Helper */}
        <div className="mt-14 text-center">
          <h3 className="text-xl font-semibold text-slate-800">What are you filtering?</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            <button
              onClick={() => scrollToElement(processEcoRef)}
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition shadow-md flex items-center gap-2"
            >
              Oil Mist / Emulsions → ECO AIR
            </button>
            <button
              onClick={() => scrollToElement(processEariaRef)}
              className="px-5 py-2.5 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
            >
              Smoke / Fine Aerosols → EARIA
            </button>
          </div>
        </div>
      </section>

      {/* 3. Simplified Comparison */}
      <section ref={comparisonRef} className="px-6 py-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Quick Decision Overview</h3>
            <div className="divide-y divide-slate-100">
              {[
                { feature: 'Best For', eco: 'Oil mist & emulsions', earia: 'Smoke & fine aerosols' },
                { feature: 'Technology', eco: 'Mechanical + Coalescence', earia: 'Electrostatic' },
                { feature: 'Self-Cleaning', eco: <Check className="text-emerald-600" size={20} />, earia: <Check className="text-emerald-600" size={20} /> },
                { feature: 'Maintenance', eco: 'Very low', earia: 'Very low' },
                { feature: 'Max Flow', eco: '1500 m³/h', earia: '1000 m³/h' },
                { feature: 'Industry 4.0', eco: 'Premium', earia: 'Premium' },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 py-4 first:pt-0">
                  <div className="font-semibold text-slate-800">{row.feature}</div>
                  <div className="text-slate-700 flex items-center gap-1">{row.eco}</div>
                  <div className="text-slate-700 flex items-center gap-1">{row.earia}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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
              '/api/placeholder/400/300?text=Pre-Filtration+Mesh',
              '/api/placeholder/400/300?text=Coalescence+Drums',
              '/api/placeholder/400/300?text=Self-Cleaning+Nozzles',
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
              '/api/placeholder/400/300?text=Stainless+Pre-filter',
              '/api/placeholder/400/300?text=Ionization+Chamber',
              '/api/placeholder/400/300?text=Collector+Plates',
              '/api/placeholder/400/300?text=Oil+Collection',
            ]}
            refProp={processEariaRef}
          />
        </div>
      </div>

      {/* 5. Shared Benefits */}
      <section ref={benefitsRef} className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Shared Benefits
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Wind />, title: 'Cleaner Air', desc: 'Cleaner industrial workspaces and safer operations.' },
              { icon: <Settings />, title: 'Lower Maintenance', desc: 'Up to 95% reduction in maintenance.' },
              { icon: <BarChart />, title: 'Energy Savings', desc: 'Air recirculation reduces operating costs.' },
              { icon: <Recycle />, title: 'Oil Recycling', desc: 'Recover and reuse separated oil.' },
              { icon: <Cpu />, title: 'Industry 4.0 Ready', desc: 'PROFINET, PROFIBUS, Siemens HMI.' },
              { icon: <RefreshCw />, title: 'Easy Retrofit', desc: 'Compact architecture for new and existing machines.' },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                <p className="text-slate-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Variants */}
      <section ref={variantsRef} className="px-6 py-16 max-w-6xl mx-auto">
        <ProductVariants />
      </section>

      {/* 7. CTA Section */}
      <section ref={ctaRef} className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-slate-100 rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
            Not sure which filtration technology fits your application?
          </h3>
          <p className="text-slate-700 text-lg mt-4 max-w-2xl mx-auto">
            Tell us your contamination type, airflow requirements, or machine setup — we’ll recommend the right solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button className="px-6 py-3 border border-slate-300 bg-white rounded-full font-medium text-slate-800 hover:bg-slate-50 transition">
              Get expert recommendation
            </button>
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
                  ? 'bg-blue-50 border-l-4 border-blue-600 font-semibold text-blue-800'
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
          <div className="rounded-2xl overflow-hidden bg-slate-100 h-48 md:h-56 flex items-center justify-center">
            <img
              src={imagePlaceholders[activeStep]}
              alt={steps[activeStep].title}
              className="w-full h-full object-cover"
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
// Product Variants with Tabs
// ------------------------------------------------------------------
const ProductVariants = () => {
  const [activeMainTab, setActiveMainTab] = useState('eco');
  const [ecoSubTab, setEcoSubTab] = useState('1200');

  return (
    <div>
      <h3 className="text-3xl font-bold text-center mb-8">Product Variants</h3>
      <div className="flex justify-center gap-2 border-b border-slate-200 mb-8">
        {[
          { id: 'eco', label: 'ECO AIR' },
          { id: 'earia', label: 'EARIA' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMainTab(tab.id)}
            className={`px-6 py-2 text-lg font-medium transition-all ${
              activeMainTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeMainTab === 'eco' && (
          <motion.div
            key="eco"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-center gap-3 mb-8">
              {['1200', '1500'].map((size) => (
                <button
                  key={size}
                  onClick={() => setEcoSubTab(size)}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium transition ${
                    ecoSubTab === size
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {size} m³/h
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Basis', 'Advanced', 'Premium'].map((variant) => {
                const features = {
                  'Self-Cleaning': variant === 'Basis' ? '—' : '✓',
                  Automation: variant === 'Premium' ? '✓' : '—',
                  'Siemens HMI': variant === 'Premium' ? '✓' : '—',
                  'Frequency Converter': variant === 'Premium' ? '✓' : '—',
                };
                return (
                  <div key={variant} className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition">
                    <h4 className="text-xl font-bold mb-3">{variant}</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(features).map(([key, val]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-500">{key}</span>
                          <span className={val === '✓' ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <button className="text-blue-600 font-medium flex items-center gap-1 mx-auto hover:gap-2 transition">
                View Full Technical Specs <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {activeMainTab === 'earia' && (
          <motion.div
            key="earia"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {['Basis', 'Premium'].map((variant) => {
              const features =
                variant === 'Basis'
                  ? { 'Self-cleaning': '✓', 'Touch panel': '—', Automation: '—', 'PROFINET / PROFIBUS': '—' }
                  : { 'Self-cleaning': '✓', 'Touch panel': '✓', Automation: '✓', 'PROFINET / PROFIBUS': '✓' };
              return (
                <div key={variant} className="bg-white rounded-2xl border p-6 shadow-sm">
                  <h4 className="text-2xl font-bold mb-4">{variant}</h4>
                  <div className="space-y-2">
                    {Object.entries(features).map(([key, val]) => (
                      <div key={key} className="flex justify-between">
                        <span>{key}</span>
                        <span className={val === '✓' ? 'text-emerald-600' : 'text-slate-400'}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Technology;