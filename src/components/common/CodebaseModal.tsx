import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, Folder, ExternalLink, Terminal } from 'lucide-react';

interface CodeFile {
  path: string;
  category: string;
  language: string;
  description: string;
  codeSnippet: string;
}

const KEY_FILES: CodeFile[] = [
  {
    path: 'package.json',
    category: 'Root / Config',
    language: 'json',
    description: 'Dependencies, scripts, and project metadata',
    codeSnippet: `{
  "name": "localstore-ecommerce-saas",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "vite",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bootstrap": "^5.3.3",
    "bootstrap-icons": "^1.11.3",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "react-router-dom": "^7.18.4",
    "vite": "^8.3.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.1",
    "typescript": "^7.0.2"
  }
}`
  },
  {
    path: 'src/context/StoreContext.tsx',
    category: 'State Management',
    language: 'typescript',
    description: 'Central store for products, categories, orders, inventory with localStorage persistence',
    codeSnippet: `import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, Product } from '../data/products';
import { initialCategories, Category } from '../data/categories';
import { initialOrders, Order } from '../data/orders';
import { initialStoreSettings, StoreSettings } from '../data/storeSettings';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  storeSettings: StoreSettings;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (id: string, status: Order['orderStatus']) => void;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('localstore_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('localstore_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('localstore_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('localstore_settings');
    return saved ? JSON.parse(saved) : initialStoreSettings;
  });

  useEffect(() => {
    localStorage.setItem('localstore_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('localstore_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('localstore_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('localstore_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // CRUD actions implementations...
  return (
    <StoreContext.Provider value={{
      products, categories, orders, storeSettings,
      addProduct: (p) => { /* implementation */ },
      updateProduct: (id, p) => { /* implementation */ },
      deleteProduct: (id) => { /* implementation */ },
      toggleProductStatus: (id) => { /* implementation */ },
      addCategory: (c) => { /* implementation */ },
      updateCategory: (id, c) => { /* implementation */ },
      deleteCategory: (id) => { /* implementation */ },
      createOrder: (data) => { /* creates order & reduces stock */ return {} as Order; },
      updateOrderStatus: (id, s) => { /* implementation */ },
      updateStoreSettings: (s) => { /* implementation */ }
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};`
  },
  {
    path: 'src/context/CartContext.tsx',
    category: 'State Management',
    language: 'typescript',
    description: 'Shopping cart & wishlist state with real-time tax/shipping calculations',
    codeSnippet: `import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { useStore } from './StoreContext';

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
// Manages cart items, coupon discounts, auto delivery charges, and local storage sync...`
  },
  {
    path: 'src/data/products.ts',
    category: 'Mock Data',
    language: 'typescript',
    description: '25+ realistic products for Urban Style Fashion with sizes, colors, and stock',
    codeSnippet: `export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  status: 'Active' | 'Draft' | 'Out of Stock';
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  shippingInfo: string;
  returnPolicy: string;
  image: string;
  gallery: string[];
  salesCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
}

export const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Minimalist Oxford Cotton Shirt',
    sku: 'USF-MEN-001',
    category: 'Men',
    price: 2499,
    discountPrice: 1899,
    stock: 45,
    status: 'Active',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Sky Blue', 'Navy'],
    rating: 4.8,
    reviewCount: 124,
    brand: 'Urban Atelier',
    description: 'Tailored from premium long-staple Egyptian cotton with a natural wash finish.',
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Tailored Slim Fit',
      'Collar': 'Button-Down Collar',
      'Care': 'Machine wash cold 30°C'
    },
    shippingInfo: 'Dispatched in 24 hours. Express 2-day delivery available.',
    returnPolicy: 'Hassle-free 14-day returns and exchanges.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    salesCount: 312,
    isFeatured: true,
    isTrending: true
  },
  // 24 more fully defined products...
];`
  },
  {
    path: 'src/App.tsx',
    category: 'Routing',
    language: 'typescript',
    description: 'Master routing with Customer Store, Shop Admin, and Super Admin layouts',
    codeSnippet: `import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { RoleSwitcher } from './components/common/RoleSwitcher';

// Customer Store
import { CustomerLayout } from './components/customer/CustomerLayout';
import { HomePage } from './pages/customer/HomePage';
import { CategoriesPage } from './pages/customer/CategoriesPage';
import { ProductListingPage } from './pages/customer/ProductListingPage';
import { ProductDetailsPage } from './pages/customer/ProductDetailsPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderSuccessPage } from './pages/customer/OrderSuccessPage';

// Shop Admin
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminAddEditProductPage } from './pages/admin/AdminAddEditProductPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Super Admin
import { SuperAdminLayout } from './components/superadmin/SuperAdminLayout';
import { SuperAdminDashboardPage } from './pages/superadmin/SuperAdminDashboardPage';
import { SuperAdminShopsPage } from './pages/superadmin/SuperAdminShopsPage';
import { SuperAdminShopDetailsPage } from './pages/superadmin/SuperAdminShopDetailsPage';
import { SuperAdminSubscriptionsPage } from './pages/superadmin/SuperAdminSubscriptionsPage';
import { SuperAdminAnalyticsPage } from './pages/superadmin/SuperAdminAnalyticsPage';
import { SuperAdminSettingsPage } from './pages/superadmin/SuperAdminSettingsPage';

// Auth
import { LoginPage } from './pages/auth/LoginPage';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <StoreProvider>
            <CartProvider>
              <RoleSwitcher />
              <Routes>
                {/* Customer Store */}
                <Route path="/" element={<CustomerLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="products" element={<ProductListingPage />} />
                  <Route path="products/:id" element={<ProductDetailsPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order-success/:id" element={<OrderSuccessPage />} />
                </Route>

                {/* Shop Admin */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="products/new" element={<AdminAddEditProductPage />} />
                  <Route path="products/edit/:id" element={<AdminAddEditProductPage />} />
                  <Route path="categories" element={<AdminCategoriesPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                  <Route path="customers" element={<AdminCustomersPage />} />
                  <Route path="inventory" element={<AdminInventoryPage />} />
                  <Route path="reports" element={<AdminReportsPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>

                {/* Super Admin */}
                <Route path="/superadmin" element={<SuperAdminLayout />}>
                  <Route index element={<SuperAdminDashboardPage />} />
                  <Route path="shops" element={<SuperAdminShopsPage />} />
                  <Route path="shops/:id" element={<SuperAdminShopDetailsPage />} />
                  <Route path="subscriptions" element={<SuperAdminSubscriptionsPage />} />
                  <Route path="analytics" element={<SuperAdminAnalyticsPage />} />
                  <Route path="settings" element={<SuperAdminSettingsPage />} />
                </Route>

                {/* Auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CartProvider>
          </StoreProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}`
  },
  {
    path: 'README.md',
    category: 'Documentation',
    language: 'markdown',
    description: 'Complete setup guide, credentials, features list, and portfolio notes',
    codeSnippet: `# LocalStore — Local Shop E-commerce SaaS

A comprehensive, production-style frontend SaaS portfolio application.

## Quick Start in VS Code
\`\`\`bash
# 1. Unzip localstore-project.zip into your folder
# 2. Open the folder in VS Code
# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
\`\`\`

## Pre-configured Demo Accounts
- Customer: customer@demo.com / demo123 (Browse storefront, cart & checkout)
- Shop Admin: admin@demo.com / admin123 (Manage Urban Style Fashion products, orders, inventory)
- Super Admin: superadmin@demo.com / super123 (Multi-tenant SaaS metrics, shops, plans)`
  }
];

