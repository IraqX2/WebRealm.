
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Order: React.FC = () => {
  const navigate = useNavigate();
  const { 
    selectedPackages, 
    webMaintenanceService, 
    setWebMaintenanceService,
    calculateTotal,
    resetCart,
    removePackage,
    formatPrice
  } = useCart();

  const [submitted, setSubmitted] = useState(false);
  const [existingWebsite, setExistingWebsite] = useState('');
  const [hasPersonalDomain, setHasPersonalDomain] = useState(false);
  const [personalDomainName, setPersonalDomainName] = useState('');
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    business: '',
    details: ''
  });

  const isEmpty = selectedPackages.length === 0 && !webMaintenanceService;
  const hasWebPackages = selectedPackages.some(pkg => pkg.category === 'web');
  
  const paymentDetails = {
    wallet: "01939888381",
    islami: "20502166700004517",
    sonali: "0126301008929",
    mtb: "1311003292183"
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setCopyStatus(prev => ({ ...prev, [id]: false })), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email && !formData.phone) {
      alert("Please provide either an Email address or a Phone number so we can contact you.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-40 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 p-16 rounded-[4rem] border border-blue-500/20 shadow-3xl">
          <div className="w-24 h-24 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-10">✓</div>
          <h1 className="text-5xl font-black mb-8 uppercase italic tracking-tighter text-white">Order Received!</h1>
          <p className="text-slate-400 mb-12 font-medium leading-relaxed max-w-lg mx-auto">We got your details. Our team will contact you via WhatsApp or Email within 24 hours to finalize the requirements.</p>
          <button onClick={() => { resetCart(); setSubmitted(false); }} className="bg-blue-600 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-white">Return to Shop</button>
        </motion.div>
      </div>
    );
  }

  const allServiceNames = [
    ...selectedPackages.map(p => p.name),
    webMaintenanceService ? 'Web Maintenance Service' : null
  ].filter(Boolean).join(', ');

  return (
    <div className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">Checkout Order</h1>
          {!isEmpty && (
            <button 
              onClick={() => navigate('/pricing')}
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
            >
              ADD MORE PACKAGE
            </button>
          )}
        </div>
        
        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            {isEmpty ? (
              <div className="bg-slate-900 p-20 rounded-[3rem] text-center border border-white/5 shadow-2xl">
                <p className="text-slate-500 mb-12 font-black uppercase tracking-widest">Your order list is empty.</p>
                <Link to="/pricing" className="bg-blue-600 px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl inline-block transition-all hover:scale-105 text-white">Browse Services</Link>
              </div>
            ) : (
              <form name="webrealm-order" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="form-name" value="webrealm-order" />
                <input type="hidden" name="services" value={allServiceNames} />
                <input type="hidden" name="total-price" value={calculateTotal()} />
                <input type="hidden" name="personal-domain" value={hasPersonalDomain ? personalDomainName : 'Using WebRealm Shared Hosting'} />

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                    <input 
                      required 
                      name="full-name" 
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all" 
                      placeholder="Enter Full Name" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Business Name</label>
                    <input 
                      required 
                      name="business" 
                      type="text" 
                      value={formData.business}
                      onChange={(e) => setFormData({...formData, business: e.target.value})}
                      className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all" 
                      placeholder="Brand Name" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                    <input 
                      name="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all invalid:border-yellow-500/50" 
                      placeholder="email@example.com" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone / WhatsApp Number</label>
                    <input 
                      name="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all" 
                      placeholder="+880..." 
                    />
                  </div>
                </div>

                {webMaintenanceService && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 ml-4">Target Website for Maintenance</label>
                    <input name="target-site" value={existingWebsite} onChange={(e) => setExistingWebsite(e.target.value)} type="url" className="w-full bg-slate-900 border border-orange-500/40 px-8 py-6 rounded-2xl text-white outline-none focus:border-orange-500 transition-all" placeholder="Website (if you already have one)" />
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Project Brief & Details</label>
                  <textarea 
                    required 
                    name="details" 
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    rows={4} 
                    className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all" 
                    placeholder="Tell us about your brand and what you expect..."
                  ></textarea>
                </div>

                {/* DOMAIN SECTION */}
                {hasWebPackages && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-slate-900 rounded-[2.5rem] border border-white/5 space-y-6 shadow-xl">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div onClick={() => setHasPersonalDomain(!hasPersonalDomain)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${hasPersonalDomain ? 'bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'border-white/10 bg-white/5 group-hover:border-white/30'}`}>
                        {hasPersonalDomain && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-sm font-black uppercase italic tracking-tighter text-white select-none">Do you have your personal domain?</span>
                    </label>
                    <AnimatePresence mode="wait">
                      {hasPersonalDomain ? (
                        <motion.div key="domain-input" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <input required={hasPersonalDomain} type="text" value={personalDomainName} onChange={(e) => setPersonalDomainName(e.target.value)} className="w-full bg-slate-950 border border-blue-500/20 px-8 py-5 rounded-2xl text-white outline-none focus:border-blue-500 transition-all" placeholder="e.g. www.yourbrand.com" />
                        </motion.div>
                      ) : (
                        <motion.div key="no-domain-msg" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <p className="text-[11px] text-slate-500 font-medium italic p-4 bg-slate-950 rounded-2xl border border-white/5">Note: Without a domain, we use a shared sub-link (yourname.webrealm.app). Custom domains are recommended for better branding.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* COMPACT PAYMENT SECTION */}
                <div className="bg-slate-900 border border-white/5 p-6 md:p-8 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter text-blue-500 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                      Payment Instructions
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Bkash/Nagad */}
                    <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 group transition-all hover:border-blue-500/20">
                      <p className="text-[10px] font-black uppercase tracking-widest mb-2">
                        <span className="text-[#D12053]">Bkash</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="text-[#F7941D]">Nagad</span>
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xl font-black text-white tracking-tighter">{paymentDetails.wallet}</span>
                        <button type="button" onClick={() => handleCopy(paymentDetails.wallet, 'wallet')} className={`shrink-0 px-4 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${copyStatus['wallet'] ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                          {copyStatus['wallet'] ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Bank 1: Islami */}
                    <div className="bg-slate-950/50 p-5 rounded-2xl border border-emerald-500/10 transition-all hover:border-emerald-500/30">
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Islami Bank</p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-300 truncate pr-2">{paymentDetails.islami}</span>
                        <button type="button" onClick={() => handleCopy(paymentDetails.islami, 'islami')} className={`shrink-0 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${copyStatus['islami'] ? 'bg-green-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                          {copyStatus['islami'] ? '✓' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Bank 2: Sonali */}
                    <div className="bg-slate-950/50 p-5 rounded-2xl border border-yellow-500/10 transition-all hover:border-yellow-500/30">
                      <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2">Sonali Bank</p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-300 truncate pr-2">{paymentDetails.sonali}</span>
                        <button type="button" onClick={() => handleCopy(paymentDetails.sonali, 'sonali')} className={`shrink-0 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${copyStatus['sonali'] ? 'bg-green-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                          {copyStatus['sonali'] ? '✓' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Bank 3: MTB (Same as others) */}
                    <div className="bg-slate-950/50 p-5 rounded-2xl border border-red-500/10 transition-all hover:border-red-500/30">
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">MTB Bank</p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-300 truncate pr-2">{paymentDetails.mtb}</span>
                        <button type="button" onClick={() => handleCopy(paymentDetails.mtb, 'mtb')} className={`shrink-0 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${copyStatus['mtb'] ? 'bg-green-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                          {copyStatus['mtb'] ? '✓' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed max-w-sm mx-auto">
                      International clients will be contacted through email for payment methods.
                    </p>
                  </div>
                </div>

                {/* IN-FORM SUMMARY */}
                <div className="bg-slate-900 border border-blue-500/10 p-8 rounded-[3rem] shadow-xl space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Order Summary</h3>
                    <div className="bg-blue-600/10 px-3 py-1 rounded-full text-[9px] font-black uppercase text-blue-400">Items: {selectedPackages.length + (webMaintenanceService ? 1 : 0)}</div>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedPackages.map(pkg => (
                      <div key={pkg.id} className="flex justify-between items-center text-sm">
                        <span className="text-slate-300 font-bold">{pkg.name}</span>
                        <span className="text-white font-black">{formatPrice(pkg.price)}</span>
                      </div>
                    ))}
                    {webMaintenanceService && (
                      <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
                        <span className="text-orange-400 font-bold italic">Care Package (Maintenance)</span>
                        <span className="text-white font-black">{formatPrice(500)}</span>
                      </div>
                    )}
                    <div className="pt-6 border-t border-white/20 flex justify-between items-end">
                      <span className="text-xl font-black uppercase italic text-white tracking-tighter">Total Investment</span>
                      <span className="text-4xl font-black text-blue-500 tracking-tighter">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="w-[70%] bg-blue-600 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95">
                    Confirm & Start Project
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* SIDEBAR SUMMARY (Desktop Only) */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 sticky top-28 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Review</h2>
                <button onClick={resetCart} className="text-[8px] font-black uppercase text-red-500 border border-red-500/20 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-colors">Clear</button>
              </div>
              
              <div className="space-y-6">
                <AnimatePresence>
                  {selectedPackages.map(pkg => (
                    <motion.div key={pkg.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex justify-between items-start group">
                      <div className="flex-grow">
                        <p className="font-black text-white uppercase text-sm tracking-tight">{pkg.name}</p>
                        <p className="text-[8px] text-slate-500 uppercase mt-1">{pkg.category} Service</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-white text-lg">{formatPrice(pkg.price)}</p>
                        <button onClick={() => removePackage(pkg.id)} className="text-[8px] font-black text-red-500 uppercase mt-1 opacity-0 group-hover:opacity-100 transition-all">Remove</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {webMaintenanceService && (
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Care Package</p>
                      <button onClick={() => setWebMaintenanceService(false)} className="text-[8px] font-black text-red-500 uppercase mt-1">Remove</button>
                    </div>
                    <p className="font-black text-white text-sm">{formatPrice(500)}</p>
                  </div>
                )}

                <div className="pt-8 border-t border-white/20 text-center">
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-2">Project Total</p>
                  <p className="text-5xl font-black text-blue-500 tracking-tighter">{formatPrice(calculateTotal())}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
