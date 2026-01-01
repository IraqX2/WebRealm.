
export type LanguageCode = 'EN' | 'BN' | 'ZH' | 'ES' | 'AR' | 'FR';

export interface Package {
  id: string;
  name: string;
  price: number | 'custom';
  features: string[];
  description: string;
  highlighted?: boolean;
  category: 'web' | 'graphics' | 'maintenance';
}

export interface DemoProject {
  id: string;
  title: string;
  description: string;
  images: string[];
  link: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: 'Business' | 'Portfolio' | 'E-commerce' | 'Landing Page' | 'Graphics' | 'Social Media' | 'Branding';
}

export interface CartState {
  selectedPackages: Package[];
  webMaintenanceService: boolean;
  domainPrice: number;
  language: LanguageCode;
}
