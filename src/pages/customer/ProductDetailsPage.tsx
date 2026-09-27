import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { ProductCard } from '../../components/customer/ProductCard';
import {
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ArrowRight,
  Share2,
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useStore();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'reviews'>('specs');

  // Set default size and color when product loads
  React.useEffect(() => {
    if (product) {
      if (product.sizes?.length) setSelectedSize(product.sizes[0]);
      if (product.colors?.length) setSelectedColor(product.colors[0]);
      setActiveImageIdx(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Product Not Found</h1>
        <p className="text-sm text-slate-500">The requested item might have been archived or moved.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
        >
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const discountPercent =
    product.discountPrice && product.discountPrice < product.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    showToast(`Added ${quantity}x "${product.name}" to cart!`, 'success');
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    showToast('Proceeding straight to checkout...', 'info');
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.status === 'active')
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          to={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-slate-900 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery (Left) + Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery: Thumbnails & Main Stage */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-slate-50 ${
                    activeImageIdx === idx
                      ? 'border-slate-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Stage */}
          <div className="flex-1 aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-200/80">
            <ImageWithFallback
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-slate-700 hover:text-slate-900 hover:bg-white transition-colors"
              title="Share item"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Purchase Module (Right) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              <span>{product.category} · {product.brand}</span>
              <span className="font-mono text-slate-400">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-slate-800 tabular-nums">
                {product.rating}
              </span>
              <span className="text-xs text-slate-400 tabular-nums">
                · {product.reviewsCount} customer reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                ₹{(product.discountPrice || product.price).toLocaleString()}
              </span>
              {product.discountPrice && product.discountPrice < product.price && (
                <span className="text-base text-slate-400 line-through tabular-nums">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="h-px bg-slate-200" />

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-900">Available Sizes</span>
                <span className="text-slate-500">Selected: <strong className="text-slate-900">{selectedSize}</strong></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-10 h-10 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      selectedSize === sz
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:border-slate-400 bg-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-900">Color Palette</span>
                <span className="text-slate-500">Selected: <strong className="text-slate-900">{selectedColor}</strong></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedColor === c
                        ? 'border-slate-900 bg-slate-100 text-slate-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Stock Status */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
              >
                -
              </button>
              <span className="w-10 text-center text-xs font-bold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
              >
                +
              </button>
            </div>

            <span
              className={`text-xs font-semibold ${
                isOutOfStock
                  ? 'text-rose-600'
                  : product.stock < 10
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {isOutOfStock
                ? 'Out of Stock'
                : product.stock < 10
                ? `Low Stock: Only ${product.stock} units left`
                : 'In Stock & Ready for Dispatch'}
            </span>
          </div>

          {/* Primary CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : isOutOfStock
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                  inWishlist
                    ? 'border-rose-200 bg-rose-50 text-rose-500'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-3 px-6 rounded-xl border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>Instant Express Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust markers */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Free standard delivery on orders above ₹2,000</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Complimentary 14-day doorstep size exchanges</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
              <span>100% verified sustainable artisan materials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Shipping & Customer Reviews */}
      <div className="pt-10 border-t border-slate-200">
        <div className="flex items-center gap-6 border-b border-slate-200 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'specs'
                ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-900'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Garment Specifications
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'shipping'
                ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-900'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Delivery & Returns
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'reviews'
                ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-900'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Customer Reviews ({product.reviewsCount})
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <dl className="divide-y divide-slate-100 text-xs sm:text-sm">
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="py-3 grid grid-cols-3 gap-4">
                      <dt className="font-semibold text-slate-500">{key}</dt>
                      <dd className="col-span-2 text-slate-900">{val}</dd>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">Standard specifications apply.</p>
                )}
              </dl>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-2xl space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900">Standard Delivery (2–4 Business Days)</h4>
                <p>Standard delivery is ₹99 or free for orders exceeding ₹2,000. Shipped via premium air couriers.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Express Same-Day / Next-Day Delivery</h4>
                <p>Available in select metro areas for ₹199 flat fee. Orders before 12 PM ship same evening.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Doorstep Exchange & Returns</h4>
                <p>If sizing doesn't feel right, initiate a reverse pickup within 14 days directly from your account.</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-3xl font-black text-slate-900 tabular-nums">
                  {product.rating}
                </div>
                <div>
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Based on {product.reviewsCount} verified purchases
                  </p>
                </div>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                <div className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Karan Wadhwa</span>
                    <span className="text-slate-400">Sep 20, 2026</span>
                  </div>
                  <div className="flex items-center text-amber-500 my-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Stitching is clean and the drape is flawless. Delivered in high-quality recycled packaging with minimal plastic.
                  </p>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Rhea Sen</span>
                    <span className="text-slate-400">Sep 15, 2026</span>
                  </div>
                  <div className="flex items-center text-amber-500 my-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    True to size chart. The fabric weight feels rich and comfortable for long workdays.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Complete The Look
              </span>
              <h3 className="heading-card font-bold text-slate-900 font-display mt-0.5">
                Related in {product.category}
              </h3>
            </div>
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold text-slate-900 hover:underline"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
