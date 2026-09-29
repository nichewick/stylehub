import { Product, Coupon, Review } from '../types';

import heroFashionImg from '../assets/images/hero_fashion_editorial_1790687408151.jpg';
import catMenImg from '../assets/images/cat_men_fashion_1790687431894.jpg';
import catWomenImg from '../assets/images/cat_women_fashion_1790687446829.jpg';
import campaignStreetImg from '../assets/images/campaign_street_drop_1790687475239.jpg';

export const ASSET_IMAGES = {
  hero: heroFashionImg,
  catMen: catMenImg,
  catWomen: catWomenImg,
  campaignStreet: campaignStreetImg,
};

export const PRODUCTS: Product[] = [
  // --- MEN ---
  {
    id: 'sh-m-01',
    name: 'Essential Oversized Tee',
    slug: 'essential-oversized-tee',
    category: 'Tees',
    gender: 'men',
    price: 799,
    mrp: 1099,
    discount: 27,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Chalk White', hex: '#F7F5F1' },
      { name: 'Warm Beige', hex: '#D8CEBE' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    rating: 4.8,
    reviewCount: 124,
    stock: 45,
    featured: true,
    newArrival: true,
    bestSeller: true,
    tags: ['Best Seller', 'Oversized', 'Heavyweight'],
    description: 'Constructed from combed 240 GSM organic loopknit cotton. Cut in an architectural drop-shoulder silhouette that drapes cleanly with zero cling.',
    fabric: '100% Combed Compact Cotton',
    gsm: '240 GSM Heavyweight Jersey',
    fit: 'Relaxed Drop Shoulder Oversized Fit',
    care: [
      'Machine wash cold with like colors inside out',
      'Do not bleach or tumble dry',
      'Warm iron on reverse side',
      'Dry in shade to preserve deep tone'
    ]
  },
  {
    id: 'sh-m-02',
    name: 'Premium Cotton Hoodie',
    slug: 'premium-cotton-hoodie',
    category: 'Hoodies',
    gender: 'men',
    price: 1499,
    mrp: 2199,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#262626' },
      { name: 'Oatmeal Heather', hex: '#E2DDD4' },
      { name: 'Olive Drab', hex: '#3E4237' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 98,
    stock: 28,
    featured: true,
    newArrival: false,
    bestSeller: true,
    tags: ['Winter Essential', 'Fleece Lined', 'Brushed'],
    description: 'Substantial 380 GSM brushed French Terry hoodie engineered for chilly Delhi mornings and cool Bengaluru evenings. Double-layered crossover hood without flimsy drawstrings.',
    fabric: '100% Brushed French Terry Cotton',
    gsm: '380 GSM',
    fit: 'Boxy Silhouette, Ribbed Trims',
    care: [
      'Machine wash cold gentle cycle',
      'Flat dry in shade to maintain structure',
      'Do not wring or tumble dry'
    ]
  },
  {
    id: 'sh-m-03',
    name: 'Relaxed Fit Shirt',
    slug: 'relaxed-fit-shirt',
    category: 'Shirts',
    gender: 'men',
    price: 1299,
    mrp: 1899,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Raw Ecru', hex: '#ECE7DD' },
      { name: 'Midnight Navy', hex: '#1C2434' },
      { name: 'Sage Linen', hex: '#879282' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviewCount: 64,
    stock: 32,
    featured: true,
    newArrival: true,
    bestSeller: false,
    tags: ['Linen Blend', 'Breathable', 'Resort Collar'],
    description: 'A breezy cotton-linen cuban collar shirt designed for hot and humid Indian summers. Natural slub texture with real coconut shell buttons.',
    fabric: '60% Linen, 40% Organic Long-Staple Cotton',
    gsm: '160 GSM Slub Weave',
    fit: 'Camp Collar Relaxed Boxy Fit',
    care: [
      'Hand wash or machine wash gentle',
      'Hang dry on broad hanger',
      'Steam iron while slightly damp'
    ]
  },
  {
    id: 'sh-m-04',
    name: 'Urban Cargo Pants',
    slug: 'urban-cargo-pants',
    category: 'Trousers',
    gender: 'men',
    price: 1799,
    mrp: 2599,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Stone Khaki', hex: '#9E9482' },
      { name: 'Matte Black', hex: '#18181B' },
      { name: 'Rifle Green', hex: '#3B4036' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewCount: 86,
    stock: 22,
    featured: true,
    newArrival: false,
    bestSeller: true,
    tags: ['Utility', 'Tactical', '6-Pocket'],
    description: 'Heavy duty stretch cotton twill cargos with 3D gusseted utility pockets, elasticated waist with internal woven drawcord, and toggle adjustable cuffs.',
    fabric: '98% Cotton Twill, 2% Elastane',
    gsm: '280 GSM Structured Twill',
    fit: 'Tapered Cargo Fit with Articulated Knees',
    care: [
      'Machine wash cold with zippered closures fastened',
      'Do not tumble dry',
      'Iron at medium heat'
    ]
  },
  {
    id: 'sh-m-05',
    name: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    category: 'Jackets',
    gender: 'men',
    price: 2499,
    mrp: 3499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Vintage Indigo', hex: '#31445D' },
      { name: 'Washed Black', hex: '#2B2B2B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 42,
    stock: 16,
    featured: false,
    newArrival: true,
    bestSeller: false,
    tags: ['Raw Selvage Feel', 'Custom Brass Hardware', 'Unlined'],
    description: '14.5 oz rigid Indian ring-spun denim jacket treated with low-impact eco enzyme wash. Detailed with antique brass buttons and internal welt passport pockets.',
    fabric: '100% Selvedge Character Cotton Denim',
    gsm: '14.5 oz Denim',
    fit: 'Standard Boxy Trucker Cut',
    care: [
      'Spot clean when possible',
      'Cold wash inside out sparingly',
      'Hang dry only'
    ]
  },
  {
    id: 'sh-m-06',
    name: 'Everyday Cotton Tee',
    slug: 'everyday-cotton-tee',
    category: 'Tees',
    gender: 'men',
    price: 599,
    mrp: 899,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Chalk White', hex: '#FFFFFF' },
      { name: 'Pitch Black', hex: '#0F0F0F' },
      { name: 'Heather Grey', hex: '#BCB8B1' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviewCount: 154,
    stock: 75,
    featured: false,
    newArrival: false,
    bestSeller: true,
    tags: ['Daily Basic', 'Single Jersey', 'Anti-Pilling'],
    description: 'Our foundational crewneck t-shirt. Crafted from lightweight 180 GSM bio-washed cotton with reinforced neck ribbing that never barrows or loses shape.',
    fabric: '100% Bio-Washed Combed Cotton',
    gsm: '180 GSM',
    fit: 'Regular Tailored Fit',
    care: [
      'Regular machine wash warm',
      'Tumble dry low or line dry'
    ]
  },

  // --- WOMEN ---
  {
    id: 'sh-w-01',
    name: 'Oversized Everyday Tee',
    slug: 'womens-oversized-everyday-tee',
    category: 'Tees',
    gender: 'women',
    price: 899,
    mrp: 1299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Cloud White', hex: '#F8F8F8' },
      { name: 'Mocha Taupe', hex: '#8C7A6B' },
      { name: 'Deep Coal', hex: '#1D1D1D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 112,
    stock: 50,
    featured: true,
    newArrival: true,
    bestSeller: true,
    tags: ['Drop Shoulder', 'Ultra Soft', 'Pre-Shrunk'],
    description: 'Designed for effortless everyday draping. Features an elongated sleeve and relaxed boxy torso that pairs seamlessly over bike shorts or tucked into wide trousers.',
    fabric: '100% Organic Ring-Spun Cotton',
    gsm: '220 GSM Ultra-Soft Jersey',
    fit: 'Oversized Boyfriend Silhouette',
    care: [
      'Gentle machine wash cold',
      'Do not wring',
      'Reshape while wet and dry flat'
    ]
  },
  {
    id: 'sh-w-02',
    name: 'Relaxed Shirt',
    slug: 'womens-relaxed-shirt',
    category: 'Shirts',
    gender: 'women',
    price: 1399,
    mrp: 1999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Crisp Porcelain', hex: '#FAFAFA' },
      { name: 'Butter Sand', hex: '#EAE1CE' },
      { name: 'Pinstripe Blue', hex: '#4B6584' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 78,
    stock: 35,
    featured: true,
    newArrival: false,
    bestSeller: true,
    tags: ['Poplin', 'Editorial', 'Curved Hem'],
    description: 'High thread count cotton poplin button-down with dropped shoulder seams and an elongated rear hem. Architectural minimalism at its purest.',
    fabric: '100% Long-Staple Cotton Poplin',
    gsm: '145 GSM Crisp Finish',
    fit: 'Relaxed Fluid Fit',
    care: [
      'Gentle cold wash',
      'Warm iron with light steam',
      'Dry on wooden hanger'
    ]
  },
  {
    id: 'sh-w-03',
    name: 'Minimal Co-ord Set',
    slug: 'minimal-co-ord-set',
    category: 'Co-ords',
    gender: 'women',
    price: 1799,
    mrp: 2699,
    discount: 33,
    images: [
      catWomenImg,
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Warm Almond', hex: '#DECBB7' },
      { name: 'Terracotta Ash', hex: '#A37061' },
      { name: 'Black Sesame', hex: '#222222' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 88,
    stock: 19,
    featured: true,
    newArrival: true,
    bestSeller: true,
    tags: ['Two-Piece', 'Travel Essential', 'Linen Texture'],
    description: 'A matching 2-piece set featuring a cropped relaxed top and high-waisted elasticated trousers. Breathable, anti-wrinkle blend curated for effortless airport or weekend style.',
    fabric: '70% Viscose Linen, 30% Cotton',
    gsm: '210 GSM Structured Weave',
    fit: 'Coordinated Relaxed Silhouette',
    care: [
      'Hand wash cold or gentle machine cycle in mesh bag',
      'Dry flat in shade'
    ]
  },
  {
    id: 'sh-w-04',
    name: 'Everyday Dress',
    slug: 'everyday-dress',
    category: 'Dresses',
    gender: 'women',
    price: 1499,
    mrp: 2199,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Deep Olive', hex: '#3E4237' },
      { name: 'Midnight Charcoal', hex: '#1F1F1F' },
      { name: 'Terracotta', hex: '#9E5B4A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 54,
    stock: 24,
    featured: false,
    newArrival: true,
    bestSeller: false,
    tags: ['Side Slits', 'Tiered Draping', 'Pockets'],
    description: 'Mid-calf tiered midi dress with subtle side pockets and a soft flattering neckline. Designed for all-day ease from day meetings to dinners.',
    fabric: '100% Tencel Modal Blend',
    gsm: '190 GSM Silky Handfeel',
    fit: 'Fluid A-Line Fit with Deep Pockets',
    care: [
      'Cold gentle wash inside out',
      'Line dry in shade',
      'Cool iron if needed'
    ]
  },
  {
    id: 'sh-w-05',
    name: 'Wide Leg Trousers',
    slug: 'wide-leg-trousers',
    category: 'Trousers',
    gender: 'women',
    price: 1599,
    mrp: 2299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Castlerock Grey', hex: '#58595B' },
      { name: 'Oatmeal', hex: '#DDD6C6' },
      { name: 'Carbon Black', hex: '#141414' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 92,
    stock: 30,
    featured: true,
    newArrival: false,
    bestSeller: true,
    tags: ['High Rise', 'Front Pleats', 'Tailored'],
    description: 'High-waisted tailored trousers featuring double inverted pleats and a puddle-break wide hem. Cut from wrinkle-resistant poly-viscose gabardine.',
    fabric: '65% Polyester, 33% Rayon, 2% Spandex',
    gsm: '270 GSM Suiting Gabardine',
    fit: 'High-Rise Relaxed Wide-Leg Cut',
    care: [
      'Machine wash gentle cold',
      'Hang dry on trouser bar',
      'Iron with press cloth'
    ]
  },
  {
    id: 'sh-w-06',
    name: 'Oversized Denim Jacket',
    slug: 'womens-oversized-denim-jacket',
    category: 'Jackets',
    gender: 'women',
    price: 2299,
    mrp: 3199,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Faded Sky', hex: '#6D8299' },
      { name: 'Raw Bleach', hex: '#D6DEE5' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewCount: 61,
    stock: 15,
    featured: false,
    newArrival: true,
    bestSeller: false,
    tags: ['Dropped Shoulders', 'Heavy Wash', 'Silver Shank Buttons'],
    description: 'Intentionally exaggerated proportions inspired by 90s heritage denim. Dropped shoulders, wide armholes, and custom matte silver hardware.',
    fabric: '100% Rigid Heavy Cotton Denim',
    gsm: '13.5 oz Denim',
    fit: 'Slouchy Oversized Silhouette',
    care: [
      'Turn inside out before wash',
      'Wash cold sparingly',
      'Hang dry in shade'
    ]
  },

  // --- UNISEX / STREETWEAR SPECIAL DROPS ---
  {
    id: 'sh-u-01',
    name: 'Graphic Heavyweight Drop Shoulder Tee',
    slug: 'graphic-heavyweight-tee',
    category: 'Streetwear',
    gender: 'unisex',
    price: 999,
    mrp: 1499,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#101010' },
      { name: 'Vintage Ecru', hex: '#ECE8DF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 142,
    stock: 60,
    featured: true,
    newArrival: true,
    bestSeller: true,
    tags: ['Limited Drop', 'Screen Printed', '260 GSM'],
    description: 'Featuring bespoke minimal typography inspired by modern Indian brutalist architecture. Hand screen-printed with crack-resistant discharge ink on heavy 260 GSM combed cotton.',
    fabric: '100% Combed Heavy Cotton',
    gsm: '260 GSM',
    fit: 'Boxy Heavyweight Streetwear Fit',
    care: [
      'Inside out cold wash',
      'Never iron directly on print',
      'Line dry flat'
    ]
  },
  {
    id: 'sh-u-02',
    name: 'Minimalist Boxy Workwear Overshirt',
    slug: 'boxy-workwear-overshirt',
    category: 'Shirts',
    gender: 'unisex',
    price: 1899,
    mrp: 2699,
    discount: 29,
    images: [
      catMenImg,
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Dark Slate', hex: '#2C3539' },
      { name: 'Sand Taupe', hex: '#C2B6A2' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 38,
    stock: 20,
    featured: true,
    newArrival: true,
    bestSeller: false,
    tags: ['Heavy Twill', 'Layering Piece', 'Chunky Buttons'],
    description: 'Heavy 320 GSM cotton drill overshirt with square patch chest pockets and straight hem. The ultimate transitional layer over plain tees.',
    fabric: '100% Heavyweight Cotton Drill',
    gsm: '320 GSM',
    fit: 'Square Boxy Overshirt Fit',
    care: [
      'Cold wash gentle',
      'Hang dry on wide hanger'
    ]
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    description: '10% OFF on your first Style Hub order',
    discountType: 'percentage',
    value: 10,
    minOrder: 499
  },
  {
    code: 'STYLE20',
    description: 'Flat ₹200 OFF on orders above ₹1,999',
    discountType: 'fixed',
    value: 200,
    minOrder: 1999
  },
  {
    code: 'FESTIVE300',
    description: 'Flat ₹300 OFF on orders above ₹2,499',
    discountType: 'fixed',
    value: 300,
    minOrder: 2499
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Aarav Sharma',
    city: 'Delhi',
    rating: 5,
    date: '3 days ago',
    comment: 'Perfect fit and the quality is honestly better than I expected. The fabric weight on the 240 GSM tee is substantial and doesn’t cling in humid heat.',
    verifiedBuyer: true
  },
  {
    id: 'rev-02',
    author: 'Riya Sen',
    city: 'Mumbai',
    rating: 5,
    date: '1 week ago',
    comment: 'Minimal, comfortable and looks exactly like the campaign photos. The co-ord set has become my go-to for Bandra cafes and studio meetings.',
    verifiedBuyer: true
  },
  {
    id: 'rev-03',
    author: 'Kabir Verma',
    city: 'Bengaluru',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Loved the oversized silhouette on the hoodie. Got delivery in Indiranagar in just 2 days. Will definitely be ordering the denim jacket next.',
    verifiedBuyer: true
  },
  {
    id: 'rev-04',
    author: 'Ananya Iyer',
    city: 'Chennai',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The wide leg trousers drape like high-end designer pieces. Truly proud to see an Indian fashion brand prioritize fabric construction and subtle cuts.',
    verifiedBuyer: true
  }
];

export const INDIAN_STATES_AND_UTS = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export const PIN_CODE_DATABASE: Record<string, { city: string; state: string; codAvailable: boolean }> = {
  '110001': { city: 'New Delhi', state: 'Delhi', codAvailable: true },
  '110016': { city: 'South Delhi', state: 'Delhi', codAvailable: true },
  '110020': { city: 'Okhla', state: 'Delhi', codAvailable: true },
  '122001': { city: 'Gurugram', state: 'Haryana', codAvailable: true },
  '122002': { city: 'Gurugram', state: 'Haryana', codAvailable: true },
  '201301': { city: 'Noida', state: 'Uttar Pradesh', codAvailable: true },
  '400001': { city: 'Mumbai', state: 'Maharashtra', codAvailable: true },
  '400050': { city: 'Bandra, Mumbai', state: 'Maharashtra', codAvailable: true },
  '411001': { city: 'Pune', state: 'Maharashtra', codAvailable: true },
  '560001': { city: 'Bengaluru', state: 'Karnataka', codAvailable: true },
  '560038': { city: 'Indiranagar, Bengaluru', state: 'Karnataka', codAvailable: true },
  '500001': { city: 'Hyderabad', state: 'Telangana', codAvailable: true },
  '500081': { city: 'Hitec City, Hyderabad', state: 'Telangana', codAvailable: true },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', codAvailable: true },
  '700001': { city: 'Kolkata', state: 'West Bengal', codAvailable: true },
  '302001': { city: 'Jaipur', state: 'Rajasthan', codAvailable: true },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', codAvailable: true },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', codAvailable: true },
  '160017': { city: 'Chandigarh', state: 'Chandigarh', codAvailable: true }
};
