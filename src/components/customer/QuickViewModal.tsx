import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent =
    product.discountPrice && product.discountPrice < product.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    showToast(`Added ${quantity}x "${product.name}" to cart!`, 'success');
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-slate-50 overflow-hidden">
            <ImageWithFallback
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Right: Details & Options */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                {product.category} · {product.brand}
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-semibold text-slate-700 tabular-nums">
                  {product.rating}
                </span>
                <span className="text-xs text-slate-400 tabular-nums">
                  ({product.reviewsCount} verified reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mt-4">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  ₹{(product.discountPrice || product.price).toLocaleString()}
                </span>
                {product.discountPrice && product.discountPrice < product.price && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-800">Select Size</span>
                    <span className="text-slate-400">Selected: {selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-9 h-9 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedSize === s
                            ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                            : 'border-slate-200 text-slate-700 hover:border-slate-400 bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-800">Select Color</span>
                    <span className="text-slate-400">Selected: {selectedColor}</span>
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
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    +
                  </button>
                </div>

                <span
                  className={`text-xs font-medium ${
                    isOutOfStock
                      ? 'text-rose-600'
                      : product.stock < 10
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {isOutOfStock
                    ? 'Currently Out of Stock'
                    : product.stock < 10
                    ? `Only ${product.stock} items left`
                    : 'In Stock & Ready to Ship'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : isOutOfStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Item Added!</span>
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
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors ${
                    inWishlist
                      ? 'border-rose-200 bg-rose-50 text-rose-500'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <Link
                to={`/products/${product.id}`}
                onClick={onClose}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Full Product Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
