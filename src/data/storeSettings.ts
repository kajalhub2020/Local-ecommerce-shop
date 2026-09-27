export interface StoreSettings {
  storeName: string;
  tagline: string;
  logoText: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  currency: string;
  currencySymbol: string;
  standardDeliveryFee: number;
  expressDeliveryFee: number;
  freeDeliveryThreshold: number;
  orderNotificationEmail: boolean;
  lowStockAlert: boolean;
  lowStockThreshold: number;
  customerSmsNotification: boolean;
  storeLayout: 'grid' | 'editorial';
  primaryThemeColor: string;
}

export const defaultStoreSettings: StoreSettings = {
  storeName: 'Urban Style Fashion',
  tagline: 'Curated modern essentials crafted for contemporary living',
  logoText: 'LOCALSTORE',
  description: 'A neighborhood boutique studio offering premium menswear, womenswear, footwear, and crafted leather accessories.',
  email: 'support@urbanstyle.com',
  phone: '+91 98200 12345',
  address: 'Shop 12, Ground Floor, Heritage Galleria, Linking Road',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400052',
  currency: 'INR',
  currencySymbol: '₹',
  standardDeliveryFee: 99,
  expressDeliveryFee: 199,
  freeDeliveryThreshold: 2000,
  orderNotificationEmail: true,
  lowStockAlert: true,
  lowStockThreshold: 10,
  customerSmsNotification: true,
  storeLayout: 'grid',
  primaryThemeColor: '#0f172a',
};
