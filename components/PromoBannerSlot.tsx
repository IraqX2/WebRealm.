
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface PromoBannerSlotProps {
  title?: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  link?: string;
  className?: string;
  bullets?: string[];
}

const PromoBannerSlot: React.FC<PromoBannerSlotProps> = ({
  title,
  subtitle,
  image,
  buttonText,
  link = "/order",
  className = "",
  bullets
}) => {
  const { language } = useCart();
  const bnClass = language === 'BN' ? 'font-bn' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative w-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-900 group ${className}`}
    >
      {/* Visual background */}
      {image ? (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title || "Promo"} 
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-teal-900/10"></div>
          {/* Collage Mode: Floating tiles */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -right-20 w-64 h-40 bg-slate-800 border border-white/10 rounded-2xl rotate-12" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 -left-20 w-80 h-48 bg-slate-800 border border-white/10 rounded-2xl -rotate-6" 
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full flex gap-4 rotate-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 bg-white/5 h-full rounded-full blur-2xl" />
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 p-12 lg:p-20 flex flex-col items-center text-center">
        {title && (
          <h3 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className={`text-slate-400 max-w-2xl mb-8 font-medium leading-relaxed ${bnClass}`}>
            {subtitle}
          </p>
        )}
        
        {bullets && (
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></div>
                <span className={`text-[10px] font-black uppercase tracking-widest text-slate-300 ${bnClass}`}>{bullet}</span>
              </div>
            ))}
          </div>
        )}

        {buttonText && (
          <Link
            to={link}
            className="relative bg-white text-slate-950 px-12 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl flex items-center group/btn overflow-hidden"
          >
            <span className="relative z-10">{buttonText}</span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
          </Link>
        )}
      </div>
      
      {/* Dev tag */}
      <div className="absolute top-6 right-8 text-[8px] font-black uppercase tracking-widest text-white/5 select-none">
        WebRealm Precision Protocol
      </div>
    </motion.div>
  );
};

export default PromoBannerSlot;
