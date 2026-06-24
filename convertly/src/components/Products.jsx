import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InquiryFormModal from './InquiryFormModal';
import {
  ChevronRight, Settings, Zap, Shield, Droplets, Pause, Play,
  Cpu, Wrench, Wifi, Box, X, Send, CheckCircle, AlertCircle,
  Building2, User, Phone, MapPin, Briefcase, Layers,
  Gauge, Hash, MessageSquare, Calendar
} from 'lucide-react';
import fotom1 from '../assets/products/fotom1.webp';
import fotom5 from '../assets/products/fotom5.webp';
import fotom6 from '../assets/products/fotom6.webp';
import fotoe1 from '../assets/products/fotoe1.webp';
import fotoe2 from '../assets/products/fotoe2.webp';
import fotoe3 from '../assets/products/fotoe3.webp';
import dust1 from '../assets/products/dust1.webp'; // ← new import

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCTS SECTION
───────────────────────────────────────────────────────────────────────────── */
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState('mechanical');
  const [activeImage, setActiveImage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedSpec, setSelectedSpec] = useState(null);

  // ── Inquiry modal state ──────────────────────────────────────────────────────
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryProductType, setInquiryProductType] = useState(null);

  const openInquiry = (type) => {
    setInquiryProductType(type);
    setIsInquiryOpen(true);
  };
  const closeInquiry = () => setIsInquiryOpen(false);

  const products = {
    mechanical: {
      name: 'Mechanical Filtration',
      tagline: 'Industrial-Strength Oil Mist & Dust Extraction',
      shortDesc: 'Centrifugal separation technology for heavy-duty CNC machining environments. Reliable performance, minimal maintenance.',
      description: 'Our mechanical filtration systems use centrifugal force to separate oil mist and coolant fumes directly at the source. Designed for CNC lathes, mills, grinding machines, and industrial workshops where continuous production is critical.',
      images: [fotom1, fotom5, fotom6],
      features: [
        { icon: Settings, title: 'Heavy-Duty Construction', desc: 'Industrial-grade sheet metal housing with powder-coated finish for durability in harsh workshop environments' },
        { icon: Zap, title: 'High Airflow Capacity', desc: 'Up to 2,750 m³/hr airflow to handle multiple machining operations simultaneously' },
        { icon: Shield, title: 'HEPA Filter Option', desc: 'Optional HEPA post-filter achieves 99.95% particle removal for cleanroom applications' },
        { icon: Droplets, title: 'Self-Cleaning', desc: 'The built-in spray nozzles allow the collection system to be cleaned without removing the module' }
      ],
      specs: [
        { label: 'Airflow', value: '1,500 - 2,750', unit: 'm³/hr' },
        { label: 'Motor Power', value: '1.5 - 3.0', unit: 'kW' },
        { label: 'Filter Type', value: 'Centrifugal + HEPA', unit: 'Optional' },
        { label: 'Noise Level', value: '< 65', unit: 'dB' },
        { label: 'Weight', value: '85 - 120', unit: 'kg' },
        { label: 'Dimensions', value: '600 x 600 x 1,200', unit: 'mm' }
      ],
      applications: ['CNC Machining', 'Grinding', 'Turning', 'Milling', 'Spark Eroding'],
      cta: 'Request Mechanical Filtration Quote'
    },
    electrostatic: {
      name: 'Electrostatic Filtration',
      tagline: 'Advanced Corona Discharge Technology',
      shortDesc: 'Superior separation for fine particles, smoke, sub-micron oil mist, and industrial odors where mechanical filters reach their limits.',
      description: 'Advanced corona discharge technology for fine particle separation. Ideal for smoke, sub-micron oil mist, and industrial odor control. Electrostatic filtration ionizes and captures particles on collector plates with high separation efficiency where conventional filters struggle.',
      images: [fotoe1, fotoe2, fotoe3],
      features: [
        { icon: Cpu, title: 'Electrostatic Technology', desc: 'Ionizes and captures sub-micron particles (including smoke) on collector plates. Achieves high separation efficiency where conventional filters struggle.' },
        { icon: Wrench, title: 'Low Maintenance Operation', desc: 'Robust ionizer design with optional self-cleaning system. Reduces manual cleaning cycles and extends service life.' },
        { icon: Wifi, title: 'Industry 4.0 Ready', desc: 'Premium version includes Siemens Touch-Panel, PROFINET/PROFIBUS connectivity, and real-time parameter monitoring for smart factory integration.' },
        { icon: Box, title: 'Compact & Flexible', desc: '818 × 466 × 566 mm footprint. Easy to retrofit. Optional Service Trolley allows on-site cleaning without module removal.' }
      ],
      specs: [
        { label: 'Dimensions', value: '818 × 466 × 566', unit: 'mm' },
        { label: 'Technology', value: 'Corona Discharge', unit: 'Ionization' },
        { label: 'Particle Capture', value: 'Sub-micron', unit: 'Including smoke' },
        { label: 'Connectivity', value: 'PROFINET/PROFIBUS', unit: 'Optional' },
        { label: 'Control Panel', value: 'Siemens Touch', unit: 'Premium' },
        { label: 'Service', value: 'Self-cleaning', unit: 'Optional' }
      ],
      applications: ['Machining with high-speed tools', 'Smoke from cutting fluids', 'Industrial soldering & welding', 'Chemical & pharmaceutical processes'],
      cta: 'Request Electrostatic Filtration Quote'
    },
    // ─── NEW: Dust Filtration ──────────────────────────────────────────────────
    dust: {
      name: 'Dust Filtration',
      tagline: 'High-Efficiency Dust Collection for Dry Processes',
      shortDesc: 'Reliable cartridge and baghouse solutions for heavy dust loads from woodworking, metal grinding, and bulk material handling.',
      description: 'Our dust filtration systems are engineered for dry dust applications. Using advanced media technology and pulse-jet cleaning, they deliver consistent airflow and long filter life – even in the most demanding industrial settings.',
      images: [dust1, dust1, dust1], // Using the same image for all three views
      features: [
        { icon: Box, title: 'Modular Design', desc: 'Scalable cartridge and baghouse configurations to match your airflow and space requirements.' },
        { icon: Gauge, title: 'Pulse-Jet Cleaning', desc: 'Automatic compressed-air cleaning maintains low pressure drop and extends filter life.' },
        { icon: Shield, title: 'Explosion Protection', desc: 'Optional ATEX-certified components for safe operation in combustible dust environments.' },
        { icon: Layers, title: 'Multiple Filtration Media', desc: 'Choose from cellulose, polyester, or PTFE membranes for optimal efficiency with your specific dust type.' }
      ],
      specs: [
        { label: 'Airflow', value: '2,000 - 10,000', unit: 'm³/hr' },
        { label: 'Filter Area', value: '20 - 200', unit: 'm²' },
        { label: 'Cleaning Method', value: 'Pulse-jet', unit: 'Automated' },
        { label: 'Dust Load', value: 'Up to 100', unit: 'g/m³' },
        { label: 'Efficiency', value: '> 99.9', unit: '%' },
        { label: 'Operating Temp', value: '-20 to +80', unit: '°C' }
      ],
      applications: ['Woodworking', 'Metal Grinding', 'Minerals Processing', 'Food & Grain', 'Pharmaceuticals'],
      cta: 'Request Dust Filtration Quote'
    }
  };

  const currentProduct = products[selectedProduct];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || currentProduct.images.length === 0) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % currentProduct.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, currentProduct.images.length]);

  // Reset image when switching tabs
  useEffect(() => {
    setActiveImage(0);
  }, [selectedProduct]);

  // ── Shared product content layout ───────────────────────────────────────────
  const renderProductContent = (productKey) => {
    const altPrefix = productKey === 'mechanical'
      ? 'Emifree Mechanical Filtration System'
      : productKey === 'electrostatic'
      ? 'Emifree Electrostatic Filtration System'
      : 'Emifree Dust Filtration System';

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            className="relative bg-white rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={currentProduct.images[activeImage]}
                alt={`${altPrefix} - View ${activeImage + 1}`}
                className="w-full h-full object-contain p-6"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                style={{ objectFit: 'contain' }}
              />
            </AnimatePresence>

            {/* Auto-play Controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200"
                title={isAutoPlay ? 'Pause' : 'Play'}
              >
                {isAutoPlay
                  ? <Pause className="w-4 h-4 text-blue-700" />
                  : <Play className="w-4 h-4 text-blue-700" />}
              </button>
            </div>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {currentProduct.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveImage(idx); setIsAutoPlay(false); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeImage === idx ? 'bg-blue-700 w-6' : 'bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-4 justify-center">
            {currentProduct.images.map((img, idx) => (
              <motion.button
                key={idx}
                onClick={() => { setActiveImage(idx); setIsAutoPlay(false); }}
                className={`relative rounded-xl overflow-hidden shadow-md transition-all duration-300 flex-shrink-0 ${
                  activeImage === idx
                    ? 'ring-2 ring-blue-700 ring-offset-2 scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-28 h-28 bg-white p-2">
                  <img
                    src={img}
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold text-zinc-900 mb-2">{currentProduct.tagline}</h3>
            <p className="text-lg text-zinc-600">{currentProduct.shortDesc}</p>
          </div>

          <p className="text-zinc-600 leading-relaxed">{currentProduct.description}</p>

          {/* Applications */}
          <div>
            <h4 className="font-semibold text-zinc-900 mb-3">Applications:</h4>
            <div className="flex flex-wrap gap-2">
              {currentProduct.applications.map((app) => (
                <span key={app} className="px-4 py-2 bg-cyan-50 text-cyan-700 text-sm font-medium rounded-full">
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProduct.features.map((feature, idx) => {
              // Determine if this is the Self‑Cleaning card (only for mechanical)
              const isSelfCleaning = feature.title === 'Self-Cleaning';

              return (
                <motion.div
                  key={idx}
                  className={`
                    bg-white p-4 rounded-xl shadow-sm border border-slate-100
                    ${isSelfCleaning ? 'shadow-blue-200/50 ring-1 ring-blue-300/40' : ''}
                  `}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <feature.icon className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h5 className={`
                        font-semibold text-zinc-900 text-sm
                        ${isSelfCleaning ? 'text-blue-800' : ''}
                      `}>
                        {feature.title}
                      </h5>
                      <p className={`
                        text-zinc-500 text-xs mt-1
                        ${isSelfCleaning ? 'text-blue-700' : ''}
                      `}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button — opens the inquiry modal for this product type */}
          <motion.button
            onClick={() => openInquiry(productKey)}
            className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentProduct.cta}
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            Industrial Air Filtration
            <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent"> Product Range</span>
          </h2>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Professional-grade filtration systems designed for CNC workshops, metalworking shops, and industrial manufacturing environments.
          </p>
        </motion.div>

        {/* Product Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            onClick={() => { setSelectedProduct('mechanical'); setActiveImage(0); }}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedProduct === 'mechanical'
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-white text-zinc-600 hover:bg-slate-100 hover:text-blue-700 border border-slate-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5" />
            Mechanical Filtration
          </motion.button>
          <motion.button
            onClick={() => { setSelectedProduct('electrostatic'); setActiveImage(0); }}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedProduct === 'electrostatic'
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-white text-zinc-600 hover:bg-slate-100 hover:text-blue-700 border border-slate-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5" />
            Electrostatic Filtration
          </motion.button>
          {/* ─── NEW TAB: Dust Filtration ─────────────────────────────────────── */}
          <motion.button
            onClick={() => { setSelectedProduct('dust'); setActiveImage(0); }}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedProduct === 'dust'
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-white text-zinc-600 hover:bg-slate-100 hover:text-blue-700 border border-slate-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Layers className="w-5 h-5" />
            Dust Filtration
          </motion.button>
        </motion.div>

        {/* Product Content */}
        <AnimatePresence mode="wait">
          {selectedProduct === 'mechanical' && (
            <motion.div
              key="mechanical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderProductContent('mechanical')}
            </motion.div>
          )}
          {selectedProduct === 'electrostatic' && (
            <motion.div
              key="electrostatic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderProductContent('electrostatic')}
            </motion.div>
          )}
          {selectedProduct === 'dust' && (
            <motion.div
              key="dust"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderProductContent('dust')}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical Specs Modal */}
        <AnimatePresence>
          {selectedSpec !== null && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpec(null)}
            >
              <motion.div
                className="bg-white rounded-2xl max-w-lg w-full p-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-zinc-900 mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  {currentProduct.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-zinc-600">{spec.label}</span>
                      <span className="font-semibold text-zinc-900">
                        {spec.value} <span className="text-cyan-600">{spec.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedSpec(null)}
                  className="w-full mt-6 bg-slate-100 text-zinc-700 py-3 rounded-full font-medium hover:bg-slate-200 transition-colors duration-200"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inquiry Form Modal — rendered outside the container div so it overlays everything */}
      <InquiryFormModal
        isOpen={isInquiryOpen}
        onClose={closeInquiry}
        productType={inquiryProductType}
      />
    </section>
  );
};

export default Products;