interface CodebaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodebaseModal: React.FC<CodebaseModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(KEY_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Entire Codebase & Project Zip</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready to Download
                </span>
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                Download the entire ZIP archive or inspect and copy individual modules directly into your VS Code editor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Download Zip Direct Link */}
            <a
              href="/localstore-project.zip?v=2"
              download="localstore-project.zip"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
              title="Download localstore-project.zip"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span> <span>ZIP (2.9 MB)</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* How to run banner */}
        <div className="bg-slate-950 px-5 py-2.5 border-b border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>To run in VS Code:</span>
            <code className="bg-slate-800 px-2 py-0.5 rounded font-mono text-[11px] text-emerald-300">
              npm install && npm run dev
            </code>
          </div>
          <span className="text-slate-400 text-[11px]">
            Node 18+ • React 19 • Vite • Tailwind CSS • Bootstrap 5
          </span>
        </div>

        {/* Content area: Sidebar with file tree + code preview */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="md:col-span-4 border-r border-slate-800 bg-slate-950/40 p-3 overflow-y-auto max-h-[300px] md:max-h-none space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
              <span>Project Structure</span>
              <span>{KEY_FILES.length} Files</span>
            </div>

            {KEY_FILES.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  <div className="min-w-0">
                    <p className="font-mono text-xs truncate">{file.path}</p>
                    <p className="text-[10px] text-slate-400 truncate">{file.category}</p>
                  </div>
                </button>
              );
            })}

            <div className="pt-3 px-2 border-t border-slate-800/80 mt-3 text-[11px] text-slate-400 space-y-1.5">
              <p className="font-semibold text-slate-300">Included in the ZIP:</p>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[10px]">
                <li>20+ responsive customer & admin pages</li>
                <li>Full mock database (categories, products, orders)</li>
                <li>Context state (Cart, Store, Auth, Toasts)</li>
                <li>Tailwind CSS + Bootstrap 5 setup</li>
                <li>High-resolution assets & SVG charts</li>
              </ul>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="md:col-span-8 flex flex-col overflow-hidden bg-slate-900">
            {/* File info bar */}
            <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-xs font-semibold text-blue-300 truncate">
                  {selectedFile.path}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {selectedFile.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code display */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed text-slate-200 bg-slate-950/50">
              <pre className="whitespace-pre overflow-x-auto selection:bg-blue-600/40">
                <code>{selectedFile.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            File: <strong className="text-slate-200 font-mono">localstore-project.zip</strong> (Contains all 50+ source files)
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            <a
              href="/localstore-project.zip?v=2"
              download="localstore-project.zip"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download ZIP Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
