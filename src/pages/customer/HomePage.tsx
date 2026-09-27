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
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* 1. Hero Campaign Banner (Fully Responsive Split Layout) */}
      <section className="mx-3 sm:mx-6 lg:mx-8 mt-4">
        <div className="rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800/80 shadow-xl position-relative">
          <div className="row g-0 align-items-stretch">
            {/* Hero Left Content */}
            <div className="col-12 col-lg-7 p-6 sm:p-10 lg:p-16 d-flex flex-column justify-content-center z-10">
              <div>
                <span className="gold-badge mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autumn / Winter 2026 Collection</span>
                </span>

                <h1 className="heading-hero font-bold tracking-tight text-white mb-3 text-balance">
                  Tailored for Modern Urban Life.
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4 max-w-xl">
                  Curated everyday garments and handcrafted accessories crafted from organic textiles and architectural cuts. Designed with intention by your local neighborhood studio.
                </p>

                <div className="d-flex flex-wrap align-items-center gap-3 pt-2 mb-4">
                  <Link
                    to="/products"
                    className="gold-btn text-decoration-none"
                  >
                    <span>Shop Catalogue</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/categories"
                    className="btn btn-outline-light px-4 py-2.5 rounded-3 border-slate-700 text-sm fw-semibold hover:bg-slate-800"
                  >
                    Browse Collections
                  </Link>
                </div>

                <div className="pt-4 mt-4 border-top border-slate-800 d-flex flex-wrap align-items-center gap-4 sm:gap-6 text-xs text-slate-400">
                  <div>
                    <span className="font-bold text-white text-base tabular-nums">20+</span>
                    <p className="text-[11px] text-slate-400 m-0">Curated Silhouettes</p>
                  </div>
                  <div className="d-none d-sm-block bg-slate-800" style={{ width: '1px', height: '32px' }} />
                  <div>
                    <span className="font-bold text-white text-base tabular-nums">4.9 / 5</span>
                    <p className="text-[11px] text-slate-400 m-0">Customer Satisfaction</p>
                  </div>
                  <div className="d-none d-sm-block bg-slate-800" style={{ width: '1px', height: '32px' }} />
                  <div>
                    <span className="font-bold text-white text-base tabular-nums">100%</span>
                    <p className="text-[11px] text-slate-400 m-0">Traceable Fabrics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="col-12 col-lg-5 position-relative overflow-hidden" style={{ minHeight: '380px' }}>
              <ImageWithFallback
                src="/src/assets/images/hero_fashion_collection_1790509027908.jpg"
                alt="Urban Style fashion models editorial"
                className="w-full h-full object-cover object-center position-absolute top-0 start-0"
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-none d-lg-block"
                style={{
                  background: 'linear-gradient(to right, rgba(10, 14, 23, 0.95) 0%, rgba(10, 14, 23, 0.25) 40%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-lg-none"
                style={{
                  background: 'linear-gradient(to top, rgba(10, 14, 23, 0.8) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Department Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="d-flex flex-column flex-sm-row sm:items-end justify-content-between mb-4 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Department Architecture
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-serif mt-1">
              Curated Collections
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 d-flex align-items-center gap-1 group text-decoration-none"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="row g-3 g-md-4">
          {categories.map((category) => (
            <div key={category.id} className="col-6 col-md-4 col-lg">
              <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="luxury-card overflow-hidden d-flex flex-column h-100 text-decoration-none group"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden position-relative">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 d-flex align-items-center justify-content-between bg-white">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 m-0 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 tabular-nums">
                      {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-slate-900 group-hover:text-white d-flex align-items-center justify-content-center transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Trending Products Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="d-flex flex-column flex-sm-row sm:items-end justify-content-between mb-4 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-rose-600 d-flex align-items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Community Favorites</span>
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-serif mt-1">
              Trending Silhouettes
            </h2>
          </div>
          <Link
            to="/products?sort=trending"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 d-flex align-items-center gap-1 group text-decoration-none"
          >
            <span>See All Trending</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="row g-3 g-md-4">
          {trendingProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Seasonal Discount Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-10 lg:p-12 border border-slate-800 position-relative overflow-hidden shadow-lg">
          <div className="position-relative z-10 max-w-xl">
            <span className="gold-badge mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>LIMITED LOCAL OFFER</span>
            </span>
            <h2 className="heading-section font-bold tracking-tight text-white font-serif mb-2">
              Enjoy 10% Off Your First Boutique Order.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Use promo voucher <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">URBAN10</span> during checkout. Valid across all outerwear, shoes, and handcrafted goods.
            </p>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <Link
                to="/products"
                className="gold-btn text-decoration-none"
              >
                Claim Voucher & Shop
              </Link>
              <span className="text-xs text-slate-400">
                Automatic calculation applied in cart
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="d-flex flex-column flex-sm-row sm:items-end justify-content-between mb-4 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Fresh Atelier Drops
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-serif mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/products?sort=newest"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 d-flex align-items-center gap-1 group text-decoration-none"
          >
            <span>Explore New In</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="row g-3 g-md-4">
          {newArrivals.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Featured Products (Comprehensive Collection) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="d-flex flex-column flex-sm-row sm:items-end justify-content-between mb-4 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Editor's Selection
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-serif mt-1">
              Featured Wardrobe Staples
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 d-flex align-items-center gap-1 group text-decoration-none"
          >
            <span>View Full Catalog ({activeProducts.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="row g-3 g-md-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 7. Customer Testimonials */}
      <section className="bg-slate-100/70 py-12 sm:py-16 border-top border-bottom border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Neighborhood Trust
            </span>
            <h2 className="heading-section font-bold text-slate-900 tracking-tight font-serif mt-1">
              What Our Patrons Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Authentic reviews from verified urban customers who appreciate thoughtful garment craft.
            </p>
          </div>

          <div className="row g-3 g-md-4">
            {testimonials.map((t) => (
              <div key={t.name} className="col-12 col-md-4">
                <div className="luxury-card p-5 h-100 d-flex flex-column justify-content-between bg-white">
                  <div>
                    <div className="d-flex align-items-center text-amber-500 gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic m-0">
                      "{t.comment}"
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-top border-slate-100 d-flex align-items-center justify-content-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 m-0">{t.name}</h3>
                      <p className="text-[11px] text-slate-400 m-0">{t.role}</p>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
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
