
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { selectedPackage, language, setLanguage } = useCart();
  const t = TRANSLATIONS[language];

  const languages: { code: LanguageCode; name: string }[] = [
    { code: 'EN', name: 'English' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'ZH', name: '中文' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'AR', name: 'العربية' }
  ];

  const navLinks = [
    { name: t.nav?.home || 'Home', path: '/' },
    { name: t.nav?.work || 'Web', path: '/clients' },
    { name: t.nav?.graphics || 'Graphics', path: '/graphics-showcase' },
    { name: t.nav?.pricing || 'Pricing', path: '/pricing' },
    { name: t.nav?.order || 'Order Now', path: '/order' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-white tracking-tight transition-colors group-hover:text-blue-400">WebRealm</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {/* Language Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-black uppercase text-slate-300 hover:border-blue-500/50 hover:text-blue-400 transition-all"
              >
                <span>{languages.find(l => l.code === language)?.name}</span>
                <svg className={`w-3 h-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 right-0 w-32 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl py-1"
                  >
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${language === lang.code ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                  location.pathname === link.path 
                  ? 'text-blue-400' 
                  : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/order"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 hover:scale-105 transition-all shadow-xl flex items-center"
            >
              {t.nav?.btn || 'Get a Website'}
              {selectedPackage && (
                <span className="ml-2 w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse"></span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 p-2 outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6 text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                    className={`px-3 py-1 rounded text-[10px] font-black uppercase ${language === lang.code ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'}`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-xl font-bold uppercase tracking-tighter ${location.pathname === link.path ? 'text-blue-400' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/order"
                onClick={() => setIsOpen(false)}
                className="block bg-blue-600 text-white text-center py-4 rounded-xl font-black uppercase tracking-widest mx-auto max-w-xs"
              >
                {t.nav?.btn || 'Get Website'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
