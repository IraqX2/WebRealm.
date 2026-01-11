
import React from 'react';
import { Package, DemoProject, GalleryItem, LanguageCode } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'premium-business',
    name: 'Starter Business',
    price: 5000,
    category: 'web',
    description: 'Perfect for small businesses and personal brands needing a professional look.',
    highlighted: true,
    features: [
      'Modern & Professional Design',
      'Works perfectly on Mobile & Tablets',
      'Super Fast Loading Speed',
      'Basic Google Search Setup (SEO)',
      'Free Hosting Included (1 Year)',
      'Secure Website (SSL Certificate)',
      'Contact Form for Customers',
      'Social Media Links Integration',
      'Easy to Use & Clean Layout',
      'Support for Setup & Launch'
    ]
  },
  {
    id: 'advanced-brand',
    name: 'Growth Brand',
    price: 8000,
    category: 'web',
    description: 'The best choice for businesses ready to stand out from the competition.',
    highlighted: false,
    features: [
      'Everything in Starter Package',
      'Premium Custom Animations',
      'Advanced Google Ranking Strategy',
      'Higher Security Protection',
      'Customer Database Setup',
      'Google Analytics Integration',
      'Priority WhatsApp Support',
      'Up to 8 Custom Pages',
      'Better Design for More Sales',
      'Custom Icons & Brand Colors'
    ]
  },
  {
    id: 'enterprise-custom',
    name: 'Full Custom Enterprise',
    price: 'custom',
    category: 'web',
    description: 'Complete custom solutions for unique business ideas and large projects.',
    features: [
      'Unlimited Functional Pages',
      'Online Payment System (Bkash/Card)',
      'Special Business Features (Booking, etc.)',
      'Advanced Security System',
      'Dedicated Project Manager',
      'Weekly Progress Updates',
      'Lifetime Technical Support',
      'You Own the Full Source Code',
      'Custom Admin Panel to Manage Data',
      'Maximum Performance & Quality'
    ]
  }
];

export const GRAPHICS_PACKAGES: Package[] = [
  {
    id: 'gfx-business',
    name: 'Business Visuals',
    price: 6500,
    category: 'graphics',
    description: 'Professional social media designs to keep your brand looking active.',
    highlighted: true,
    features: [
      '14 High-Quality Designs Per Month',
      '2 Extra Designs for Special Events',
      'Optimized for Facebook & Instagram',
      'Modern & Premium Look',
      'Designs for Ads & Promotions',
      'New Product Launch Graphics',
      'Unlimited Minor Revisions',
      'Ready-to-Post Files',
      'Consistent Brand Theme'
    ]
  },
  {
    id: 'gfx-premium',
    name: 'Premium Creative Partner',
    price: 'custom',
    category: 'graphics',
    description: 'A permanent designer for your brand to handle all your daily needs.',
    features: [
      'Unlimited Design Requests',
      'Your Own Dedicated Designer',
      'Complete Brand Re-design',
      'Super Fast Delivery (Same Day)',
      'Direct Contact on WhatsApp',
      'All Source Files Included',
      'Strategic Design Consulting',
      'Banners, Flyers & Business Cards',
      'Monthly Brand Improvements'
    ]
  }
];

