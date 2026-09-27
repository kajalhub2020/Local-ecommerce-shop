import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';

export const CustomerFooter: React.FC = () => {
  const { storeSettings } = useStore();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to our newsletter!', 'success');
      setEmail('');
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600">
      {/* Value Propositions Strip */}
      <div className="border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-slate-800" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Complimentary Shipping</h3>
                <p className="text-xs text-slate-500 mt-0.5">Free standard shipping on orders above ₹{storeSettings.freeDeliveryThreshold}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-slate-800" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Hassle-Free 14-Day Returns</h3>
                <p className="text-xs text-slate-500 mt-0.5">Easy returns and size exchanges at your doorstep</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-slate-800" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">100% Verified Quality</h3>
                <p className="text-xs text-slate-500 mt-0.5">Handpicked premium fabrics and durable craftsmanship</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display uppercase">
              {storeSettings.storeName}
            </span>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              {storeSettings.description} Powered by <span className="font-semibold text-slate-800">LocalStore SaaS</span> for local neighborhood merchants.
            </p>
            <div className="text-xs text-slate-500 space-y-1 pt-1">
              <p>{storeSettings.address}</p>
              <p>{storeSettings.city}, {storeSettings.state} - {storeSettings.pincode}</p>
              <p>Email: <a href={`mailto:${storeSettings.email}`} className="text-slate-800 underline">{storeSettings.email}</a></p>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/products?category=Men" className="hover:text-slate-900 transition-colors">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/products?category=Women" className="hover:text-slate-900 transition-colors">
                  Women's Wear
                </Link>
              </li>
              <li>
                <Link to="/products?category=Footwear" className="hover:text-slate-900 transition-colors">
                  Footwear & Boots
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="hover:text-slate-900 transition-colors">
                  Leather Goods & Bags
                </Link>
              </li>
              <li>
                <Link to="/products?category=Kids" className="hover:text-slate-900 transition-colors">
                  Kids Apparel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              LocalStore SaaS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/admin" className="hover:text-slate-900 transition-colors flex items-center gap-1.5 font-medium text-blue-600">
                  <span>Shop Admin Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/superadmin" className="hover:text-slate-900 transition-colors flex items-center gap-1.5 font-medium text-emerald-600">
                  <span>Super Admin Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-slate-900 transition-colors">
                  Switch Demo Account
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-slate-900 transition-colors">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Join Our Circle
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Subscribe for private previews, seasonal sales, and member-only perks.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the insider list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 p-1.5 text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 block">No spam. Unsubscribe anytime.</span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {storeSettings.storeName}. Powered by LocalStore SaaS Platform.</p>
            <span className="hidden sm:inline text-slate-300">|</span>
            <a
              href="/localstore-project.zip?v=2"
              download="localstore-project.zip"
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Download Full Project (.ZIP)</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-slate-500 font-medium text-[11px] flex-wrap justify-center">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>UPI</span>
            <span>·</span>
            <span>Debit / Credit Cards</span>
            <span>·</span>
            <span>Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
