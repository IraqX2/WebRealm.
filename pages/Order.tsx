
import React, { useState, useEffect } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
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

  // Debug check
  useEffect(() => {
    console.log("Order Page Loaded. Cart Items:", selectedPackages.length);
  }, [selectedPackages]);
  
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
      icon: 'https://img.icons8.com/color/48/000000/wallet--v1.png'
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

  const constructWhatsAppMessage = (id: string) => {
    const items = selectedPackages.map(p => p.name).join(', ');
    const total = calculateTotal();
    const text = `Hello WebRealm, I want to place an order.\n\n` +
                 `Order ID: ${id}\n` +
                 `Name: ${formData.fullName}\n` +
                 `Business: ${formData.business}\n` +
                 `Selected: ${items}\n` +
                 `Maintenance: ${webMaintenanceService ? 'Yes' : 'No'}\n` +
                 `Total: ${total} BDT\n` +
                 `Details: ${formData.details}`;
    return encodeURIComponent(text);
  };

  const submitOrder = async () => {
    console.log("Submitting order...");
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmissionError(null);
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

    try {
      console.log("Fetching /api/send-order...");
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      console.log("API Status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Submission successful:", result);
      setStep(2);
    } catch (err: any) {
      console.error("Critical submission error:", err);
      setSubmissionError(err.message || "Failed to transmit data to the server.");
      // Note: We don't automatically setStep(2) here anymore so user sees the error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || (!formData.email && !formData.phone)) {
      alert("Please provide your name and at least one contact method (Email or Phone).");
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

  // SUCCESS SCREEN
  if (step === 2) {
    return (
      <div className="py-40 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 p-16 rounded-[4rem] border border-blue-500/20 shadow-3xl">
          <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-10 font-bold">✓</div>
          <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-tighter text-white">Order Filed</h1>
          <p className="text-blue-500 font-black tracking-widest uppercase text-sm mb-10">Order ID: {orderId}</p>
          
          <p className="text-slate-200 mb-12 font-semibold text-lg leading-relaxed max-w-lg mx-auto">
            {paymentMode === 'later' 
              ? "Your request is live in our system. Our design engineers will review your brief and contact you within the hour." 
              : "Payment confirmed for processing. We will verify the transaction and activate your project dashboard shortly."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a 
              href={`https://wa.me/8801939888381?text=${constructWhatsAppMessage(orderId)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-2xl hover:bg-emerald-700 transition-all hover:scale-105"
            >
              <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" className="w-6 h-6" alt="WhatsApp" />
              WhatsApp Confirmation
            </a>
            <button onClick={() => { resetCart(); navigate('/'); }} className="bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs border border-white/10 hover:bg-slate-700 transition-all">Back to Home</button>
          </div>

          <div className="bg-slate-950 border border-white/5 p-6 rounded-3xl max-w-md mx-auto">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Protocol Tip</p>
            <p className="text-xs text-slate-400 mt-2">Check your email (and spam folder) for the formal project receipt.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-950 min-h-screen relative">
      {/* Global Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_#3b82f6]"></div>
            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Transmitting Order...</h3>
            <p className="text-blue-500 font-bold uppercase text-[10px] tracking-[0.2em] animate-pulse">Syncing with global servers</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs / Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
             <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
                {step === 0 ? "Project Blueprint" : "Secure Node"}
             </h1>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
                Deployment Phase {step + 1} of 2
             </p>
          </div>
          <div className="bg-slate-900 px-8 py-4 rounded-full border border-white/5 flex items-center gap-6">
             <div className="flex gap-4">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= 0 ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-700'}`}></div>
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-700'}`}></div>
             </div>
             <div className="h-8 w-px bg-white/10"></div>
             <Link to="/pricing" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors">Add Services</Link>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          
          {/* Main Flow */}
          <div className="lg:col-span-3">
            {isEmpty ? (
              <div className="bg-slate-900 p-20 rounded-[4rem] text-center border border-white/5 shadow-2xl">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-2xl">🛒</div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Your Node is Empty</h2>
                <p className="text-slate-500 mb-12 font-bold uppercase tracking-widest text-xs">Select a digital asset to begin the order protocol.</p>
                <Link to="/pricing" className="bg-blue-600 px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl inline-block transition-all hover:scale-105 text-white">Browse Infrastructure</Link>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                
                {/* Error Banner */}
                {submissionError && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-8 bg-red-600/10 border border-red-500/30 p-8 rounded-[2rem] flex flex-col items-center gap-4 text-center"
                  >
                    <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">!</div>
                    <div>
                      <h4 className="font-black text-white uppercase text-sm mb-1 tracking-widest">Network Error</h4>
                      <p className="text-xs text-red-400 font-medium">{submissionError}</p>
                    </div>
                    <div className="flex gap-4 w-full">
                      <button onClick={submitOrder} className="flex-1 bg-white text-slate-950 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200">Retry Protocol</button>
                      <a 
                        href={`https://wa.me/8801939888381?text=${constructWhatsAppMessage('RETRY-' + Math.floor(Math.random()*1000))}`} 
                        className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 text-center"
                      >
                        Order via WhatsApp
                      </a>
                    </div>
                  </motion.div>
                )}

                {step === 0 ? (
                  <motion.form 
                    key="step0"
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleNextStep} 
                    className="space-y-8"
                  >
                    {/* Mobile Summary Box */}
                    <div className="lg:hidden bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 mb-8 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Payload</p>
                          <p className="text-3xl font-black text-white tracking-tighter">{formatPrice(calculateTotal())}</p>
                        </div>
                        <Link to="/pricing" className="bg-blue-600/10 text-blue-500 border border-blue-500/20 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest">Add More</Link>
                    </div>

                    <div className="bg-slate-900 p-10 lg:p-12 rounded-[3.5rem] border border-white/5 space-y-10 shadow-3xl">
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Identity</label>
                          <input 
                            required 
                            type="text" 
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-800" 
                            placeholder="Full Name" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Brand / Company</label>
                          <input 
                            required 
                            type="text" 
                            value={formData.business}
                            onChange={(e) => setFormData({...formData, business: e.target.value})}
                            className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-800" 
                            placeholder="Brand Name" 
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Secure Email</label>
                          <input 
                            required
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-800" 
                            placeholder="hello@example.com" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Direct Contact (WhatsApp preferred)</label>
                          <input 
                            required
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-800" 
                            placeholder="+880..." 
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Project Architecture (The Brief)</label>
                        <textarea 
                          required 
                          value={formData.details}
                          onChange={(e) => setFormData({...formData, details: e.target.value})}
                          rows={4} 
                          className="w-full bg-slate-950 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-800" 
                          placeholder="What specific goals should your website achieve?"
                        ></textarea>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-10 lg:p-12 rounded-[3.5rem] border border-white/5 space-y-8 shadow-3xl">
                       <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Payment Protocol</h3>
                       <div className="grid sm:grid-cols-2 gap-6">
                          <button 
                            type="button"
                            onClick={() => setPaymentMode('now')}
                            className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center gap-6 ${paymentMode === 'now' ? 'bg-blue-600/10 border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.2)]' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}
                          >
                             <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${paymentMode === 'now' ? 'border-blue-500 bg-blue-500/20' : 'border-slate-800 bg-slate-900'}`}>
                                {paymentMode === 'now' && <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>}
                             </div>
                             <div>
                                <p className="font-black text-white uppercase text-lg tracking-tighter">Fast-Track</p>
                                <p className="text-[9px] text-slate-500 uppercase font-black mt-2 tracking-[0.2em]">Pay Now & Jump the queue</p>
                             </div>
                          </button>
                          
                          <button 
                            type="button"
                            onClick={() => setPaymentMode('later')}
                            className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center gap-6 ${paymentMode === 'later' ? 'bg-blue-600/10 border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.2)]' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}
                          >
                             <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${paymentMode === 'later' ? 'border-blue-500 bg-blue-500/20' : 'border-slate-800 bg-slate-900'}`}>
                                {paymentMode === 'later' && <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>}
                             </div>
                             <div>
                                <p className="font-black text-white uppercase text-lg tracking-tighter">Consultation</p>
                                <p className="text-[9px] text-slate-500 uppercase font-black mt-2 tracking-[0.2em]">Review brief then pay</p>
                             </div>
                          </button>
                       </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/pricing" className="sm:w-1/3 bg-white/5 border border-white/10 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 text-center flex items-center justify-center gap-3 group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Add More
                      </Link>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`flex-grow bg-blue-600 text-white py-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all ${isSubmitting ? 'opacity-50 cursor-wait' : 'hover:bg-blue-700 hover:-translate-y-1 active:scale-95'}`}
                      >
                        {isSubmitting ? "Processing..." : (paymentMode === 'now' ? "Advance to Payment" : "Finalize Protocol")}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    {!selectedMethodId ? (
                      <div className="bg-slate-900 p-12 lg:p-16 rounded-[4rem] border border-white/5 shadow-3xl text-center">
                         <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Select Gateway</h3>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12">Encrypted Peer-to-Peer Transfer</p>
                         
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {paymentMethods.map(method => (
                              <button
                                key={method.id}
                                onClick={() => setSelectedMethodId(method.id)}
                                className="group flex flex-col items-center gap-6 p-10 bg-slate-950 border border-white/5 rounded-[3rem] transition-all hover:border-blue-500/30 hover:bg-slate-900 hover:-translate-y-2 shadow-xl"
                              >
                                 <div className="w-20 h-20 bg-white/5 rounded-[1.8rem] p-4 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all">
                                    <img src={method.icon} alt={method.name} className="w-full h-full object-contain" />
                                 </div>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white">{method.name}</span>
                              </button>
                            ))}
                         </div>
                         
                         <div className="mt-12 pt-12 border-t border-white/5">
                            <button onClick={() => setStep(0)} className="text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors">← Back to Identity Details</button>
                         </div>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 p-12 lg:p-16 rounded-[4rem] border border-blue-500/20 shadow-3xl relative overflow-hidden"
                      >
                         <button onClick={() => setSelectedMethodId(null)} className="absolute top-12 right-12 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Switch Method</button>

                         <div className="flex items-center gap-8 mb-16">
                            <div className="w-20 h-20 bg-white/5 rounded-[1.8rem] p-4 flex items-center justify-center shadow-inner">
                               <img src={currentMethod?.icon} alt={currentMethod?.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <h4 className="text-5xl font-black text-white tracking-tighter uppercase" style={{ color: currentMethod?.color }}>{currentMethod?.name}</h4>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Authorized Receiver Account</p>
                            </div>
                         </div>

                         <div className="space-y-12">
                            <div className="bg-slate-950 border border-white/10 p-10 rounded-[3rem] group hover:border-blue-500/30 transition-all shadow-inner">
                               <div className="flex justify-between items-center mb-6">
                                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Address</span>
                                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest animate-pulse">Live Account</span>
                               </div>
                               <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                                  <span className="text-4xl font-black text-white tracking-tighter font-mono">{currentMethod?.number}</span>
                                  <button 
                                    onClick={() => handleCopy(currentMethod?.number || '', currentMethod?.id || '')}
                                    className={`w-full sm:w-auto px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${copyStatus[currentMethod?.id || ''] ? 'bg-green-600 text-white shadow-[0_0_20px_#16a34a]' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                  >
                                    {copyStatus[currentMethod?.id || ''] ? 'Copied to Clipboard' : 'Copy Identifier'}
                                  </button>
                               </div>
                            </div>

                            <div className="space-y-8">
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-center mb-4">Transmission Sequence</p>
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  {currentMethod?.steps.map((step, sIdx) => (
                                    <div key={sIdx} className="flex flex-col items-center text-center gap-4 p-6 bg-slate-950/50 border border-white/5 rounded-[2rem] hover:border-blue-500/10 transition-all">
                                       <div className="text-3xl">{step.icon}</div>
                                       <p className="text-[9px] font-black text-slate-300 uppercase leading-snug tracking-tighter h-8 flex items-center">{step.label}</p>
                                       <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-500 text-[9px] font-black flex items-center justify-center">{(sIdx + 1)}</div>
                                    </div>
                                  ))}
                               </div>
                            </div>

                            <form onSubmit={handleFinalSubmit} className="space-y-8 pt-12 border-t border-white/5">
                               <div className="space-y-4">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Input Transaction ID / Sender Digit for Verification</label>
                                  <input 
                                    required 
                                    type="text" 
                                    value={formData.senderNumber}
                                    onChange={(e) => setFormData({...formData, senderNumber: e.target.value})}
                                    className="w-full bg-slate-950 border border-blue-500/20 px-10 py-8 rounded-[2rem] text-white outline-none focus:border-blue-500 transition-all text-2xl font-black font-mono placeholder:text-slate-900 text-center uppercase" 
                                    placeholder="TRX-XXXX-XXXX" 
                                  />
                               </div>
                               
                               <div className="flex flex-col sm:flex-row gap-6">
                                  <button type="button" onClick={() => setSelectedMethodId(null)} className="sm:w-1/3 py-6 rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10 text-slate-500 hover:text-white transition-all">Change Gateway</button>
                                  <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`flex-grow bg-blue-600 text-white py-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all ${isSubmitting ? 'opacity-50 cursor-wait' : 'hover:bg-blue-700 hover:-translate-y-1 active:scale-95'}`}
                                  >
                                    {isSubmitting ? "Transmitting..." : "Activate Order Node"}
                                  </button>
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

          {/* Sidebar Area */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Project Summary Card */}
            <div className="bg-slate-900 p-10 lg:p-12 rounded-[4rem] border border-white/5 sticky top-28 shadow-3xl">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Registry</h2>
                <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-xl">📋</div>
              </div>
              
              <div className="space-y-8">
                <AnimatePresence>
                  {selectedPackages.map(pkg => (
                    <motion.div key={pkg.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex justify-between items-start group">
                      <div className="flex-grow">
                        <p className="font-black text-white uppercase text-base tracking-tighter mb-1">{pkg.name}</p>
                        <p className="text-[9px] text-blue-500 uppercase font-black tracking-widest">{pkg.category} Cluster</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-white text-xl tracking-tight">{formatPrice(pkg.price)}</p>
                        {step === 0 && <button onClick={() => removePackage(pkg.id)} className="text-[8px] font-black text-red-500 uppercase mt-2 opacity-0 group-hover:opacity-100 transition-all hover:scale-110">Remove Asset</button>}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {webMaintenanceService && (
                  <div className="pt-8 border-t border-white/5 flex justify-between items-center group">
                    <div>
                      <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Active Maintenance</p>
                      <p className="text-[8px] text-slate-500 uppercase mt-1 font-black">Monthly Node Updates</p>
                      {step === 0 && <button onClick={() => setWebMaintenanceService(false)} className="text-[8px] font-black text-red-500 uppercase mt-2 opacity-0 group-hover:opacity-100 transition-all">Remove</button>}
                    </div>
                    <p className="font-black text-white text-lg tracking-tight">{formatPrice(500)}</p>
                  </div>
                )}

                <div className="pt-12 border-t border-white/20">
                  <div className="text-center mb-10">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.5em] mb-3 font-black">Total Investment</p>
                    <p className="text-6xl lg:text-7xl font-black text-blue-500 tracking-tighter animate-pulse-slow">{formatPrice(calculateTotal())}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Link 
                      to="/pricing" 
                      className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 hover:border-blue-500/50 transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                      Merge New Assets
                    </Link>
                    
                    <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5 text-center">
                       <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest leading-relaxed">Secure SSL End-to-End Encryption Enabled.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Widget */}
            <div className="bg-emerald-950/20 border border-emerald-500/10 p-10 rounded-[3rem] hidden lg:block">
               <div className="flex items-center gap-6 mb-4">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl">💬</div>
                  <h4 className="font-black text-white uppercase tracking-tighter">Live Support</h4>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed mb-8">Prefer ordering via a human designer? Skip the form and talk to us directly on WhatsApp.</p>
               <a 
                href="https://wa.me/8801939888381" 
                target="_blank" 
                className="block w-full bg-emerald-600 text-white text-center py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 transition-all"
               >
                 WhatsApp Direct
               </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
