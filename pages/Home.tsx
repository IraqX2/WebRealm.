
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { PACKAGES, GRAPHICS_PACKAGES, DEMO_PROJECTS, TRANSLATIONS } from '../constants';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addPackage, language, formatPrice } = useCart();
  const t = TRANSLATIONS[language];
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);

  const handleAddPackage = (pkg: any) => {
    addPackage(pkg);
    navigate('/order');
  };

  const bnClass = language === 'BN' ? 'font-bn' : '';

  return (
    <div className="bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-20">
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
          <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] w-[40vw] aspect-square bg-blue-600/10 blur-[130px] rounded-full"></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Official Web Building Studio
              </span>
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] mb-8 tracking-tighter uppercase italic">
                Get Your <br />
                <span className="text-gradient">Custom</span> <br />
                <span className="text-white">Website.</span>
              </h1>
              <p className={`text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl font-medium ${bnClass}`}>
                {t.heroSub}
              </p>
              <div className="flex flex-wrap gap-5">
                <Link 
                  to="/pricing"
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center"
                >
                  View Packages
                </Link>
                <Link to="/clients" className="border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center">Our Work</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-slate-900/50 p-6 rounded-[3rem] border border-white/5 backdrop-blur-sm shadow-3xl overflow-hidden group">
                <img src="https://res.cloudinary.com/dx9efyuos/image/upload/v1767189846/Are_you_looking_for_a_2_xckfd0.png" className="rounded-2xl w-full h-auto transition-all duration-1000" alt="Professional Web Design" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WEB PACKAGES */}
      <section id="pricing" className="py-24 bg-slate-900/20 border-y border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase italic mb-6">Choose Your Packages</h2>
            <p className={`text-slate-500 uppercase tracking-widest text-xs font-bold max-w-2xl mx-auto ${bnClass}`}>{t.pricingSub}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pkg) => (
              <motion.div 
                key={pkg.id} 
                whileHover={{ y: -10 }}
                className={`p-10 rounded-[3rem] border ${pkg.highlighted ? 'border-blue-500/40 bg-slate-900/80 shadow-[0_0_50px_rgba(37,99,235,0.1)] scale-105 z-10' : 'border-white/5 bg-slate-950'} flex flex-col transition-all duration-500 relative overflow-hidden group`}
              >
                {pkg.highlighted && (
                   <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black uppercase px-6 py-2 rounded-bl-2xl tracking-widest">Most Popular</div>
                )}
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-black text-blue-500 mb-6 tracking-tighter">
                  {formatPrice(pkg.price)}
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-8 tracking-widest h-8">{pkg.description}</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map(f => (
                    <li key={f} className="text-sm text-slate-300 flex items-start gap-3 feature-text">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 shadow-[0_0_8px_#3b82f6]"></div> 
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleAddPackage(pkg)} 
                  className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${pkg.highlighted ? 'bg-blue-600 text-white shadow-xl' : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-slate-950'}`}
                >
                  Add Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 GRAPHICS PACKAGES SECTION */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase italic mb-6 text-teal-500">Graphics Designing</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold max-w-2xl mx-auto">Elite visual solutions for your social presence.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">
            {GRAPHICS_PACKAGES.map((pkg) => (
              <motion.div 
                key={pkg.id} 
                whileHover={{ y: -10 }}
                className={`p-12 rounded-[3.5rem] border ${pkg.highlighted ? 'border-teal-500/50 bg-slate-900 shadow-2xl scale-105 z-10' : 'border-white/5 bg-slate-950'} flex flex-col transition-all duration-500 relative overflow-hidden`}
              >
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-3">{pkg.name}</h3>
                <div className="text-5xl font-black text-teal-500 mb-8 tracking-tighter">{formatPrice(pkg.price)}</div>
                <p className="text-xs text-slate-500 font-bold uppercase mb-10 tracking-widest">{pkg.description}</p>
                <ul className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map(f => (
                    <li key={f} className="text-[14px] text-slate-300 flex items-start gap-3 leading-snug feature-text">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0 shadow-[0_0_8px_#2dd4bf]"></div> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleAddPackage(pkg)} 
                  className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${pkg.highlighted ? 'bg-teal-600 text-white shadow-xl' : 'bg-white/5 text-white border border-white/10 hover:bg-teal-500 hover:text-white'}`}
                >
                  Add Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CLIENT SUCCESS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase italic leading-none mb-4">Our Best Work</h2>
              <p className={`text-slate-400 text-base font-medium leading-relaxed ${bnClass}`}>{t.successSub}</p>
            </div>
            <Link to="/clients" className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">View All Examples</Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {DEMO_PROJECTS.slice(0, 4).map((project) => (
              <motion.a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -8 }}
                key={project.id} 
                className="group relative bg-slate-900/40 p-4 rounded-[2.5rem] border border-white/5 transition-all overflow-hidden"
              >
                <div className="aspect-video overflow-hidden rounded-[1.8rem] border border-white/5">
                  <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-all duration-700" />
                </div>
                <div className="p-6">
                   <div className="flex justify-between items-center mb-2">
                     <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{project.title}</h3>
                     <svg className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                   </div>
                   <p className="text-slate-500 text-xs leading-relaxed mb-4">{project.description}</p>
                   <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-slate-400 border border-white/5 px-3 py-1 rounded-full">{tag}</span>
                      ))}
                   </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIMPLE PROCESS */}
      <section className="py-24 bg-slate-900/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase italic mb-4">How it works</h2>
            <p className={`text-slate-500 uppercase tracking-[0.2em] text-[10px] font-bold ${bnClass}`}>{t.orderPathSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Pick Package", desc: t.step1 },
              { num: "02", title: "Tell us Details", desc: t.step2 },
              { num: "03", title: "Easy Payment", desc: t.step3 },
              { num: "04", title: "Go Live", desc: t.step4 }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-950 border border-white/5 rounded-[2rem] hover:border-blue-500/20 transition-all">
                <div className="text-xl font-black text-blue-600 mb-4 italic">{step.num}</div>
                <h3 className="text-lg font-black uppercase italic mb-3 tracking-tighter">{step.title}</h3>
                <p className={`text-[12px] text-slate-500 font-medium leading-relaxed ${bnClass}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[160px] -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="text-5xl lg:text-8xl font-black tracking-tighter italic uppercase leading-none mb-10">BUILD YOUR <br /> <span className="text-gradient">FUTURE.</span></h2>
          <Link to="/order" className="bg-blue-600 text-white px-16 py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all inline-block hover:-translate-y-2">Order Your Site</Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
