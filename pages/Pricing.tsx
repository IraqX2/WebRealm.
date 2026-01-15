
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PACKAGES, GRAPHICS_PACKAGES, MAINTENANCE_PACKAGE, TRANSLATIONS } from '../constants';
import { useCart } from '../context/CartContext';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { addPackage, setWebMaintenanceService, language, formatPrice } = useCart();
  const t = TRANSLATIONS[language];

  const handleAddPackage = (pkg: any) => {
    addPackage(pkg);
    navigate('/order');
  };

  const handleMaintenancePurchase = () => {
    setWebMaintenanceService(true);
    navigate('/order');
  };

  const FREE_HUG_PACKAGE = {
      id: 'free-hug',
      name: 'Free Hug Service',
      price: 0,
      category: 'fun',
      description: 'Brotherhood-grade emotional support. Zero charge.',
      features: [
        'Only for male clients',
        'Available in Uttara & Bashundhara',
        'Cash on Delivery',
        'One hug per human',
        'No refunds, no arguments',
      ],
    };


  const bnClass = language === 'BN' ? 'font-bn' : '';

  return (
    <div className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter uppercase">Investment Plans</h1>
          <p className={`text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed ${bnClass}`}>
            {t.pricingSub}
          </p>
        </div>

        {/* Web Packages */}
        <div className="mb-32">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center text-blue-500">Web Development Tiers</h2>
          <div className="grid lg:grid-cols-3 gap-10 items-stretch">
            {PACKAGES.map((pkg) => (
              <motion.div 
                key={pkg.id} 
                whileHover={{ y: -10 }}
                className={`p-12 rounded-[3.5rem] border ${pkg.highlighted ? 'border-blue-500/50 bg-slate-900 shadow-2xl scale-105 z-10' : 'border-white/5 bg-slate-950'} flex flex-col transition-all duration-500 relative overflow-hidden`}
              >
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-3">{pkg.name}</h3>
                <div className="text-5xl font-black text-blue-500 mb-8 tracking-tighter">{formatPrice(pkg.price)}</div>
                <p className="text-xs text-slate-500 font-bold uppercase mb-10 tracking-widest">{pkg.description}</p>
                <ul className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map(f => (
                    <li key={f} className="text-[14px] text-slate-300 flex items-start gap-3 leading-snug feature-text">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 shadow-[0_0_8px_#3b82f6]"></div> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleAddPackage(pkg)} 
                  className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${pkg.highlighted ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-slate-950 hover:bg-blue-500 hover:text-white'}`}
                >
                  Add Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Graphics Packages */}
        <div className="mb-32">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center text-teal-500">Graphics Designing Packages</h2>
          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">
            {GRAPHICS_PACKAGES.map((pkg) => (
              <motion.div 
                key={pkg.id} 
                whileHover={{ y: -10 }}
                className={`p-12 rounded-[3.5rem] border ${pkg.highlighted ? 'border-teal-500/50 bg-slate-900 shadow-2xl scale-105 z-10' : 'border-white/5 bg-slate-950'} flex flex-col transition-all duration-500 relative overflow-hidden`}
              >
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-3">{pkg.name}</h3>
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
                  className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${pkg.highlighted ? 'bg-teal-600 text-white shadow-xl' : 'bg-white text-slate-950 hover:bg-teal-500 hover:text-white'}`}
                >
                  Add Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Maintenance Service */}
        <div className="mb-32">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center text-orange-500">Web Maintenance Service</h2>
          <div className="max-w-lg mx-auto">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-12 rounded-[3.5rem] border border-orange-500/30 bg-slate-900 shadow-2xl flex flex-col transition-all duration-500 relative overflow-hidden"
            >
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-3">{MAINTENANCE_PACKAGE.name}</h3>
              <div className="text-5xl font-black text-orange-500 mb-8 tracking-tighter">
                {formatPrice(MAINTENANCE_PACKAGE.price)}
                <span className="text-xs text-slate-500 uppercase font-black ml-2 tracking-widest">/ Month</span>
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase mb-10 tracking-widest">{MAINTENANCE_PACKAGE.description}</p>
              <ul className="space-y-4 mb-12 flex-grow">
                {MAINTENANCE_PACKAGE.features.map(f => (
                  <li key={f} className="text-[14px] text-slate-300 flex items-start gap-3 leading-snug feature-text">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0 shadow-[0_0_8px_#f97316]"></div> 
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleMaintenancePurchase}
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-orange-700 transition-all hover:scale-105"
              >
                Purchase Care Package
              </button>
            </motion.div>
          </div>
        </div>

        {/* Fun Service – Free Hug */}
        <div className="mb-32">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center text-slate-300">
            Brotherhood Services
          </h2>

          <div className="max-w-lg mx-auto">
            <motion.div
              whileHover={{ y: -8 }}
              className="p-12 rounded-[3.5rem] 
                        border border-white/10 
                        bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 
                        shadow-2xl relative overflow-hidden text-center"
            >
              <div className="absolute -top-10 -right-10 text-[120px] opacity-[0.06] rotate-12">
                🤜🤛
              </div>

              <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">
                Free Hug Service
              </h3>

              <div className="text-xl font-black text-emerald-400 mb-6 tracking-wide">
                0 BDT — Cash On Delivery
              </div>

              <p className="text-sm text-slate-300 font-medium mb-6 leading-relaxed">
                  
                No therapy talk. Just a real hug between brothers.
                Hug strength varies by mood, weather, and life damage.
              </p>

              <ul className="space-y-3 mb-10 text-[14px] text-slate-300 text-left">
                <li>• Only for <b>Male</b> clients</li>
                <li>• Available in <b>Uttara & Bashundhara</b></li>
                <li>• Cash on Delivery only</li>
                <li>• One hug per human</li>
              </ul>

              <button
                onClick={() => handleAddPackage(FREE_HUG_PACKAGE)}
                className="w-full py-5 rounded-2xl 
                          font-black uppercase text-xs tracking-widest 
                          bg-emerald-600 text-white 
                          shadow-xl hover:bg-emerald-700 transition-all"
              >
                Add to Cart
              </button>

              <p className="text-xs text-slate-500 italic mt-6">
                Disclaimer: No therapy talk. No fake positivity.
              </p>
            </motion.div>
          </div>
        </div>



      </div>
    </div>
  );
};



export default Pricing;
