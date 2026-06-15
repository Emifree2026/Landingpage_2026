import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.png';
import EmiLogo from '../assets/emilogo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'ES', name: 'Espanol' },
    { code: 'FR', name: 'Francais' }
  ];

  const navItems = [
    { label: 'Applications', href: '#applications' },
    { label: 'Products', href: '#products' },
    { label: 'Knowledge', href: '#knowledge' },
    { label: 'Technology', href: '#technology' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLangSelect = (lang) => {
    setSelectedLang(lang.code);
    setIsLangOpen(false);
  };

  const trackPhoneClick = (location) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_to_call', {
        event_category: 'header_cta',
        event_label: `phone_number_${location}`,
        value: 1
      });
    }
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'click_to_call',
        cta_location: `header_${location}`
      });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Dual Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="/">
                <img src={Logo} alt="Emifree Logo" className="h-10 w-auto" />
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="/">
                <img src={EmiLogo} alt="EMI Logo" className="h-8 w-auto" />
              </a>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-1 bg-slate-100 rounded-full px-2 py-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-zinc-900 hover:text-blue-700 rounded-full transition-all duration-200 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white rounded-full opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="relative z-10">{item.label}</span>
                </motion.a>
              ))}
            </div>
          </nav>

          {/* Right Side - Phone CTA + Language Selector */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.a
              href="tel:+493076283520"
              onClick={() => trackPhoneClick('desktop')}
              className="bg-blue-700 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              +49 3076283520
            </motion.a>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <motion.button
                className="flex items-center space-x-2 bg-white border border-slate-200 rounded-full px-4 py-2 hover:bg-slate-50 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <Globe className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-zinc-700">{selectedLang}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-blue-50 transition-colors duration-200 ${
                          selectedLang === lang.code ? 'bg-blue-50 text-blue-700 font-medium' : 'text-zinc-700'
                        }`}
                        onClick={() => handleLangSelect(lang)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-900 hover:text-blue-700 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-slate-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-zinc-900 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Phone CTA */}
              <a
                href="tel:+493076283520"
                onClick={(e) => {
                  trackPhoneClick('mobile');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full bg-blue-700 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-blue-800 transition-all duration-200 mt-4 text-center"
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  +49 3076283520
                </span>
              </a>

              {/* Mobile Language Selector */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="px-4 py-2 text-sm font-medium text-zinc-500">Language</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                        selectedLang === lang.code
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-100 text-zinc-700 hover:bg-slate-200'
                      }`}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;