
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

  const [step, setStep] = useState(0); // 0: Details, 1: Payment Selection/Details, 2: Success
  const [paymentMode, setPaymentMode] = useState<'now' | 'later'>('later');
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    business: '',
    details: '',
    senderNumber: ''
  });

  const isEmpty = selectedPackages.length === 0 && !webMaintenanceService;
  
  const paymentMethods = [
    {
      id: 'bkash',
      name: 'Bkash',
      color: '#D12053',
      number: '01939888381',
      steps: [
        { label: 'Open App', icon: '📱' },
        { label: 'Click Send Money', icon: '💸' },
        { label: 'Paste Number 01939888381', icon: '📋' },
        { label: 'Send', icon: '🚀' }
      ],
      icon: 'https://img.icons8.com/color/48/000000/wallet--v1.png'
    },
    {
      id: 'nagad',
      name: 'Nagad',
      color: '#F7941D',
      number: '01939888381',
      steps: [
        { label: 'Open App', icon: '📱' },
        { label: 'Click Send Money', icon: '💸' },
        { label: 'Paste Number 01939888381', icon: '📋' },
        { label: 'Send', icon: '🚀' }
      ],
      icon: 'https://img.icons8.com/color/48/000000/wallet--v1.png'
    },
    {
      id: 'islami',
      name: 'Islami Bank',
      color: '#10b981',
      number: '20502166700004517',
      steps: [
        { label: 'Open App', icon: '🏦' },
        { label: 'Click Bank Transfer', icon: '🔄' },
        { label: 'Select Islami Bank', icon: '🏷️' },
        { label: 'Account 20502166700004517', icon: '🔢' }
      ],
      icon: 'https://img.icons8.com/fluency/48/000000/bank.png'
    },
    {
      id: 'mtb',
      name: 'MTB Bank',
      color: '#ef4444',
      number: '1311003292183',
      steps: [
        { label: 'Open App', icon: '🏦' },
        { label: 'Click MTB Transfer', icon: '⚡' },
        { label: 'Paste 1311003292183', icon: '📋' },
        { label: 'Send', icon: '🚀' }
      ],
      icon: 'https://img.icons8.com/fluency/48/000000/bank.png'
    },
    {
      id: 'sonali',
      name: 'Sonali Bank',
      color: '#eab308',
      number: '0126301008929',
      steps: [
        { label: 'Open App', icon: '🏦' },
        { label: 'Click Bank Transfer', icon: '🔄' },
        { label: 'Select Sonali Bank', icon: '🏷️' },
        { label: 'Account 0126301008929', icon: '🔢' }
      ],
      icon: 'https://img.icons8.com/fluency/48/000000/bank.png'
    }
  ];

  const currentMethod = paymentMethods.find(m => m.id === selectedMethodId);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setCopyStatus(prev => ({ ...prev, [id]: false })), 2000);
  };

  const generateOrderId = () => `WR-${Math.floor(10000 + Math.random() * 90000)}`;

  const submitOrder = async () => {
    const newId = generateOrderId();
    setOrderId(newId);

    const orderData = {
      orderId: newId,
      customer: formData,
      items: selectedPackages.map(p => ({ name: p.name, price: p.price })),
      maintenance: webMaintenanceService,
      total: calculateTotal(),
      paymentMode: paymentMode,
      paymentMethod: selectedMethodId,
      senderNumber: formData.senderNumber
    };

    // Transition to success screen
    setStep(2);

    try {
      // Relative path is required for Cloudflare Pages Functions to route correctly on the same domain
      await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch (err) {
      console.error("Critical: Email notification failed", err);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email && !formData.phone) {
      alert("Please provide contact information.");
      return;
    }
    
    if (paymentMode === 'now') {
      setStep(1);
    } else {
      submitOrder();
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder();
  };

  if (step === 2) {
    return (
      <div className="py-40 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 p-16 rounded-[4rem] border border-blue-500/20 shadow-3xl">
          <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-10 font-bold">✓</div>
          <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-tighter text-white">Order Received</h1>
          <p className="text-blue-500 font-black tracking-widest uppercase text-sm mb-10">Order ID: {orderId}</p>
          
          <p className="text-slate-200 mb-8 font-semibold text-lg leading-relaxed max-w-lg mx-auto">
            {paymentMode === 'later' 
              ? "Your request has been filed. We have sent a confirmation to your email." 
              : "Payment details submitted! Our team will verify and reach out to begin your project."}
          </p>

          <div className="space-y-8 mb-12">
            <div className="bg-slate-950 border border-white/5 p-6 rounded-3xl max-w-md mx-auto">
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest">Policy Hub</p>
              <p className="text-xs text-slate-300 mt-2 font-medium">Half of the payment for services must be done before the work starts because hosting and other work related pays are included in that.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://wa.me/8801939888381" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-2xl hover:bg-emerald-700 transition-all hover:scale-105"
              >
                <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" className="w-6 h-6" alt="WhatsApp" />
                WhatsApp Now
              </a>
              <a 
                href="mailto:ikraismam23@gmail.com" 
                className="inline-flex items-center justify-center gap-4 bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs border border-white/10 hover:bg-slate-700 transition-all"
              >
                Email Support
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={() => { resetCart(); navigate('/'); }} className="bg-blue-600 px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs text-white shadow-2xl hover:bg-blue-700 transition-all">Back to Home</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
             <h1 className="text-5xl font-extrabold uppercase tracking-tighter text-white">
                {step === 0 ? "Order Details" : "Secure Checkout"}
             </h1>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
                Phase {step + 1} of 2
             </p>
          </div>
          <div className="bg-slate-900 px-8 py-4 rounded-full border border-white/5 flex gap-4">
             <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= 0 ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-700'}`}></div>
             <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-700'}`}></div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            {isEmpty ? (
              <div className="bg-slate-900 p-20 rounded-[3rem] text-center border border-white/5 shadow-2xl">
                <p className="text-slate-500 mb-12 font-bold uppercase tracking-widest">Empty Cart</p>
                <Link to="/pricing" className="bg-blue-600 px-12 py-5 rounded-2xl font-bold uppercase text-xs tracking-widest shadow-xl inline-block transition-all hover:scale-105 text-white">View Catalog</Link>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {step === 0 ? (
                  <motion.form 
                    key="step0"
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleNextStep} 
                    className="space-y-8"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium" 
                          placeholder="Your Name" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Business Name</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.business}
                          onChange={(e) => setFormData({...formData, business: e.target.value})}
                          className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium" 
                          placeholder="Your Brand" 
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                        <input 
                          required
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium" 
                          placeholder="hello@example.com" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">WhatsApp / Phone</label>
                        <input 
                          required
                          name="phone" 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium" 
                          placeholder="+880..." 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Project Brief</label>
                      <textarea 
                        required 
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        rows={4} 
                        className="w-full bg-slate-900 border border-white/5 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium" 
                        placeholder="Tell us what you need..."
                      ></textarea>
                    </div>

                    <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 space-y-8">
                       <h3 className="text-xl font-extrabold uppercase tracking-tighter text-white">Choose Flow</h3>
                       <div className="grid sm:grid-cols-2 gap-6">
                          <button 
                            type="button"
                            onClick={() => setPaymentMode('now')}
                            className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${paymentMode === 'now' ? 'bg-blue-600/10 border-blue-600 shadow-xl' : 'bg-slate-900 border-white/5 hover:border-white/20'}`}
                          >
                             <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${paymentMode === 'now' ? 'border-blue-500' : 'border-slate-700'}`}>
                                {paymentMode === 'now' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                             </div>
                             <div className="text-center">
                                <p className="font-extrabold text-white uppercase tracking-tighter">Pay Now</p>
                                <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">Direct Priority Development</p>
                             </div>
                          </button>
                          
                          <button 
                            type="button"
                            onClick={() => setPaymentMode('later')}
                            className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${paymentMode === 'later' ? 'bg-blue-600/10 border-blue-600 shadow-xl' : 'bg-slate-900 border-white/5 hover:border-white/20'}`}
                          >
                             <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${paymentMode === 'later' ? 'border-blue-500' : 'border-slate-700'}`}>
                                {paymentMode === 'later' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                             </div>
                             <div className="text-center">
                                <p className="font-extrabold text-white uppercase tracking-tighter">Pay Later</p>
                                <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">Request Quote & Talk</p>
                             </div>
                          </button>
                       </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-extrabold text-lg uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all">
                      {paymentMode === 'now' ? "Go to Secure Payment" : "Finish Request"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-12"
                  >
                    {!selectedMethodId ? (
                      <div className="bg-slate-900 p-8 lg:p-12 rounded-[3.5rem] border border-white/5 shadow-3xl">
                         <div className="text-center mb-10">
                            <h3 className="text-3xl font-extrabold uppercase tracking-tighter text-white mb-2">Select Your Platform</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Encryption Active</p>
                         </div>
                         
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {paymentMethods.map(method => (
                              <button
                                key={method.id}
                                onClick={() => setSelectedMethodId(method.id)}
                                className="group flex flex-col items-center gap-4 p-8 bg-slate-950 border border-white/5 rounded-[2.5rem] transition-all hover:border-blue-500/30 hover:bg-slate-900"
                              >
                                 <div className="w-16 h-16 bg-white/5 rounded-2xl p-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <img src={method.icon} alt={method.name} className="w-full h-full object-contain" />
                                 </div>
                                 <span className="text-xs font-extrabold text-slate-300 uppercase tracking-widest group-hover:text-white">{method.name}</span>
                              </button>
                            ))}
                         </div>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 p-10 lg:p-14 rounded-[3.5rem] border border-blue-500/20 shadow-3xl relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 p-8">
                            <button onClick={() => setSelectedMethodId(null)} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Switch Provider</button>
                         </div>

                         <div className="flex items-center gap-6 mb-12">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl p-3 flex items-center justify-center">
                               <img src={currentMethod?.icon} alt={currentMethod?.name} className="w-full h-full object-contain" />
                            </div>
                            <h4 className="text-4xl font-extrabold text-white tracking-tighter" style={{ color: currentMethod?.color }}>{currentMethod?.name}</h4>
                         </div>

                         <div className="space-y-12">
                            <div className="bg-slate-950 border border-white/5 p-8 rounded-[2.5rem] group">
                               <div className="flex justify-between items-center mb-4">
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Address</span>
                                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Verified Account</span>
                               </div>
                               <div className="flex items-center justify-between gap-6">
                                  <span className="text-3xl font-extrabold text-white tracking-tighter font-mono">{currentMethod?.number}</span>
                                  <button 
                                    onClick={() => handleCopy(currentMethod?.number || '', currentMethod?.id || '')}
                                    className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${copyStatus[currentMethod?.id || ''] ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}
                                  >
                                    {copyStatus[currentMethod?.id || ''] ? 'Copied ID' : 'Copy Number'}
                                  </button>
                               </div>
                            </div>

                            <div className="space-y-6">
                               <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] text-center">Visual Flow Instructions</p>
                               <div className="grid md:grid-cols-4 gap-4">
                                  {currentMethod?.steps.map((step, sIdx) => (
                                    <div key={sIdx} className="flex flex-col items-center text-center gap-3 p-6 bg-slate-950 border border-white/5 rounded-3xl group hover:border-blue-500/20 transition-all">
                                       <div className="text-3xl mb-1">{step.icon}</div>
                                       <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center mb-1">{(sIdx + 1).toString().padStart(2, '0')}</div>
                                       <p className="text-[10px] font-extrabold text-slate-300 uppercase leading-snug tracking-tighter">{step.label}</p>
                                    </div>
                                  ))}
                               </div>
                            </div>

                            <form onSubmit={handleFinalSubmit} className="space-y-6 pt-6 border-t border-white/5">
                               <div className="space-y-4">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">After Sending Money, paste the Sender Number or Transaction ID below</label>
                                  <input 
                                    required 
                                    type="text" 
                                    value={formData.senderNumber}
                                    onChange={(e) => setFormData({...formData, senderNumber: e.target.value})}
                                    className="w-full bg-slate-950 border border-blue-500/30 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all text-xl font-bold font-mono placeholder:text-slate-800" 
                                    placeholder="Enter details..." 
                                  />
                               </div>
                               
                               <div className="flex gap-4">
                                  <button type="button" onClick={() => setSelectedMethodId(null)} className="w-1/3 py-6 rounded-2xl font-bold uppercase text-xs tracking-widest border border-white/5 text-slate-500 hover:text-white transition-all">Go Back</button>
                                  <button type="submit" className="flex-grow bg-blue-600 text-white py-6 rounded-2xl font-extrabold text-lg uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all">Confirm Order Payment</button>
                               </div>
                            </form>
                         </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 sticky top-28 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-extrabold uppercase tracking-tighter text-white">Review</h2>
                <Link to="/pricing" className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors">Add More Services</Link>
              </div>
              
              <div className="space-y-6">
                <AnimatePresence>
                  {selectedPackages.map(pkg => (
                    <motion.div key={pkg.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex justify-between items-start group">
                      <div className="flex-grow">
                        <p className="font-extrabold text-white uppercase text-sm tracking-tight">{pkg.name}</p>
                        <p className="text-[8px] text-slate-500 uppercase mt-1 font-bold">Priority {pkg.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white text-lg">{formatPrice(pkg.price)}</p>
                        {step === 0 && <button onClick={() => removePackage(pkg.id)} className="text-[8px] font-bold text-red-500 uppercase mt-1 opacity-0 group-hover:opacity-100 transition-all">Remove</button>}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {webMaintenanceService && (
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-orange-400 tracking-widest">Maintenance Service</p>
                      {step === 0 && <button onClick={() => setWebMaintenanceService(false)} className="text-[8px] font-bold text-red-500 uppercase mt-1">Remove</button>}
                    </div>
                    <p className="font-bold text-white text-sm">{formatPrice(500)}</p>
                  </div>
                )}

                <div className="pt-8 border-t border-white/20 text-center">
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Total Bill</p>
                  <p className="text-5xl font-extrabold text-blue-500 tracking-tighter">{formatPrice(calculateTotal())}</p>
                  <div className="mt-8 p-5 bg-white/5 rounded-[2rem]">
                     <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest leading-relaxed">Infrastructure verified. Priority deployment protocols active.</p>
                  </div>
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
