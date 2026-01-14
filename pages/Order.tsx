
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

  const [step, setStep] = useState(0); // 0: Details, 1: Payment, 2: Success
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

  const paymentMethods = [
    { id: 'bkash', name: 'Bkash', color: '#D12053', number: '01939888381', icon: 'https://img.icons8.com/color/48/000000/wallet--v1.png' },
    { id: 'nagad', name: 'Nagad', color: '#F7941D', number: '01939888381', icon: 'https://img.icons8.com/color/48/000000/wallet--v1.png' },
    { id: 'islami', name: 'Islami Bank', color: '#10b981', number: '20502166700004517', icon: 'https://img.icons8.com/fluency/48/000000/bank.png' }
  ];

  const currentMethod = paymentMethods.find(m => m.id === selectedMethodId);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setCopyStatus(prev => ({ ...prev, [id]: false })), 2000);
  };

  const constructWhatsAppMessage = (id: string) => {
    const items = selectedPackages.map(p => p.name).join(', ');
    const total = calculateTotal();
    const text = `*New WebRealm Order*\nID: ${id}\nName: ${formData.fullName}\nBusiness: ${formData.business}\nServices: ${items}\nTotal: ${total} BDT\nBrief: ${formData.details}`;
    return encodeURIComponent(text);
  };

  const submitOrder = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmissionError(null);
    const newId = `WR-${Math.floor(10000 + Math.random() * 90000)}`;
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
      // Use absolute URL to ensure we hit the Cloudflare Function regardless of routing
      const apiUrl = `${window.location.origin}/api/send-order`;
      console.log("Transmitting to:", apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      
      await response.json();
      setStep(2); // Success
    } catch (err: any) {
      console.error("Order Transmission Failed:", err);
      setSubmissionError(err.message || "Network Error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || (!formData.email && !formData.phone)) {
      alert("Please provide your name and contact info.");
      return;
    }
    paymentMode === 'now' ? setStep(1) : submitOrder();
  };

  if (step === 2) {
    return (
      <div className="py-40 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 p-16 rounded-[4rem] border border-blue-500/20 shadow-3xl">
          <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-10 font-bold">✓</div>
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white">Order Received</h1>
          <p className="text-blue-500 font-black tracking-widest uppercase text-xs mb-10">Order ID: {orderId}</p>
          <p className="text-slate-300 mb-12 text-lg leading-relaxed max-w-md mx-auto">We've received your request! Our team will contact you via WhatsApp shortly to finalize your project blueprint.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => { resetCart(); navigate('/'); }} className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all">Home Hub</button>
            <a href={`https://wa.me/8801939888381?text=${constructWhatsAppMessage(orderId)}`} className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-700 transition-all">Chat on WhatsApp</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-950 min-h-screen relative overflow-hidden">
      <AnimatePresence>
        {isSubmitting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_20px_#3b82f6]"></div>
              <p className="text-white font-black uppercase tracking-[0.3em] text-xs">Transmitting Data...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white">Checkout</h1>
          <div className="h-1 w-20 bg-blue-600 mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {isEmpty ? (
              <div className="bg-slate-900 p-20 rounded-[3rem] text-center border border-white/5">
                <p className="text-slate-500 mb-8 font-black uppercase tracking-widest">Your Registry is Empty</p>
                <Link to="/pricing" className="bg-blue-600 text-white px-10 py-5 rounded-xl font-black uppercase text-xs tracking-widest">Browse Services</Link>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {submissionError && (
                  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-red-600/10 border border-red-500/30 rounded-3xl flex flex-col items-center gap-4 text-center">
                    <p className="text-red-400 font-bold uppercase text-xs tracking-widest">Transmission Failure: {submissionError}</p>
                    <div className="flex gap-4">
                      <button onClick={submitOrder} className="bg-white text-red-600 px-6 py-2 rounded-lg font-black uppercase text-[10px]">Retry Now</button>
                      <a href={`https://wa.me/8801939888381?text=${constructWhatsAppMessage('FAIL-RETRY')}`} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-black uppercase text-[10px]">Order via WhatsApp</a>
                    </div>
                  </motion.div>
                )}

                {step === 0 ? (
                  <motion.form key="s0" onSubmit={handleNextStep} className="space-y-8 bg-slate-900 p-10 rounded-[3rem] border border-white/5">
                    <div className="grid md:grid-cols-2 gap-8">
                      <input required placeholder="Your Name" className="w-full bg-slate-950 border border-white/10 px-6 py-5 rounded-xl text-white outline-none focus:border-blue-500 font-bold" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                      <input placeholder="Business Name" className="w-full bg-slate-950 border border-white/10 px-6 py-5 rounded-xl text-white outline-none focus:border-blue-500 font-bold" value={formData.business} onChange={e => setFormData({...formData, business: e.target.value})} />
                      <input required type="email" placeholder="Email Address" className="w-full bg-slate-950 border border-white/10 px-6 py-5 rounded-xl text-white outline-none focus:border-blue-500 font-bold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      <input required type="tel" placeholder="Phone / WhatsApp" className="w-full bg-slate-950 border border-white/10 px-6 py-5 rounded-xl text-white outline-none focus:border-blue-500 font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <textarea required placeholder="Briefly describe your goals..." rows={4} className="w-full bg-slate-950 border border-white/10 px-6 py-5 rounded-xl text-white outline-none focus:border-blue-500 font-bold" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} />
                    
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setPaymentMode('now')} className={`flex-1 p-6 rounded-2xl border-2 transition-all ${paymentMode === 'now' ? 'bg-blue-600/10 border-blue-500' : 'bg-slate-950 border-white/5 opacity-50'}`}>
                        <p className="font-black text-white uppercase text-xs">Pay Now</p>
                      </button>
                      <button type="button" onClick={() => setPaymentMode('later')} className={`flex-1 p-6 rounded-2xl border-2 transition-all ${paymentMode === 'later' ? 'bg-blue-600/10 border-blue-500' : 'bg-slate-950 border-white/5 opacity-50'}`}>
                        <p className="font-black text-white uppercase text-xs">Inquiry Only</p>
                      </button>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 py-6 rounded-xl font-black text-lg uppercase tracking-widest text-white shadow-2xl hover:bg-blue-700">Continue Order</button>
                  </motion.form>
                ) : (
                  <motion.div key="s1" className="bg-slate-900 p-10 rounded-[3rem] border border-blue-500/20">
                    <h3 className="text-2xl font-black text-white mb-8 uppercase text-center">Select Gateway</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                      {paymentMethods.map(m => (
                        <button key={m.id} onClick={() => setSelectedMethodId(m.id)} className={`p-6 rounded-[2rem] bg-slate-950 border transition-all ${selectedMethodId === m.id ? 'border-blue-500 shadow-xl' : 'border-white/5'}`}>
                          <img src={m.icon} className="w-10 h-10 mx-auto mb-4" alt={m.name} />
                          <p className="text-[10px] font-black uppercase text-slate-400">{m.name}</p>
                        </button>
                      ))}
                    </div>
                    {selectedMethodId && (
                      <div className="space-y-6 bg-slate-950 p-8 rounded-[2rem] border border-white/5">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-black font-mono text-white">{currentMethod?.number}</span>
                          <button onClick={() => handleCopy(currentMethod?.number || '', 'num')} className="text-[10px] font-black uppercase text-blue-500">Copy</button>
                        </div>
                        <input required placeholder="Transaction ID or Sender #" className="w-full bg-slate-900 border border-white/10 px-6 py-4 rounded-xl text-white font-bold" value={formData.senderNumber} onChange={e => setFormData({...formData, senderNumber: e.target.value})} />
                        <button onClick={submitOrder} className="w-full bg-blue-600 py-5 rounded-xl font-black uppercase tracking-widest text-white">Verify & Submit</button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-900 p-8 lg:p-10 rounded-[3rem] border border-white/5 sticky top-28 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Summary</h2>
                <Link to="/pricing" className="bg-blue-500/10 text-blue-500 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">Add More Services</Link>
              </div>
              
              <div className="space-y-6">
                {selectedPackages.map(pkg => (
                  <div key={pkg.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div>
                      <p className="font-black text-white uppercase text-xs">{pkg.name}</p>
                      <button onClick={() => removePackage(pkg.id)} className="text-[8px] text-red-500 uppercase font-black mt-1">Remove</button>
                    </div>
                    <p className="font-black text-white text-base">{formatPrice(pkg.price)}</p>
                  </div>
                ))}
                
                {webMaintenanceService && (
                  <div className="flex justify-between items-center pt-2">
                    <p className="text-[10px] font-black text-orange-400 uppercase">Maintenance</p>
                    <p className="font-black text-white text-xs">{formatPrice(500)}</p>
                  </div>
                )}

                <div className="pt-10 border-t border-white/10 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black mb-2">Total Node Bill</p>
                  <p className="text-5xl font-black text-blue-500 tracking-tighter">{formatPrice(calculateTotal())}</p>
                </div>

                <div className="mt-8">
                  <Link to="/pricing" className="block w-full text-center bg-white/5 border border-white/10 py-4 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-white hover:border-blue-500 transition-all">
                    + Add More Service Button
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
