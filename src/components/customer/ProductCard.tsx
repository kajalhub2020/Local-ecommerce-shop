import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  viewMode = 'grid',
}) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const { showToast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent =
    product.discountPrice && product.discountPrice < product.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || 'Standard';
    const defaultColor = product.colors?.[0] || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
    setIsAdded(true);
    showToast(`Added "${product.name}" to cart!`, 'success');
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      inWishlist ? `Removed from wishlist` : `Added "${product.name}" to wishlist`,
      'info'
    );
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const isOutOfStock = product.stock <= 0;

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col sm:flex-row gap-5 hover:border-slate-300 hover:shadow-sm transition-all">
        {/* Thumbnail */}
        <Link
          to={`/products/${product.id}`}
          className="w-full sm:w-48 h-52 sm:h-44 relative rounded-lg overflow-hidden bg-slate-50 shrink-0"
        >
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercent > 0 && (
            <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}
        </Link>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                {product.category} · {product.brand}
              </span>
              <button
                onClick={handleWishlistToggle}
                className={`p-1.5 rounded-full transition-colors ${
                  inWishlist
                    ? 'text-rose-500 bg-rose-50'
                    : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              to={`/products/${product.id}`}
              className="text-base font-semibold text-slate-900 hover:text-slate-700 transition-colors line-clamp-1 mt-1"
            >
              {product.name}
            </Link>

            <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-semibold text-slate-700 tabular-nums">
                {product.rating}
              </span>
              <span className="text-xs text-slate-400 tabular-nums">
                ({product.reviewsCount} reviews)
              </span>
              <span className="text-slate-300 mx-1">·</span>
              <span
                className={`text-xs font-medium ${
                  isOutOfStock
                    ? 'text-rose-600'
                    : product.stock < 10
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {isOutOfStock ? 'Out of Stock' : product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                ₹{(product.discountPrice || product.price).toLocaleString()}
              </span>
              {product.discountPrice && product.discountPrice < product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onQuickView && (
                <button
                  onClick={handleQuickViewClick}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Quick View</span>
                </button>
              )}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : isOutOfStock
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Standard)
  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-sm transition-all duration-200">
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded shadow-sm">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-white text-rose-500 shadow-md'
              : 'bg-white/80 backdrop-blur-sm text-slate-500 hover:text-rose-500 hover:bg-white shadow-sm'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        {onQuickView && (
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
            <button
              onClick={handleQuickViewClick}
              className="w-full py-2 bg-white/95 backdrop-blur text-slate-900 text-xs font-semibold rounded-lg shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
            <span className="uppercase tracking-wider">{product.category}</span>
            <span
              className={`font-semibold ${
                isOutOfStock
                  ? 'text-rose-600'
                  : product.stock < 10
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {isOutOfStock ? 'Sold Out' : product.stock < 10 ? `${product.stock} left` : 'In Stock'}
            </span>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors line-clamp-1"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-slate-800 tabular-nums">
              {product.rating}
            </span>
            <span className="text-xs text-slate-400 tabular-nums">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 tabular-nums">
              ₹{(product.discountPrice || product.price).toLocaleString()}
            </span>
            {product.discountPrice && product.discountPrice < product.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums -mt-0.5">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`p-2 sm:px-3 sm:py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
            }`}
            aria-label="Add to cart"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
