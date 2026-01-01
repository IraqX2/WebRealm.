
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '../constants';
import PromoBannerSlot from '../components/PromoBannerSlot';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', 'Business', 'Portfolio', 'E-commerce', 'Landing Page'];

  const filteredItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const fallbackImage = "https://res.cloudinary.com/dx9efyuos/image/upload/v1767185931/Screenshot_2025-12-31_185410_vgx4s1.png";

  return (
    <div className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <h1 className="text-6xl lg:text-9xl font-black text-white mb-8 tracking-tighter uppercase italic">The Archive</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">Precision custom builds for high-value brands. No templates. No compromise.</p>
        </div>

        {/* Categories (WIX-LIKE TABS) */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                filter === cat 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'bg-transparent border-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5"
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-slate-950">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-all duration-700" 
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                  />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all flex items-center justify-center">
                    <div className="bg-white text-slate-950 px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">Expand Vision</div>
                  </div>
                </div>
                <div className="p-10">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-3 block">{item.category}</span>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">{item.title}</h3>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="max-w-7xl w-full"
            >
              <img src={selectedImage} alt="Preview" className="w-full h-auto max-h-[80vh] object-contain rounded-[3rem] shadow-[0_0_120px_rgba(37,99,235,0.3)] border border-white/10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
