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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-2 px-4 text-center tracking-wider border-b border-slate-800/80 d-flex items-center justify-center gap-3">
        <span>Complimentary delivery on orders above ₹{storeSettings.freeDeliveryThreshold.toLocaleString()}</span>
        <span className="d-none d-sm-inline text-slate-600">|</span>
        <span className="d-none d-sm-inline font-medium text-amber-300">
          Use code <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">URBAN10</span> for 10% off
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="d-flex align-items-center justify-content-between h-16 sm:h-20 gap-3">
          {/* Left: Mobile hamburger & Brand */}
          <div className="d-flex align-items-center gap-3 sm:gap-5">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="d-lg-none p-2 text-slate-800 hover:text-slate-950 rounded-lg border border-slate-200/80"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="d-flex flex-column text-decoration-none">
              <span className="font-cinzel text-lg sm:text-2xl font-bold tracking-wider text-slate-900 leading-tight">
                {storeSettings.storeName}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 d-none d-sm-block mt-0.5">
                Local Boutique Studio
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="d-none d-lg-flex align-items-center gap-5 xl:gap-7 text-sm">
            <Link to="/products" className="nav-link-editorial text-slate-800">
              All Products
            </Link>
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="nav-link-editorial text-slate-600"
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/categories" className="nav-link-editorial text-slate-500">
              Collections
            </Link>
          </nav>

          {/* Right: Search, Wishlist, Cart & Account */}
          <div className="d-flex align-items-center gap-1.5 sm:gap-3">
            {/* Desktop Search Bar */}
            <form onSubmit={handleSearchSubmit} className="d-none d-md-flex relative items-center w-44 lg:w-60">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-slate-100/90 border border-slate-200/90 rounded-full pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="d-md-none p-2 text-slate-700 hover:text-slate-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/products?wishlist=true"
              className="p-2 text-slate-700 hover:text-slate-950 relative rounded-full hover:bg-slate-100 transition-colors"
              aria-label={`Wishlist (${wishlist.length} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold d-flex align-items-center justify-content-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              to="/cart"
              className="p-2 text-slate-700 hover:text-slate-950 relative rounded-full hover:bg-slate-100 transition-colors"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 text-white rounded-full text-[10px] font-bold d-flex align-items-center justify-content-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Login */}
            <Link
              to="/login"
              className="p-2 text-slate-700 hover:text-slate-950 transition-colors d-none d-sm-flex align-items-center gap-1.5 rounded-full hover:bg-slate-100 px-3"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <UserIcon className="w-4 h-4" />
              {user && <span className="text-xs font-semibold text-slate-800 max-w-[80px] truncate">{user.name.split(' ')[0]}</span>}
            </Link>
          </div>
        </div>

        {/* Mobile Search input expander */}
        {isSearchOpen && (
          <div className="d-md-none py-3 border-t border-slate-100">
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
        <div className="d-lg-none border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="d-block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-50 rounded-lg text-decoration-none"
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="d-block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-decoration-none"
              >
                {cat.name} ({cat.productCount})
              </Link>
            ))}
            <Link
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="d-block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-decoration-none"
            >
              Browse Collections
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 d-flex flex-column gap-2">
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="d-flex align-items-center justify-content-between px-3 py-2.5 text-sm font-medium text-slate-800 bg-slate-50 rounded-lg text-decoration-none"
            >
              <div className="d-flex align-items-center gap-2">
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
              className="d-flex align-items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg text-decoration-none"
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
