
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider, useCart } from './context/CartContext';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import GraphicsGallery from './pages/GraphicsGallery';
import Pricing from './pages/Pricing';
import Order from './pages/Order';
import Clients from './pages/Clients';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen pt-20"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const Layout: React.FC = () => {
  const { language } = useCart();
  const isRTL = language === 'AR';
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="flex-grow">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/graphics-showcase" element={<GraphicsGallery />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/order" element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Layout />
      </Router>
    </CartProvider>
  );
};

export default App;
