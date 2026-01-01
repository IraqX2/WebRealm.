
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Package, CartState, LanguageCode } from '../types';

interface CartContextType extends CartState {
  addPackage: (pkg: Package) => void;
  removePackage: (pkgId: string) => void;
  setWebMaintenanceService: (val: boolean) => void;
  setDomainPrice: (price: number) => void;
  calculateTotal: () => number;
  formatPrice: (price: number | 'custom') => string;
  resetCart: () => void;
  setLanguage: (lang: LanguageCode) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);
  const [webMaintenanceService, setWebMaintenanceService] = useState(false);
  const [domainPrice, setDomainPriceState] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>('EN');

  const BDT_TO_USD = 118; // Simple conversion rate

  const addPackage = (pkg: Package) => {
    if (!selectedPackages.find(p => p.id === pkg.id)) {
      setSelectedPackages(prev => [...prev, pkg]);
    }
  };

  const removePackage = (pkgId: string) => {
    setSelectedPackages(prev => prev.filter(p => p.id !== pkgId));
  };

  const setDomainPrice = (price: number) => setDomainPriceState(price);

  const calculateTotal = () => {
    let total = 0;
    
    // Add all package prices
    selectedPackages.forEach(pkg => {
      if (typeof pkg.price === 'number') {
        total += pkg.price;
      }
    });

    if (webMaintenanceService) total += 500;
    total += domainPrice;
    
    return total;
  };

  const formatPrice = (price: number | 'custom') => {
    if (price === 'custom') return 'Custom';
    
    // Reinforced Logic: EN and BN stay in Taka, ALL others in Dollar
    const isLocal = language === 'EN' || language === 'BN';
    
    if (isLocal) {
      return `৳${price.toLocaleString()}`;
    } else {
      const dollarPrice = Math.round(price / BDT_TO_USD);
      // Ensure at least $1 if price is > 0 but conversion is < 1
      const finalDollar = dollarPrice === 0 && price > 0 ? 1 : dollarPrice;
      return `$${finalDollar.toLocaleString()}`;
    }
  };

  const resetCart = () => {
    setSelectedPackages([]);
    setWebMaintenanceService(false);
    setDomainPriceState(0);
  };

  return (
    <CartContext.Provider value={{ 
      selectedPackages, 
      webMaintenanceService, 
      domainPrice, 
      language,
      addPackage, 
      removePackage,
      setWebMaintenanceService,
      setDomainPrice,
      calculateTotal,
      formatPrice,
      resetCart,
      setLanguage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
