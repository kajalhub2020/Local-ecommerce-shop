export interface Shop {
  id: string;
  name: string;
  slug: string;
  owner: string;
  category: string;
  email: string;
  phone: string;
  plan: 'Starter' | 'Growth' | 'Business';
  registrationDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  storeUrl: string;
  revenue: number;
  ordersCount: number;
  productsCount: number;
  rating: number;
  logo: string;
  city: string;
}

export const initialShops: Shop[] = [
  {
    id: 'shop-001',
    name: 'Urban Style Fashion',
    slug: 'urban-style-fashion',
    owner: 'Vikram Sengupta',
    category: 'Fashion & Apparel',
    email: 'admin@urbanstyle.com',
    phone: '+91 98200 12345',
    plan: 'Growth',
    registrationDate: '2026-03-15',
    status: 'Active',
    storeUrl: 'https://urbanstyle.localstore.io',
    revenue: 482600,
    ordersCount: 312,
    productsCount: 22,
    rating: 4.8,
    logo: 'US',
    city: 'Mumbai',
  },
  {
    id: 'shop-002',
    name: 'Bella Casa Home Decor',
    slug: 'bella-casa',
    owner: 'Radhika Deshmukh',
    category: 'Home & Living',
    email: 'contact@bellacasa.in',
    phone: '+91 98450 67890',
    plan: 'Starter',
    registrationDate: '2026-05-20',
    status: 'Active',
    storeUrl: 'https://bellacasa.localstore.io',
    revenue: 194300,
    ordersCount: 145,
    productsCount: 38,
    rating: 4.6,
    logo: 'BC',
    city: 'Pune',
  },
  {
    id: 'shop-003',
    name: 'Green Leaf Organic Provisions',
    slug: 'green-leaf',
    owner: 'Harish Nambiar',
    category: 'Organic Groceries',
    email: 'harish@greenleaf.farm',
    phone: '+91 99011 22334',
    plan: 'Business',
    registrationDate: '2026-02-10',
    status: 'Active',
    storeUrl: 'https://greenleaf.localstore.io',
    revenue: 890400,
    ordersCount: 780,
    productsCount: 120,
    rating: 4.9,
    logo: 'GL',
    city: 'Bengaluru',
  },
  {
    id: 'shop-004',
    name: 'Peak Fitness Athletics Gear',
    slug: 'peak-fitness',
    owner: 'Tarun Chawla',
    category: 'Sports & Fitness',
    email: 'support@peakfitness.com',
    phone: '+91 98111 88990',
    plan: 'Growth',
    registrationDate: '2026-06-01',
    status: 'Active',
    storeUrl: 'https://peakfitness.localstore.io',
    revenue: 345000,
    ordersCount: 210,
    productsCount: 45,
    rating: 4.7,
    logo: 'PF',
    city: 'Gurugram',
  },
  {
    id: 'shop-005',
    name: 'Artisan Roast & Brew Lab',
    slug: 'artisan-roast',
    owner: 'Kavita Menon',
    category: 'Beverages & Coffee',
    email: 'hello@artisanroast.coffee',
    phone: '+91 97400 55667',
    plan: 'Starter',
    registrationDate: '2026-08-14',
    status: 'Pending',
    storeUrl: 'https://artisanroast.localstore.io',
    revenue: 42000,
    ordersCount: 34,
    productsCount: 16,
    rating: 4.5,
    logo: 'AR',
    city: 'Kochi',
  },
  {
    id: 'shop-006',
    name: 'Heritage Leather Works',
    slug: 'heritage-leather',
    owner: 'Farhan Zaidi',
    category: 'Leather Accessories',
    email: 'farhan@heritageleather.in',
    phone: '+91 98330 99881',
    plan: 'Growth',
    registrationDate: '2026-04-05',
    status: 'Inactive',
    storeUrl: 'https://heritageleather.localstore.io',
    revenue: 128900,
    ordersCount: 92,
    productsCount: 28,
    rating: 4.3,
    logo: 'HL',
    city: 'Kanpur',
  },
];
