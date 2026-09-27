import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../data/products';
import { ProductCard } from '../../components/customer/ProductCard';
import { QuickViewModal } from '../../components/customer/QuickViewModal';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { ArrowRight, Sparkles, Star, TrendingUp, ShieldCheck, Tag } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, categories, storeSettings } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const activeProducts = products.filter((p) => p.status === 'active');
  const trendingProducts = activeProducts.filter((p) => p.isTrending).slice(0, 4);
  const newArrivals = activeProducts.filter((p) => p.isNewArrival).slice(0, 4);
  const featuredProducts = activeProducts.filter((p) => p.isFeatured).slice(0, 8);

  const testimonials = [
    {
      name: 'Aditya Mathur',
      role: 'Creative Director, Studio Monad',
      comment: 'The quality of the Architect Cotton Overshirt exceeded my expectations. Substantial fabric weight, immaculate stitching, and delivered in two days.',
      rating: 5,
    },
    {
      name: 'Simran Khurana',
      role: 'Architect & Interior Designer',
      comment: 'LocalStore makes buying from neighborhood ateliers an absolute breeze. The linen trousers drape beautifully and sizing was spot on.',
      rating: 5,
    },
    {
      name: 'Zaid Alvi',
      role: 'Product Designer',
      comment: 'Top-tier sneaker craftsmanship. The calfskin leather feels just like European luxury labels at a fraction of retail.',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Campaign Banner */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[560px]">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center z-10">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter 2026 Collection</span>
            </span>

            <h1 className="heading-hero font-bold tracking-tight text-white font-display text-balance">
              Tailored for Modern Urban Life.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
              Curated everyday garments and handcrafted accessories crafted from organic textiles and architectural cuts. Built by your local neighborhood studio.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Shop Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/categories"
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all border border-slate-700/60"
              >
                Browse Collections
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800 flex items-center gap-6 text-xs text-slate-400">
              <div>
                <span className="font-bold text-white text-base tabular-nums">20+</span>
                <p className="text-[11px] text-slate-400">Curated Silhouettes</p>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="font-bold text-white text-base tabular-nums">4.8 / 5</span>
                <p className="text-[11px] text-slate-400">Customer Satisfaction</p>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="font-bold text-white text-base tabular-nums">100%</span>
                <p className="text-[11px] text-slate-400">Traceable Fabrics</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto">
            <ImageWithFallback
              src="/src/assets/images/hero_fashion_collection_1790509027908.jpg"
              alt="Urban Style fashion models editorial"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Department Architecture
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-display mt-1">
              Curated Collections
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Products Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Community Favorites</span>
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-display mt-1">
              Trending Silhouettes
            </h2>
          </div>
          <Link
            to="/products?sort=trending"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 flex items-center gap-1 group"
          >
            <span>See All Trending</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. Seasonal Discount Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>LIMITED LOCAL OFFER</span>
            </span>
            <h2 className="heading-section font-bold tracking-tight text-white font-display">
              Enjoy 10% Off Your First Boutique Order.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use promo code <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">URBAN10</span> during checkout. Valid across all outerwear, shoes, and handcrafted leather goods.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors"
              >
                Claim Voucher & Shop
              </Link>
              <span className="text-xs text-slate-400">
                Automatic calculation in cart
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Fresh Atelier Drops
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-display mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/products?sort=newest"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 flex items-center gap-1 group"
          >
            <span>Explore New In</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. Featured Products (Comprehensive Collection) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Editor's Selection
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-display mt-1">
              Featured Wardrobe Staples
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 flex items-center gap-1 group"
          >
            <span>View Full Catalog ({activeProducts.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 7. Customer Testimonials */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Neighborhood Trust
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-display mt-1">
              What Our Patrons Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Authentic reviews from verified urban customers who appreciate thoughtful garment craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center text-amber-500 gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{t.name}</h3>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
