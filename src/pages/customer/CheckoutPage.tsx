import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, discount, appliedCoupon, clearCart } = useCart();
  const { createOrder, storeSettings } = useStore();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form states initialized with demo user info if available
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Aarav Sharma',
    email: user?.email || 'customer@demo.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Skyline Residency, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    deliveryMethod: 'Standard' as 'Standard' | 'Express',
    paymentMethod: 'Demo Online Payment' as 'Cash on Delivery' | 'Demo Online Payment',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery fee calculation
  const deliveryCharge =
    formData.deliveryMethod === 'Express'
      ? storeSettings.expressDeliveryFee || 199
      : subtotal >= (storeSettings.freeDeliveryThreshold || 2000)
      ? 0
      : storeSettings.standardDeliveryFee || 99;

  const grandTotal = Math.max(0, subtotal - discount + deliveryCharge);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Your bag is empty</h1>
        <p className="text-xs text-slate-500">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit mobile number required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errs.pincode = '6-digit postal code required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the highlighted fields.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.discountPrice || item.product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.product.images[0],
      }));

      const deliveryDays = formData.deliveryMethod === 'Express' ? 2 : 4;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
      const estimatedDeliveryStr = deliveryDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      const newOrder = createOrder({
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        deliveryMethod: formData.deliveryMethod,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === 'Demo Online Payment' ? 'Paid' : 'Pending',
        orderStatus: 'Confirmed',
        items: orderItems,
        subtotal,
        discount,
        deliveryCharge,
        totalAmount: grandTotal,
        estimatedDelivery: estimatedDeliveryStr,
        notes: formData.notes,
      });

      clearCart();
      setIsProcessing(false);
      showToast(`Order #${newOrder.orderNumber} successfully placed!`, 'success');
      navigate(`/order-success/${newOrder.id}`);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/cart" className="hover:text-slate-900 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">Secure Checkout</span>
      </nav>

      {/* Main Grid: Form (Left) + Order Summary (Right) */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer Information */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Customer Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                    errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                    errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                    errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Shipping Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Flat / House No. / Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Flat 402, Skyline Residency, Bandra West"
                  className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                    errors.address ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Mumbai"
                  className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                    errors.city ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Maharashtra"
                  className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                    errors.state ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.state && <p className="text-[11px] text-rose-600 mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">Pincode *</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="e.g. 400050"
                  className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                    errors.pincode ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.pincode && <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Delivery Notes (Optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Ring buzzer 402 or leave at security"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Method */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Delivery Cadence
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.deliveryMethod === 'Standard'
                    ? 'border-slate-900 bg-slate-50/70 shadow-xs ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={formData.deliveryMethod === 'Standard'}
                  onChange={() => setFormData({ ...formData, deliveryMethod: 'Standard' })}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Standard Delivery</span>
                    <span className="text-xs font-bold text-slate-900">
                      {subtotal >= 2000 ? 'FREE' : '₹99'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Delivered in 3–5 business days via BlueDart Ground.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.deliveryMethod === 'Express'
                    ? 'border-slate-900 bg-slate-50/70 shadow-xs ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={formData.deliveryMethod === 'Express'}
                  onChange={() => setFormData({ ...formData, deliveryMethod: 'Express' })}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Express Priority</span>
                    <span className="text-xs font-bold text-slate-900">₹199</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Priority dispatch delivered in 1–2 business days.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Payment Option
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'Demo Online Payment'
                    ? 'border-slate-900 bg-slate-50/70 shadow-xs ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'Demo Online Payment'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'Demo Online Payment' })}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">Demo Online Payment</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Instant simulator (UPI, Cards, NetBanking). No real money charged.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'Cash on Delivery'
                    ? 'border-slate-900 bg-slate-50/70 shadow-xs ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'Cash on Delivery'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'Cash on Delivery' })}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Pay in cash or UPI QR upon receiving shipment.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-2xs sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
              Order Breakdown ({cart.length} items)
            </h3>

            {/* Item Mini List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3">
                  <div className="w-12 h-14 rounded bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-semibold text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} · {item.size} · {item.color}
                    </p>
                    <p className="font-bold text-slate-800 tabular-nums">
                      ₹{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
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
                <span>Shipping ({formData.deliveryMethod})</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-900">Total Payable</span>
                <span className="text-xl font-black text-slate-900 tabular-nums">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order (₹{grandTotal.toLocaleString()})</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              By placing this order you simulate a local merchant purchase in LocalStore SaaS.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
