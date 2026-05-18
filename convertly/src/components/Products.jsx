import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Settings, Zap, Shield, Waves, Pause, Play } from 'lucide-react';
import fotom1 from '../assets/products/fotom1.webp';
import fotom5 from '../assets/products/fotom5.webp';
import fotom6 from '../assets/products/fotom6.webp';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState('mechanical');
  const [activeImage, setActiveImage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedSpec, setSelectedSpec] = useState(null);

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
        { icon: Waves, title: 'Low Vibration', desc: 'Optimized low vibration design' }
      ],
      specs: [
        { label: 'Airflow', value: '1,500 - 2,750', unit: 'm³/hr' },
        { label: 'Motor Power', value: '1.5 - 3.0', unit: 'kW' },
        { label: 'Filter Type', value: 'Centrifugal + HEPA', unit: 'Optional' },
        { label: 'Noise Level', value: '< 65', unit: 'dB' },
        { label: 'Weight', value: '85 - 120', unit: 'kg' },
        { label: 'Dimensions', value: '600 x 600 x 1,200', unit: 'mm' }
      ],
      applications: ['CNC Machining', 'Grinding', 'Turning', 'Milling'],
      cta: 'Request Mechanical Filtration Quote'
    },
    electrostatic: {
      name: 'Electrostatic Filtration',
      tagline: 'Coming Soon',
      shortDesc: 'Advanced electrostatic precipitation technology for ultra-fine particulate removal.',
      description: 'Our upcoming electrostatic filtration systems will use charged plates to capture microscopic particles. Ideal for applications requiring the highest air purity standards.',
      images: [],
      features: [],
      specs: [],
      applications: ['Cleanrooms', 'Pharmaceutical', 'Food Processing'],
      cta: 'Get Notified When Available'
    }
  };

  const currentProduct = products[selectedProduct];

  // Auto-play carousel effect
  useEffect(() => {
    if (!isAutoPlay || selectedProduct !== 'mechanical' || currentProduct.images.length === 0) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % currentProduct.images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, selectedProduct, currentProduct.images.length]);

  // Reset to first image when switching products
  useEffect(() => {
    setActiveImage(0);
  }, [selectedProduct]);

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
            onClick={() => setSelectedProduct('electrostatic')}
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
            <span className="bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full">Coming Soon</span>
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              {/* Image Gallery - Auto-rotating carousel */}
              <div className="space-y-4">
                {/* Main Image with Auto-rotation */}
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
                      alt={`Emifree Mechanical Filtration System - View ${activeImage + 1}`}
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
                      {isAutoPlay ? (
                        <Pause className="w-4 h-4 text-blue-700" />
                      ) : (
                        <Play className="w-4 h-4 text-blue-700" />
                      )}
                    </button>
                  </div>

                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {currentProduct.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveImage(idx);
                          setIsAutoPlay(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeImage === idx
                            ? 'bg-blue-700 w-6'
                            : 'bg-white/60 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Thumbnail Gallery - Fixed Uniform Size */}
                <div className="flex gap-4 justify-center">
                  {currentProduct.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setActiveImage(idx);
                        setIsAutoPlay(false);
                      }}
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
                  <h3 className="text-3xl font-bold text-zinc-900 mb-2">
                    {currentProduct.tagline}
                  </h3>
                  <p className="text-lg text-zinc-600">
                    {currentProduct.shortDesc}
                  </p>
                </div>

                <p className="text-zinc-600 leading-relaxed">
                  {currentProduct.description}
                </p>

                {/* Applications */}
                <div>
                  <h4 className="font-semibold text-zinc-900 mb-3">Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.applications.map((app) => (
                      <span
                        key={app}
                        className="px-4 py-2 bg-cyan-50 text-cyan-700 text-sm font-medium rounded-full"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white p-4 rounded-xl shadow-sm border border-slate-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <feature.icon className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-zinc-900 text-sm">{feature.title}</h5>
                          <p className="text-zinc-500 text-xs mt-1">{feature.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentProduct.cta}
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {selectedProduct === 'electrostatic' && (
            <motion.div
              key="electrostatic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg"
            >
              <div className="max-w-2xl mx-auto px-8">
                <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-cyan-600" />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 mb-4">
                  Electrostatic Filtration
                </h3>
                <p className="text-xl text-zinc-600 mb-6">
                  Advanced electrostatic precipitation technology for ultra-fine particulate removal.
                </p>
                <p className="text-zinc-500 mb-8">
                  Our engineering team is developing next-generation electrostatic filtration systems for applications requiring the highest air purity standards.
                </p>
                <motion.button
                  className="bg-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Notified When Available
                </motion.button>
              </div>
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
    </section>
  );
};

export default Products;