export const MAINTENANCE_PACKAGE: Package = {
  id: 'maintenance-std',
  name: 'Web Maintenance Service',
  price: 500,
  category: 'maintenance',
  description: 'We take care of the technical stuff so you can focus on your business.',
  features: [
    'Update Text & Images Anytime',
    'Daily Automatic Backups',
    '24/7 Monitoring (Website stays live)',
    'Keep Website Fast & Smooth',
    'Fix Bugs & Technical Errors',
    'Security Updates & Protection',
    'Fast Support Response',
    'Monthly Performance Report'
  ]
};

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: '1',
    title: 'Aira Store',
    description: 'A beautiful online shop built to sell crafts and products easily.',
    images: [
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185932/Screenshot_2025-12-31_185323_kan4gi.png',
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185932/Screenshot_2025-12-31_185211_oflv7z.png',
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185931/Screenshot_2025-12-31_185345_p9iy09.png',
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185932/Screenshot_2025-12-31_185258_xusovn.png'
    ],
    link: 'https://airacraft.pages.dev/',
    tags: ['E-commerce', 'Online Shop']
  },
  {
    id: '2',
    title: 'Beauty Parlour',
    description: 'An elegant website for parlors with built-in service listings.',
    images: [
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185933/Screenshot_2025-12-31_185503_mgcsiw.png',
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185932/Screenshot_2025-12-31_185524_klkce6.png',
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185933/Screenshot_2025-12-31_185610_tcxle1.png',
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185933/Screenshot_2025-12-31_185549_aincxi.png'
    ],
    link: 'https://demo-beauty-salon.pages.dev/',
    tags: ['Beauty', 'Service']
  },
  {
    id: '3',
    title: 'Pro Portfolio',
    description: 'Showcase your work with an elite and modern personal website.',
    images: [
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185933/Screenshot_2025-12-31_185629_eamymn.png',
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185933/Screenshot_2025-12-31_185652_jqs1hi.png'
    ],
    link: 'https://portfolio-247.pages.dev/',
    tags: ['Portfolio', 'Personal']
  },
  {
    id: '4',
    title: 'Business Solution',
    description: 'A clean website for distributing services and booking clients.',
    images: [
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185931/Screenshot_2025-12-31_185410_vgx4s1.png',
      'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185932/Screenshot_2025-12-31_185433_d7utlr.png'
    ],
    link: 'https://demopakage-shop.pages.dev/',
    tags: ['SaaS', 'Business']
  },
  /* 
    50 COMMENTED SLOTS FOR FUTURE WEB PROJECTS:
    05. { id: 'w5', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    06. { id: 'w6', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    07. { id: 'w7', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    08. { id: 'w8', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    09. { id: 'w9', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    10. { id: 'w10', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    11. { id: 'w11', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    12. { id: 'w12', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    13. { id: 'w13', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    14. { id: 'w14', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    15. { id: 'w15', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    16. { id: 'w16', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    17. { id: 'w17', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    18. { id: 'w18', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    19. { id: 'w19', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    20. { id: 'w20', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    21. { id: 'w21', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    22. { id: 'w22', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    23. { id: 'w23', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    24. { id: 'w24', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    25. { id: 'w25', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    26. { id: 'w26', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    27. { id: 'w27', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    28. { id: 'w28', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    29. { id: 'w29', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    30. { id: 'w30', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    31. { id: 'w31', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    32. { id: 'w32', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    33. { id: 'w33', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    34. { id: 'w34', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    35. { id: 'w35', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    36. { id: 'w36', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    37. { id: 'w37', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    38. { id: 'w38', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    39. { id: 'w39', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    40. { id: 'w40', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    41. { id: 'w41', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    42. { id: 'w42', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    43. { id: 'w43', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    44. { id: 'w44', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    45. { id: 'w45', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    46. { id: 'w46', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    47. { id: 'w47', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    48. { id: 'w48', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    49. { id: 'w49', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    50. { id: 'w50', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    51. { id: 'w51', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    52. { id: 'w52', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    53. { id: 'w53', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] },
    54. { id: 'w54', title: 'Future Hub', images: ['...', '...', '...'], link: '...', tags: ['...'] }
  */
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', title: 'Aira Craft Store', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185932/Screenshot_2025-12-31_185323_kan4gi.png', category: 'E-commerce' },
  { id: 'g2', title: 'Pearl Parlour', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185933/Screenshot_2025-12-31_185503_mgcsiw.png', category: 'Landing Page' },
  { id: 'g4', title: 'Package Solutions', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185932/Screenshot_2025-12-31_185433_d7utlr.png', category: 'Business' },
  { id: 'g3', title: 'Elite Portfolio', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767185933/Screenshot_2025-12-31_185629_eamymn.png', category: 'Portfolio' },
];

export const GRAPHICS_GALLERY_ITEMS: GalleryItem[] = [
  { id: 'gfx26', title: 'Future Design', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767192873/Red_tape_lowq_zykrcr.png', category: 'Branding' },
  { id: 'gfx25', title: 'Future Design', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767192728/Blue_and_White_Modern_Fashion_Portfolio_Poster_2_ve3qv2.png', category: 'Branding' },
  { id: 'gfx21', title: 'Product Display', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767188692/2_jjn1xp.png', category: 'Social Media' },
  { id: 'gfx22', title: 'Product Display', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767188691/1_mcmpni.png', category: 'Graphics' },
  { id: 'gfx23', title: 'Product Display', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767188693/4_s9z2gx.png', category: 'Branding' },
  { id: 'gfx27', title: 'Future Design', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767193259/Asus_a15_design_no_window_2_1_1_c548qh.png', category: 'Branding' },
  { id: 'gfx24', title: 'Product Display', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767188692/3_atolvv.png', category: 'Branding' },
  { id: 'gfx1', title: 'Minimalist Tech Branding', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187341/In_a_box_main_m6anzn.png', category: 'Branding' },
  { id: 'gfx2', title: 'E-commerce Sale Visuals', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187343/New_Saree_Collection_2_i4qqlw.jpg', category: 'Social Media' },
  { id: 'gfx3', title: 'Modern Business Flyer', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187346/Copy_of_Brown_and_White_Bold_Grand_Opening_Flyer_1606_x_3780_px_9_c3nvhp.png', category: 'Graphics' },
  { id: 'gfx4', title: 'Abstract Social Campaign', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187344/Leave_Your_4_jbxflm.png', category: 'Social Media' },
  { id: 'gfx5', title: 'Product Launch Card', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187340/New_arrival_ckucbl.png', category: 'Graphics' },
  { id: 'gfx6', title: 'Premium Logo Design', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187342/Dobot_Magician_owprvu.jpg', category: 'Branding' },
  { id: 'gfx7', title: 'Startup Pitch Deck Graphics', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187357/aira_logo_w_star_kcalnq.png', category: 'Branding' },
  { id: 'gfx8', title: 'IG Reel Covers - Luxury', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187374/fq_jijmaa.png', category: 'Social Media' },
  { id: 'gfx9', title: 'Tech Event Poster', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187376/wdwff_ijx4es.png', category: 'Graphics' },
  { id: 'gfx10', title: 'Minimalist Stationery', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187372/Browndfdfsand_Beige_Clean_Minimalist_Product_Packaging_Mockup_Instagram_Post_vn6q1m.png', category: 'Branding' },
  { id: 'gfx11', title: 'Minimalist Tech Branding', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187659/Copy_of_Brown_and_White_Bold_Grand_Opening_Flyer_1606_x_3780_px_4_ea6c4l.png', category: 'Branding' },
  { id: 'gfx12', title: 'E-commerce Sale Visuals', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187655/4_days_remaining_1_vixysh.jpg', category: 'Social Media' },
  { id: 'gfx13', title: 'Modern Business Flyer', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187658/coming_soon_1_spseok.jpg', category: 'Graphics' },
  { id: 'gfx14', title: 'Abstract Social Campaign', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187662/IUB_k1jk7k.jpg', category: 'Social Media' },
  { id: 'gfx15', title: 'Product Launch Card', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187656/4_days_remaining_7_omxr6t.png', category: 'Graphics' },
  { id: 'gfx16', title: 'Premium Logo Design', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187658/BUY_now_evb9j9.png', category: 'Branding' },
  { id: 'gfx17', title: 'Startup Pitch Deck Graphics', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187357/aira_logo_w_star_kcalnq.png', category: 'Branding' },
  { id: 'gfx18', title: 'IG Reel Covers - Luxury', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187374/fq_jijmaa.png', category: 'Social Media' },
  { id: 'gfx19', title: 'Tech Event Poster', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187376/wdwff_ijx4es.png', category: 'Graphics' },
  { id: 'gfx20', title: 'Minimalist Stationery', image: 'https://res.cloudinary.com/dx9efyuos/image/upload/v1767187372/Browndfdfsand_Beige_Clean_Minimalist_Product_Packaging_Mockup_Instagram_Post_vn6q1m.png', category: 'Branding' },
  








  /* 
    50 COMMENTED SLOTS FOR FUTURE GRAPHICS PROJECTS:
    21. 
    22. 
    23. ,
    24. 
    25. 
    26. 
    27. 
    28. { id: 'gfx28', title: 'Future Design', image: '...', category: 'Branding' },
    29. { id: 'gfx29', title: 'Future Design', image: '...', category: 'Branding' },
    30. { id: 'gfx30', title: 'Future Design', image: '...', category: 'Branding' },
    31. { id: 'gfx31', title: 'Future Design', image: '...', category: 'Branding' },
    32. { id: 'gfx32', title: 'Future Design', image: '...', category: 'Branding' },
    33. { id: 'gfx33', title: 'Future Design', image: '...', category: 'Branding' },
    34. { id: 'gfx34', title: 'Future Design', image: '...', category: 'Branding' },
    35. { id: 'gfx35', title: 'Future Design', image: '...', category: 'Branding' },
    36. { id: 'gfx36', title: 'Future Design', image: '...', category: 'Branding' },
    37. { id: 'gfx37', title: 'Future Design', image: '...', category: 'Branding' },
    38. { id: 'gfx38', title: 'Future Design', image: '...', category: 'Branding' },
    39. { id: 'gfx39', title: 'Future Design', image: '...', category: 'Branding' },
    40. { id: 'gfx40', title: 'Future Design', image: '...', category: 'Branding' },
    41. { id: 'gfx41', title: 'Future Design', image: '...', category: 'Branding' },
    42. { id: 'gfx42', title: 'Future Design', image: '...', category: 'Branding' },
    43. { id: 'gfx43', title: 'Future Design', image: '...', category: 'Branding' },
    44. { id: 'gfx44', title: 'Future Design', image: '...', category: 'Branding' },
    45. { id: 'gfx45', title: 'Future Design', image: '...', category: 'Branding' },
    46. { id: 'gfx46', title: 'Future Design', image: '...', category: 'Branding' },
    47. { id: 'gfx47', title: 'Future Design', image: '...', category: 'Branding' },
    48. { id: 'gfx48', title: 'Future Design', image: '...', category: 'Branding' },
    49. { id: 'gfx49', title: 'Future Design', image: '...', category: 'Branding' },
    50. { id: 'gfx50', title: 'Future Design', image: '...', category: 'Branding' },
    51. { id: 'gfx51', title: 'Future Design', image: '...', category: 'Branding' },
    52. { id: 'gfx52', title: 'Future Design', image: '...', category: 'Branding' },
    53. { id: 'gfx53', title: 'Future Design', image: '...', category: 'Branding' },
    54. { id: 'gfx54', title: 'Future Design', image: '...', category: 'Branding' },
    55. { id: 'gfx55', title: 'Future Design', image: '...', category: 'Branding' },
    56. { id: 'gfx56', title: 'Future Design', image: '...', category: 'Branding' },
    57. { id: 'gfx57', title: 'Future Design', image: '...', category: 'Branding' },
    58. { id: 'gfx58', title: 'Future Design', image: '...', category: 'Branding' },
    59. { id: 'gfx59', title: 'Future Design', image: '...', category: 'Branding' },
    60. { id: 'gfx60', title: 'Future Design', image: '...', category: 'Branding' },
    61. { id: 'gfx61', title: 'Future Design', image: '...', category: 'Branding' },
    62. { id: 'gfx62', title: 'Future Design', image: '...', category: 'Branding' },
    63. { id: 'gfx63', title: 'Future Design', image: '...', category: 'Branding' },
    64. { id: 'gfx64', title: 'Future Design', image: '...', category: 'Branding' },
    65. { id: 'gfx65', title: 'Future Design', image: '...', category: 'Branding' },
    66. { id: 'gfx66', title: 'Future Design', image: '...', category: 'Branding' },
    67. { id: 'gfx67', title: 'Future Design', image: '...', category: 'Branding' },
    68. { id: 'gfx68', title: 'Future Design', image: '...', category: 'Branding' },
    69. { id: 'gfx69', title: 'Future Design', image: '...', category: 'Branding' },
    70. { id: 'gfx70', title: 'Future Design', image: '...', category: 'Branding' }
  */
];

export const TRANSLATIONS: Record<LanguageCode, any> = {
  EN: {
    heroSub: "Need a website? We build fast, beautiful, and easy-to-use websites for your business. No templates—just custom code that helps you grow and beat your competition.",
    visualShowcaseSub: "Take a look at the high-quality websites we have built for our clients.",
    impactSub: "We don't just make pages; we build tools that help you sell more. Our websites are built from scratch to be the fastest in your industry.",
    maintenanceSub: "We take care of your website so you don't have to. We handle security, speed, and updates while you focus on your business.",
    successSub: "Check out some of our best work for brands just like yours.",
    footerSub: "WebRealm is a professional web studio. we build custom websites that are fast, secure, and designed to help you succeed online.",
    pricingSub: "Choose a package that fits your business goals and budget.",
    orderPathSub: "A simple 4-step process from your first idea to a live website.",
    step1: "Pick the package that best fits your business needs.",
    step2: "Send us the details of what you want your website to do.",
    step3: "Make a secure payment to confirm your order and start the work.",
    step4: "We build and launch your professional website for the world to see.",
    nav: { home: 'Home', work: 'Web Work', graphics: 'Graphics Work', pricing: 'Pricing', order: 'Order Now', btn: 'Get a Website' }
  },
  BN: {
    heroSub: "আপনার কি একটি ওয়েবসাইট প্রয়োজন? আমরা আপনার ব্যবসার জন্য দ্রুত এবং সুন্দর কাস্টম ওয়েবসাইট তৈরি করি। কোনো টেমপ্লেট নয়—সম্পূর্ণ নতুন কোড দিয়ে তৈরি যা আপনার ব্যবসাকে এগিয়ে নিয়ে যাবে।",
    visualShowcaseSub: "আমাদের তৈরি করা প্রিমিয়াম ওয়েবসাইটগুলোর ডিজাইন দেখুন।",
    impactSub: "আমরা শুধু ওয়েব পেজ বানাই না, আমরা আপনার ব্যবসার প্রসারের জন্য শক্তিশালী টুল তৈরি করি। আমাদের ওয়েবসাইটগুলো অত্যন্ত দ্রুত এবং নিরাপদ।",
    maintenanceSub: "আপনার ওয়েবসাইটের সব টেকনিক্যাল বিষয় আমরা সামলাবো। সিকিউরিটি থেকে আপডেট—সব দায়িত্ব আমাদের, আপনি শুধু আপনার ব্যবসায় মন দিন।",
    successSub: "আমাদের আগের কাজগুলো দেখুন যা গ্রাহকদের ব্যবসা বদলে দিয়েছে।",
    footerSub: "WebRealm একটি প্রফেশনাল ওয়েব স্টুডিও। আমরা আপনার ব্যবসার জন্য সেরা কাস্টম ওয়েবসাইট তৈরি করি।",
    pricingSub: "আপনার ব্যবসার লক্ষ্য এবং বাজেট অনুযায়ী একটি প্যাকেজ বেছে নিন।",
    orderPathSub: "আপনার আইডিয়া থেকে লাইভ ওয়েবসাইট পর্যন্ত ৪টি সহজ ধাপ।",
    step1: "আপনার ব্যবসার জন্য সঠিক প্যাকেজটি বেছে নিন।",
    step2: "আপনার ওয়েবসাইট কেমন হবে তার বিস্তারিত আমাদের জানান।",
    step3: "আপনার অর্ডার নিশ্চিত করতে পেমেন্ট করুন এবং কাজ শুরু করুন।",
    step4: "আমরা আপনার ওয়েবসাইটটি তৈরি করে ইন্টারনেটে লাইভ করে দেবো।",
    nav: { home: 'হোম', work: 'ওয়েব কাজ', graphics: 'গ্রাফিক্স কাজ', pricing: 'দাম', order: 'অর্ডার', btn: 'ওয়েবসাইট নিন' }
  },
  ZH: {
    heroSub: "需要网站吗？我们为您打造快速、美观且易于使用的网站。拒绝模板——纯手工代码助您超越竞争对手。",
    visualShowcaseSub: "看看我们为客户打造的高质量网站。",
    impactSub: "我们不只是制作网页；我们构建助您提升销量的工具。我们的网站从零开始构建，拥有行业领先的速度。",
    maintenanceSub: "我们负责维护您的网站，让您无后顾忧。我们处理安全、速度和更新，您只需专注于业务。",
    successSub: "查看我们为像您这样的品牌提供的一些最佳案例。",
    footerSub: "WebRealm 是专业的网页工作室。我们打造快速、安全且旨在助您成功的定制网站。",
    pricingSub: "选择适合您业务目标和预算的方案。",
    orderPathSub: "从您的初衷到网站上线，只需简单的 4 个步骤。",
    step1: "选择最适合您业务需求的方案。",
    step2: "向我们发送您希望网站实现的功能细节。",
    step3: "进行安全支付以确认订单并开始工作。",
    step4: "我们构建并发布您的专业网站，让世界看见。",
    nav: { home: '首页', work: '网页作品', graphics: '平面设计作品', pricing: '价格', order: '立即订购', btn: '获取网站' }
  },
  ES: {
    heroSub: "¿Necesitas un sitio web? Creamos sitios rápidos, hermosos y fáciles de usar. Sin plantillas: solo código personalizado para vencer a tu competencia.",
    visualShowcaseSub: "Echa un vistazo a los sitios web de alta calidad que hemos creado.",
    impactSub: "No solo hacemos páginas; creamos herramientas que te ayudan a vender más. Nuestros sitios son los más rápidos de tu industria.",
    maintenanceSub: "Nosotros cuidamos tu sitio para que tú no tengas que hacerlo. Maneجamos seguridad, velocidad y actualizaciones.",
    successSub: "Mira algunos de nuestros mejores trabajos para marcas como la tuya.",
    footerSub: "WebRealm es un estudio web profesional. Creamos sitios personalizados rápidos y seguros para tu éxito.",
    pricingSub: "Elige un paquete que se ajuste a tus objetivos y presupuesto.",
    orderPathSub: "Un proceso simple de 4 pasos desde tu idea hasta el sitio en vivo.",
    step1: "Elige el paquete que mejor se adapte a tus necesidades.",
    step2: "Envíanos los detalles de lo que quieres que haga tu sitio.",
    step3: "Realiza un pago seguro para confirmar tu pedido.",
    step4: "Construimos y lanzamos tu sitio profesional al mundo.",
    nav: { home: 'Inicio', work: 'Web', graphics: 'Diseño Gráfico', pricing: 'Precios', order: 'Pedir Ahora', btn: 'Obtener Web' }
  },
  FR: {
    heroSub: "Besoin d'un site web ? Nous créons des sites rapides, beaux et faciles à utiliser. Pas de templates — juste du code sur mesure pour dépasser vos concurrents.",
    visualShowcaseSub: "Découvrez les sites web de haute qualité que nous avons conçus.",
    impactSub: "Nous ne créons pas seulement des pages ; nous créons des outils pour vendre plus. Nos sites sont les plus rapides de votre secteur.",
    maintenanceSub: "Nous entretenons votre site pour vous. Nous gérons la sécurité, la vitesse et les mises à jour.",
    successSub: "Découvrez nos meilleures réalisations pour des marques comme la vôtre.",
    footerSub: "WebRealm est un studio web professionnel. Nous créons des sites sur mesure rapides et sécurisés pour votre réussite.",
    pricingSub: "Choisissez un forfait adapté à vos objectifs et à votre budget.",
    orderPathSub: "Un processus simple en 4 étapes de l'idée à la mise en ligne.",
    step1: "Choisissez le forfait qui correspond le mieux à vos besoins.",
    step2: "Envoyez-nous les détails des fonctionnalités souhaitées.",
    step3: "Effectuez un paiement sécurisé pour confirmer votre commande.",
    step4: "Nous construisons et lançons votre site professionnel.",
    nav: { home: 'Accueil', work: 'Web', graphics: 'Design Graphique', pricing: 'Tarifs', order: 'Commander', btn: 'Créer un Site' }
  },
  AR: {
    heroSub: "هل تحتاج إلى موقع إلكتروني؟ نصمم مواقع سريعة وجميلة وسهلة الاستخدام لعملك. لا قوالب - فقط كود مخصص يساعدك على التفوق.",
    visualShowcaseSub: "ألقِ نظرة على المواقع عالية الجودة التي بنيناها لعملائنا.",
    impactSub: "نحن لا نصنع صفحات فقط؛ نحن نبني أدوات تساعدك على البيع أكثر. مواقعنا هي الأسرع في مجالك.",
    maintenanceSub: "نحن نعتني بموقعك حتى لا تضطر لذلك. نتولى الأمان والسرعة والتحديثات.",
    successSub: "شاهد بعضاً من أفضل أعمالنا لعلامات تجارية مثل علامتك.",
    footerSub: "ويب ريلم هو استوديو ويب احترافي. نبني مواقع مخصصة وسريعة وآمنة لنجاحك.",
    pricingSub: "اختر الباقة التي تناسب أهداف عملك وميزانيتك.",
    orderPathSub: "عملية بسيطة من 4 خطوات من فكرتك الأولى حتى انطلاق الموقع.",
    step1: "اختر الباقة التي تناسب احتياجات عملك.",
    step2: "أرسل لنا تفاصيل ما تريد أن يفعله موقعك.",
    step3: "قم بدفع آمن لتأكيد طلبك وبدء العمل.",
    step4: "نقوم ببناء وإطلاق موقعك الاحترافي ليراه العالم.",
    nav: { home: 'الرئيسية', work: 'الويب', graphics: 'تصاميم الجرافيك', pricing: 'الأسعار', order: 'اطلب الآن', btn: 'احصل على موقع' }
  }
};
