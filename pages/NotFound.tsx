
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-9xl font-black text-blue-600 mb-8 tracking-tighter">404</h1>
        <h2 className="text-3xl font-black mb-6 uppercase tracking-widest">Protocol Interrupted</h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          The coordinate you requested does not exist on our global edge network. 
          The path might have been redirected or the asset has been moved.
        </p>
        <Link 
          to="/" 
          className="bg-blue-600 px-10 py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-blue-700 transition-all shadow-2xl"
        >
          Return to Hub
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
