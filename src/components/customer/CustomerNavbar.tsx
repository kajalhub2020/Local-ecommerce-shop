import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, ArrowRight } from 'lucide-react';

export const CustomerNavbar: React.FC = () => {
  const { cartCount, wishlist } = useCart();
  const { user } = useAuth();
  const { categories, storeSettings } = useStore();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-100 text-[11px] py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span>Complimentary delivery on orders above ₹{storeSettings.freeDeliveryThreshold.toLocaleString()}</span>
        <span className="hidden sm:inline text-slate-500">|</span>
        <span className="hidden sm:inline font-medium text-amber-300">Use code URBAN10 for 10% off</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-display uppercase">
                {storeSettings.storeName}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 hidden sm:block">
                Local Boutique Studio
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <Link to="/products" className="hover:text-slate-900 transition-colors">
              All Products
            </Link>
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="hover:text-slate-900 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/categories" className="text-slate-500 hover:text-slate-900 transition-colors">
              Collections
            </Link>
          </nav>

          {/* Right: Search, Wishlist, Cart & Account */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center w-48 lg:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-slate-100/80 border border-slate-200/80 rounded-full pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/products?wishlist=true"
              className="p-2 text-slate-700 hover:text-slate-900 relative transition-colors"
              aria-label={`Wishlist (${wishlist.length} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              to="/cart"
              className="p-2 text-slate-700 hover:text-slate-900 relative transition-colors"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Login */}
            <Link
              to="/login"
              className="p-2 text-slate-700 hover:text-slate-900 transition-colors hidden sm:flex items-center gap-1.5"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <UserIcon className="w-5 h-5" />
              {user && <span className="text-xs font-medium text-slate-700 max-w-[70px] truncate">{user.name.split(' ')[0]}</span>}
            </Link>
          </div>
        </div>

        {/* Mobile Search input expander */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-slate-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search jackets, linen, sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-sm bg-slate-100 border border-slate-200 rounded-lg pl-10 pr-10 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1 text-slate-700 bg-white rounded shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
              >
                {cat.name} ({cat.productCount})
              </Link>
            ))}
            <Link
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              Browse Collections
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-800 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>My Shopping Bag</span>
              </div>
              <span className="font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>

            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <UserIcon className="w-4 h-4" />
              <span>{user ? `Account (${user.name})` : 'Demo Sign In'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
