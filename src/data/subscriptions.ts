export interface SubscriptionPlan {
  id: string;
  name: 'Starter' | 'Growth' | 'Business';
  tagline: string;
  priceMonthly: number;
  productLimit: number;
  features: string[];
  activeShopsCount: number;
  status: 'active' | 'inactive';
  popular?: boolean;
}

export const initialSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    tagline: 'Ideal for neighborhood boutiques launching their first digital catalogue',
    priceMonthly: 499,
    productLimit: 100,
    features: [
      'Up to 100 active products',
      'Basic sales & order management',
      'Standard storefront themes',
      'Community email support (48h SLA)',
      'Subdomain hosting included',
      'Standard CSV product exports',
    ],
    activeShopsCount: 2,
    status: 'active',
  },
  {
    id: 'plan-growth',
    name: 'Growth',
    tagline: 'Designed for thriving local brands expanding catalogue & order velocity',
    priceMonthly: 999,
    productLimit: 1000,
    popular: true,
    features: [
      'Up to 1,000 active products',
      'Advanced sales analytics & reports',
      'Live inventory alerts & stock tracking',
      'Customer CRM & order history',
      'Custom domain configuration',
      'Priority email & chat support (12h SLA)',
      'Coupons & automated discount rules',
    ],
    activeShopsCount: 3,
    status: 'active',
  },
  {
    id: 'plan-business',
    name: 'Business',
    tagline: 'For high-volume multi-category regional brands requiring enterprise power',
    priceMonthly: 1999,
    productLimit: 99999, // unlimited
    features: [
      'Unlimited active products & collections',
      'Custom advanced reporting & exports',
      'Multiple staff manager accounts',
      'Dedicated account manager & phone support',
      'Custom storefront CSS & styling',
      '99.9% uptime SLA guarantee',
      'Automated WhatsApp/SMS order notifications',
    ],
    activeShopsCount: 1,
    status: 'active',
  },
];
