import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import {
  Trash2,
  Heart,
  ArrowRight,
  ShoppingBag,
  Tag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    moveToWishlistFromCart,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    deliveryCharge,
    total,
  } = useCart();
  const { storeSettings } = useStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingThreshold = storeSettings.freeDeliveryThreshold || 2000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      showToast(`Coupon "${couponInput.toUpperCase()}" applied successfully!`, 'success');
      setCouponInput('');
    } else {
      showToast('Invalid coupon code. Try URBAN10 or LOCAL20.', 'error');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Explore our seasonal outerwear, relaxed linen trousers, and artisanal leather accessories to begin building your order.
        </p>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4 flex items-baseline justify-between">
        <div>
          <h1 className="heading-section font-bold text-slate-900 font-display">
            Shopping Bag
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your chosen items before proceeding to secure checkout.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-600 tabular-nums">
          {cart.reduce((a, b) => a + b.quantity, 0)} Items
        </span>
      </div>

      {/* Free Delivery Bar */}
      <div className="bg-slate-100/80 p-4 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center justify-between font-semibold text-slate-800 mb-1.5">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-slate-700" />
            <span>
              {remainingForFreeShipping === 0
                ? 'Congratulations! You unlocked Free Standard Delivery.'
                : `Add ₹${remainingForFreeShipping.toLocaleString()} more to unlock Free Delivery`}
            </span>
          </div>
          <span className="tabular-nums">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items List (Left) + Order Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {cart.map((item) => {
              const price = item.product.discountPrice || item.product.price;
              const itemTotal = price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Item Thumbnail */}
                    <Link
                      to={`/products/${item.productId}`}
                      className="w-20 h-24 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100"
                    >
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </Link>

                    {/* Details */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {item.product.category}
                      </span>
                      <Link
                        to={`/products/${item.productId}`}
                        className="text-sm font-bold text-slate-900 hover:text-slate-700 block line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Size: <strong className="text-slate-800">{item.size}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-slate-800">{item.color}</strong></span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 tabular-nums pt-1 sm:hidden">
                        ₹{price.toLocaleString()} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                        ₹{itemTotal.toLocaleString()}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-slate-400 tabular-nums">
                          ₹{price.toLocaleString()} / item
                        </p>
                      )}
                    </div>

                    {/* Actions: Wishlist & Remove */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          moveToWishlistFromCart(item.id);
                          showToast(`Moved "${item.product.name}" to wishlist`, 'info');
                        }}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                        title="Move to wishlist"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          showToast(`Removed "${item.product.name}" from cart`, 'info');
                        }}
                        className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs pt-2">
            <Link to="/products" className="text-slate-600 hover:text-slate-900 font-medium">
              &larr; Continue shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Card (Right) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-2xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span className="tabular-nums">-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryCharge.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-900">Total Payable</span>
                <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2 border-t border-slate-100">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{appliedCoupon} APPLIED</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. URBAN10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Assurance */}
            <div className="pt-2 text-[11px] text-slate-400 space-y-1.5 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Encrypted Checkout</span>
              </div>
              <p>Cash on Delivery & Instant UPI Accepted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
