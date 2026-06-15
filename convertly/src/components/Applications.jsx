import React from 'react';
import { motion } from 'framer-motion';
import { Cog, Flame, Sparkles, Factory, Wrench, Car } from 'lucide-react';

const Applications = () => {
  const applications = [
    {
      icon: Cog,
      title: 'CNC Machining & Tool Shops',
      description: 'Remove oil mist and coolant fumes from CNC lathes, mills, and routers without stopping production. Keep your machines clean and operators healthy.',
      color: 'from-blue-700 to-blue-900',
      question: 'How do I remove oil mist from my CNC machine without stopping production?'
    },
    {
      icon: Flame,
      title: 'Metalworking & Welding',
      description: 'Capture welding fumes, metal dust, and grinding particles at the source. Protect your workforce from harmful particulates and meet EU safety standards.',
      color: 'from-cyan-600 to-cyan-800',
      question: 'What is the best way to filter welding fumes in a small workshop?'
    },
    {
      icon: Sparkles,
      title: 'Grinding & Polishing',
      description: 'Extract abrasive dust from surface grinding, cylindrical grinding, and polishing operations. Extend equipment lifespan and improve surface finish quality.',
      color: 'from-slate-600 to-slate-800',
      question: 'How to control dust from surface grinding machines?'
    },
    {
      icon: Wrench,
      title: 'Bearing & Precision Parts Manufacturing',
      description: 'Maintain clean air in bearing production, gear manufacturing, and precision engineering. Protect sensitive components from contamination.',
      color: 'from-blue-600 to-cyan-700',
      question: 'Best air filtration for bearing manufacturing clean rooms'
    },
    {
      icon: Factory,
      title: 'Heavy Industry & Metal Fabrication',
      description: 'Handle high-volume dust and mist generation in fabrication shops, press rooms, and assembly lines. Industrial-grade filtration for demanding environments.',
      color: 'from-slate-700 to-zinc-800',
      question: 'Industrial dust extraction system for metal fabrication shop'
    },
    {
      icon: Car,
      title: 'Automotive',
      description: 'Capture oil mist, coolant aerosol, and welding fumes from automotive production lines. Keep paint booths particle-free and EV battery assembly clean room compliant.',
      color: 'from-cyan-700 to-cyan-600',
      question: 'Best air filtration system for automotive manufacturing plant oil mist and welding fume extraction'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="applications" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            Industrial Air Filtration for
            <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent"> Every Application</span>
          </h2>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            From small tool shops to large manufacturing facilities — Emifree systems capture oil mist, welding fumes, and dust at the source.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-slate-200"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <app.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-zinc-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                  {app.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed mb-4">
                  {app.description}
                </p>

                {/* SEO Question - displayed subtly */}
                <p className="text-sm text-zinc-400 italic">
                  "{app.question}"
                </p>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            onClick={() => {
              const techSection = document.getElementById('technology');
              if (techSection) {
                techSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Your Solution
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Applications;