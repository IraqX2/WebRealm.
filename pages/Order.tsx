
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Order: React.FC = () => {
  const navigate = useNavigate();
  const { 
    selectedPackages, 
    webMaintenanceService, 
    calculateTotal,
    resetCart,
    removePackage,
    formatPrice
  } = useCart();

  const [step, setStep] = useState(0); // 0: Form, 1: Payment, 2: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'now' | 'later'>('later');
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
      number: '01939888381', 
      icon: 'https://img.icons8.com/color/48/000000/wallet--v1.png',
      steps: ['Open bKash App', 'Select "Send Money"', 'Paste Number: 01939888381', 'Enter Amount & Confirm', 'Copy TrxID']
    },
    { 
      id: 'nagad', 
      name: 'Nagad', 
      number: '01939888381', 
      icon: 'https://img.icons8.com/color/48/000000/wallet--v1.png',
      steps: ['Open Nagad App', 'Select "Send Money"', 'Paste Number: 01939888381', 'Enter Amount & Confirm', 'Copy TrxID']
    },
    { 
      id: 'islami', 
      name: 'Islami Bank', 
      number: '20502166700004517', 
      icon: 'https://img.icons8.com/fluency/48/000000/bank.png',
      steps: ['Open CellFin / IBBL App', 'Select "Fund Transfer"', 'Enter A/C: 20502166700004517', 'Confirm Transfer', 'Keep Reference Number']
    },
    { 
      id: 'mtb', 
      name: 'MTB Bank', 
      number: '1202100021541', 
      icon: 'https://img.icons8.com/fluency/48/000000/bank.png',
      steps: ['Open MTB Smart App', 'Select "Transfer"', 'Enter A/C: 1202100021541', 'Confirm Payment', 'Copy TXN ID']
    },
    { 
      id: 'sonali', 
      name: 'Sonali Bank', 
      number: '4404002000254', 
      icon: 'https://img.icons8.com/fluency/48/000000/bank.png',
      steps: ['Open Sonali e-Wallet', 'Select "Transfer"', 'Enter A/C: 4404002000254', 'Verify Details', 'Capture Confirmation']
    }
  ];

  const currentMethod = paymentMethods.find(m => m.id === selectedMethodId);

  const generateOrderId = () => `WR-${Math.floor(10000 + Math.random() * 90000)}`;

  const constructWhatsAppMessage = (id: string) => {
    const items = selectedPackages.map(p => p.name).join(', ');
    const total = calculateTotal();
    const text = `*WEBREALM SECURE ORDER REGISTRY*\n\n` +
                 `*Order ID:* ${id}\n` +
                 `*Client:* ${formData.fullName}\n` +
                 `*Brand:* ${formData.business || 'N/A'}\n` +
                 `*Services:* ${items}\n` +
                 `*Total:* ${total} BDT\n\n` +
                 `*Payment:* ${currentMethod ? currentMethod.name : 'Inquiry'}\n` +
                 `*Ref/TXN:* ${formData.senderNumber || 'N/A'}\n\n` +
                 `*Contact:* ${formData.phone}\n\n` +
                 `_Logged via WebRealm Protocol_`;
    return encodeURIComponent(text);
  };

  const handleFinalProcess = () => {
    setIsSubmitting(true);
    const newId = generateOrderId();
    setOrderId(newId);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 2200);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Required: Identification and Mobile Contact.");
      return;
    }
    paymentMode === 'now' ? setStep(1) : handleFinalProcess();
  };

  if (step === 2) {
    return (
      <div className="py-40 max-w-4xl mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="bg-slate-900 p-12 lg:p-20 rounded-[4rem] border border-blue-500/20 shadow-3xl"
        >
          <div className="w-24 h-24 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-10 font-bold">✓</div>
          <h1 className="text-5xl lg:text-7xl font-black mb-4 text-white uppercase tracking-tighter">Order Locked</h1>
          <p className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-10">Registry ID: {orderId}</p>
          <p className="text-slate-300 mb-12 text-lg font-medium max-w-md mx-auto leading-relaxed">
            Your project blueprint has been securely logged. Our team is standing by to initiate production.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`https://wa.me/8801939888381?text=${constructWhatsAppMessage(orderId)}`} 
              className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-700 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              Verify via WhatsApp
            </a>
            <button 
              onClick={() => { resetCart(); navigate('/'); }} 
              className="bg-slate-800 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10"
            >
              Back to Hub
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-950 min-h-screen relative overflow-hidden">
      <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_20px_#3b82f6]"></div>
              <p className="text-white font-black uppercase tracking-[0.4em] text-[10px]">Syncing with WebRealm Nodes...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white">Registry</h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-4 shadow-[0_0_15px_#3b82f6]"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-3">
            {isEmpty ? (
              <div className="bg-slate-900 p-20 rounded-[4rem] text-center border border-white/5">
                <p className="text-slate-500 mb-10 font-black uppercase tracking-widest">Registry is Empty</p>
                <Link to="/pricing" className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Browse Packages</Link>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {step === 0 ? (
                  <motion.form 
                    key="s0" 
                    onSubmit={handleNextStep} 
                    className="space-y-8 bg-slate-900 p-10 lg:p-14 rounded-[4rem] border border-white/5 shadow-3xl"
                  >
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Full Name</label>
                        <input required placeholder="Client Identity" className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 font-bold transition-all" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Brand Name</label>
                        <input placeholder="Project Label" className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 font-bold transition-all" value={formData.business} onChange={e => setFormData({...formData, business: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Email Access</label>
                        <input required type="email" placeholder="Communication Hub" className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 font-bold transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2">WhatsApp / Phone</label>
                        <input required type="tel" placeholder="Mobile Node" className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 font-bold transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Project Brief</label>
                      <textarea required placeholder="Outline your specific requirements..." rows={4} className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 font-bold transition-all" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} />
                    </div>
                    
                    <div className="flex gap-6">
                      <button type="button" onClick={() => setPaymentMode('now')} className={`flex-1 py-10 rounded-[2.5rem] border-2 transition-all font-black uppercase text-xs tracking-widest ${paymentMode === 'now' ? 'bg-blue-600/10 border-blue-500 text-white shadow-2xl' : 'bg-slate-950 border-white/5 text-slate-500 opacity-60'}`}>
                        Pay Instantly
                      </button>
                      <button type="button" onClick={() => setPaymentMode('later')} className={`flex-1 py-10 rounded-[2.5rem] border-2 transition-all font-black uppercase text-xs tracking-widest ${paymentMode === 'later' ? 'bg-blue-600/10 border-blue-500 text-white shadow-2xl' : 'bg-slate-950 border-white/5 text-slate-500 opacity-60'}`}>
                        Inquire First
                      </button>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-8 rounded-3xl font-black text-xl uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-700 transition-all">
                      Lock Registry
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="s1" 
                    className="bg-slate-900 p-8 lg:p-12 rounded-[4rem] border border-blue-500/20 shadow-3xl"
                  >
                    <button onClick={() => setStep(0)} className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-10 hover:text-white flex items-center gap-2">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                       Back to Details
                    </button>
                    
                    <h3 className="text-3xl font-black text-white uppercase mb-12 tracking-tighter">Secure Gateway</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
                      {paymentMethods.map(m => (
                        <button key={m.id} onClick={() => setSelectedMethodId(m.id)} className={`p-6 rounded-[2rem] bg-slate-950 border transition-all ${selectedMethodId === m.id ? 'border-blue-500 shadow-2xl scale-105' : 'border-white/5 opacity-50 hover:opacity-100'}`}>
                          <img src={m.icon} className="w-10 h-10 mx-auto mb-3" alt={m.name} />
                          <p className="text-[8px] font-black uppercase text-slate-400 text-center">{m.name}</p>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedMethodId && (
                        <motion.div 
                          key={selectedMethodId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-950 p-8 lg:p-10 rounded-[3rem] border border-blue-500/20"
                        >
                          <div className="grid lg:grid-cols-2 gap-10">
                            <div>
                              <p className="text-[10px] font-black uppercase text-slate-500 mb-6 tracking-widest">Protocol Sequence:</p>
                              <div className="space-y-6">
                                {currentMethod?.steps.map((s, i) => (
                                  <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-6 h-6 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-500 text-[10px] font-black flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                      {i + 1}
                                    </div>
                                    <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{s}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-10 lg:pt-0 lg:pl-10">
                              <div className="mb-10">
                                <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Target Account</p>
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                                  <span className="text-xl font-black font-mono text-white tracking-tighter">{currentMethod?.number}</span>
                                  <button onClick={() => { navigator.clipboard.writeText(currentMethod?.number || ''); alert('Copied!'); }} className="text-blue-500 text-[10px] font-black uppercase px-3 py-1 bg-blue-500/10 rounded-lg">Copy</button>
                                </div>
                              </div>
                              <div className="space-y-2 mb-8">
                                <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Verification Input (TrxID / Phone)</label>
                                <input required placeholder="Paste Identifier Code" className="w-full bg-slate-900 border border-white/10 px-8 py-5 rounded-2xl text-white font-bold outline-none focus:border-blue-500" value={formData.senderNumber} onChange={e => setFormData({...formData, senderNumber: e.target.value})} />
                              </div>
                              <button onClick={handleFinalProcess} className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">Verify & Sync Registry</button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-900 p-10 rounded-[4rem] border border-white/5 sticky top-28 shadow-3xl">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-10 border-b border-white/5 pb-6">Summary</h2>
              <div className="space-y-8">
                {selectedPackages.map(pkg => (
                  <div key={pkg.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-white uppercase text-xs tracking-widest">{pkg.name}</p>
                      <button onClick={() => removePackage(pkg.id)} className="text-[9px] text-red-500 uppercase font-black mt-2">Release</button>
                    </div>
                    <p className="font-black text-white text-lg">{formatPrice(pkg.price)}</p>
                  </div>
                ))}
                
                {webMaintenanceService && (
                  <div className="flex justify-between items-center py-2 border-t border-white/5 mt-4">
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Maintenance</p>
                    <p className="font-black text-white text-sm">{formatPrice(500)}</p>
                  </div>
                )}

                <div className="pt-10 border-t border-white/10 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black mb-2 tracking-[0.2em]">Investment Total</p>
                  <p className="text-6xl font-black text-blue-500 tracking-tighter mb-10">{formatPrice(calculateTotal())}</p>
                  <Link 
                    to="/pricing" 
                    className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-blue-500/50 transition-all"
                  >
                    Add More Services
                  </Link>
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
