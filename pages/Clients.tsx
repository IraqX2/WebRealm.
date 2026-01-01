
import React from 'react';
import { motion } from 'framer-motion';
import { DEMO_PROJECTS, TRANSLATIONS } from '../constants';
import { useCart } from '../context/CartContext';
import ProjectSlideshow from '../components/ProjectSlideshow';

const Clients: React.FC = () => {
  const { language } = useCart();
  const t = TRANSLATIONS[language];

  return (
    <div className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic"
          >
            Client Success
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {t.successSub} We deliver custom-built technical infrastructure for high-growth brands that demand excellence.
          </motion.p>
        </div>

        <div className="grid gap-16">
          {DEMO_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center bg-slate-900/30 p-8 lg:p-12 rounded-[3.5rem] border border-white/5`}
            >
              <div className="w-full lg:w-1/2 aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group relative">
                <ProjectSlideshow images={project.images} className="transition-all duration-1000" />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">{tag}</span>
                  ))}
                </div>
                <h2 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-white">{project.title}</h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  {project.description} This asset was engineered to prioritize load speed and high-intent user conversion, ensuring a seamless digital experience across all platforms.
                </p>
                <div className="pt-6">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1"
                  >
                    View Live Site
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
