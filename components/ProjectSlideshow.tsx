
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectSlideshowProps {
  images: string[];
  className?: string;
}

const ProjectSlideshow: React.FC<ProjectSlideshowProps> = ({ images, className = "" }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  if (!images || images.length === 0) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.4 }
    })
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-900 ${className}`}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.5 }
          }}
          className="absolute w-full h-full object-cover pointer-events-none"
          alt="Project showcase"
        />
      </AnimatePresence>
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-950/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-90"
            onClick={(e) => { e.preventDefault(); paginate(-1); }}
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-950/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-90"
            onClick={(e) => { e.preventDefault(); paginate(1); }}
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* Indicator Pills */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button 
              key={i} 
              onClick={(e) => { e.preventDefault(); setPage([i, i > imageIndex ? 1 : -1]); }}
              className={`h-1 rounded-full transition-all duration-500 ${i === imageIndex ? 'w-8 bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Manual Swap Tag */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="text-[9px] font-black uppercase text-white bg-blue-600/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">Manual Swap</span>
      </div>
    </div>
  );
};

export default ProjectSlideshow;
