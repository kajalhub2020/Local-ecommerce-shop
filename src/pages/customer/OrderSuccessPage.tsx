import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ExternalLink,
  MapPin,
  Calendar,
  CreditCard,
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useStore();

  const order = orders.find((o) => o.id === id) || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Order Not Found</h1>
        <Link to="/products" className="text-xs text-blue-600 font-bold hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success Badge & Message */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto animate-in zoom-in-50">
          <CheckCircle2 className="w-8 h-8 stroke-2" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Order Confirmed & Logged
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
            Thank you for your purchase!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2">
            Your order has been recorded in the LocalStore database and forwarded to <strong className="text-slate-800">Urban Style Fashion</strong>'s fulfillment queue.
          </p>
        </div>

        {/* Quick Order Info Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs">
          <div>
            <span className="text-slate-400">Order Ref:</span>{' '}
            <strong className="text-slate-900 font-mono">{order.orderNumber}</strong>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="text-slate-400">Estimated Delivery:</span>{' '}
            <strong className="text-slate-900">{order.estimatedDelivery}</strong>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="text-slate-400">Status:</span>{' '}
            <span className="font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded text-[11px]">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Quick Verification Link for Reviewer */}
        <div className="pt-2">
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-lg border border-blue-200 transition-colors"
          >
            <span>Verify Order in Shop Admin Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-2xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
          Order Summary & Delivery Logistics
        </h2>

        {/* Delivery Address & Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Shipping Address</span>
            </span>
            <p className="text-slate-700 font-semibold">{order.customerName}</p>
            <p className="text-slate-500">{order.shippingAddress.address}</p>
            <p className="text-slate-500">
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-slate-500">Phone: {order.phone}</p>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-slate-500" />
              <span>Payment & Courier</span>
            </span>
            <p className="text-slate-700">
              Method: <strong className="text-slate-900">{order.paymentMethod}</strong>
            </p>
            <p className="text-slate-700">
              Status:{' '}
              <span className="font-semibold text-emerald-700">{order.paymentStatus}</span>
            </p>
            <p className="text-slate-700">
              Service: <strong className="text-slate-900">{order.deliveryMethod} Priority</strong>
            </p>
          </div>
        </div>

        {/* Itemized List */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-800">Items in this shipment:</h3>
          <div className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} · Size: {item.size} · Color: {item.color}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-900 tabular-nums">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Totals */}
        <div className="border-t border-slate-200 pt-4 space-y-2 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              ₹{order.subtotal.toLocaleString()}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Discount</span>
              <span className="tabular-nums">-₹{order.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
            </span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 text-sm font-bold text-slate-900">
            <span>Total Paid</span>
            <span className="text-lg font-black tabular-nums">
              ₹{order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/products"
          className="px-6 py-3 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/"
          className="px-5 py-3 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
        >
          Back to Storefront Home
        </Link>
      </div>
    </div>
  );
};
