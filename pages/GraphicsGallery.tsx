
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GRAPHICS_GALLERY_ITEMS } from '../constants';
import { useCart } from '../context/CartContext';

const GraphicsGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { language } = useCart();
  const bnClass = language === 'BN' ? 'font-bn' : '';

  return (
    <div className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-none"
          >
            Visual <br /> <span className="text-gradient">Work.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed ${bnClass}`}
          >
            Premium visual identity for brands that refuse to be ordinary. Simple, engaging, and elite creative solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {GRAPHICS_GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="group cursor-pointer bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-teal-500/30 transition-all shadow-2xl"
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/10 transition-all flex items-end p-8">
                  <div className="bg-slate-950/80 backdrop-blur-md p-6 rounded-2xl w-full border border-white/5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <span className="text-[8px] font-black text-teal-400 uppercase tracking-widest mb-1 block">{item.category}</span>
                    <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{item.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center p-20 border-t border-white/5">
           <h2 className="text-3xl font-black uppercase mb-8">Need custom visuals?</h2>
           <a href="https://wa.me/8801939888381" target="_blank" className="bg-teal-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-block hover:bg-teal-700 transition-all shadow-xl">Contact Senior Designer</a>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="max-w-5xl w-full"
            >
              <img src={selectedImage} alt="Preview" className="w-full h-auto max-h-[90vh] object-contain rounded-[2rem] shadow-[0_0_120px_rgba(45,212,191,0.2)] border border-white/10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GraphicsGallery;
