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

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setCopyStatus(prev => ({ ...prev, [id]: false })), 2000);
  };

  /** ✅ LET NETLIFY SUBMIT THE FORM */
  const handleSubmit = () => {
    setSubmitted(true);
  };

  const allServiceNames = [
    ...selectedPackages.map(p => p.name),
    webMaintenanceService ? 'Web Maintenance Service' : null
  ].filter(Boolean).join(', ');

  if (submitted) {
    return (
      <div className="py-40 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 p-16 rounded-[4rem] border border-blue-500/20 shadow-3xl"
        >
          <div className="w-24 h-24 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-10">✓</div>
          <h1 className="text-5xl font-black mb-8 uppercase italic tracking-tighter text-white">
            Order Received!
          </h1>
          <p className="text-slate-400 mb-12 font-medium leading-relaxed max-w-lg mx-auto">
            We got your details. Our team will contact you via WhatsApp or Email within 24 hours.
          </p>
          <button
            onClick={() => { resetCart(); setSubmitted(false); }}
            className="bg-blue-600 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-white"
          >
            Return to Shop
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white mb-16">
          Checkout Order
        </h1>

        <form
          name="webrealm-order"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* REQUIRED FOR NETLIFY */}
          <input type="hidden" name="form-name" value="webrealm-order" />
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="services" value={allServiceNames} />
          <input type="hidden" name="total-price" value={calculateTotal()} />
          <input type="hidden" name="personal-domain" value={hasPersonalDomain ? personalDomainName : 'No domain'} />

          {/* CONTACT INFO */}
          <input required name="full-name" placeholder="Full Name" />
          <input name="email" placeholder="Email" />
          <input name="phone" placeholder="Phone / WhatsApp" />
          <textarea required name="details" placeholder="Project details..." />

          {webMaintenanceService && (
            <input
              name="target-site"
              value={existingWebsite}
              onChange={(e) => setExistingWebsite(e.target.value)}
              placeholder="Website (optional)"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 py-6 rounded-2xl font-black text-lg uppercase text-white"
          >
            Confirm & Start Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
