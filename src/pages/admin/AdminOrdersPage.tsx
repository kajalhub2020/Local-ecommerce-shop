import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { Order } from '../../data/orders';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import {
  Search,
  Filter,
  Eye,
  X,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  CreditCard,
} from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const itemsPerPage = 8;

  // Filtered orders
  const filtered = useMemo(() => {
    return orders.filter((o) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const mNum = o.orderNumber.toLowerCase().includes(q);
        const mName = o.customerName.toLowerCase().includes(q);
        const mEmail = o.email.toLowerCase().includes(q);
        if (!mNum && !mName && !mEmail) return false;
      }
      // Status
      if (statusFilter !== 'All' && o.orderStatus !== statusFilter) {
        return false;
      }
      // Payment
      if (paymentFilter !== 'All') {
        if (paymentFilter === 'Paid' && o.paymentStatus !== 'Paid') return false;
        if (paymentFilter === 'Pending' && o.paymentStatus !== 'Pending') return false;
      }
      return true;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const handleUpdateStatus = (orderId: string, newStatus: Order['orderStatus']) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
    showToast(`Order status updated to ${newStatus}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Order Fulfillment Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track customer orders, manage statuses, and inspect shipping addresses.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs tabular-nums">
            Total Orders: {orders.length}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Order ID, Customer Name, Email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">All Order Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Payment Filter */}
        <select
          value={paymentFilter}
          onChange={(e) => {
            setPaymentFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Payment Pending</option>
        </select>

        {(search || statusFilter !== 'All' || paymentFilter !== 'All') && (
          <button
            onClick={() => {
              setSearch('');
              setStatusFilter('All');
              setPaymentFilter('All');
              setCurrentPage(1);
            }}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 px-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {ord.orderNumber}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(ord.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{ord.customerName}</p>
                      <p className="text-[11px] text-slate-400 font-normal">{ord.email}</p>
                    </td>

                    <td className="py-3.5 px-4 tabular-nums text-slate-700">
                      {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                      ₹{ord.totalAmount.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="text-[11px] text-slate-600">{ord.paymentMethod === 'Cash on Delivery' ? 'COD' : 'Online'}</p>
                      <span
                        className={`text-[10px] font-semibold ${
                          ord.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {ord.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={ord.orderStatus} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div
            className="max-w-xl w-full bg-white shadow-2xl h-full flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Order Details
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 font-mono">
                    {selectedOrder.orderNumber}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Update Quick Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Status:</span>
                  <StatusBadge status={selectedOrder.orderStatus} />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Update to:</span>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as any)}
                    className="text-xs bg-white border border-slate-300 rounded-md px-2 py-1 font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6 text-xs">
                {/* Customer & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50/60 border border-slate-200/60">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block mb-1">Customer Info</span>
                    <p className="font-semibold text-slate-800">{selectedOrder.customerName}</p>
                    <p className="text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{selectedOrder.email}</span>
                    </p>
                    <p className="text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{selectedOrder.phone}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block mb-1">Shipping Destination</span>
                    <p className="text-slate-600">{selectedOrder.shippingAddress.address}</p>
                    <p className="text-slate-600">
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                    </p>
                    <p className="text-slate-500 font-semibold pt-0.5">
                      Service: {selectedOrder.deliveryMethod} Priority
                    </p>
                  </div>
                </div>

                {/* Items in order */}
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Purchased Items ({selectedOrder.items.length})
                  </h3>
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between gap-3">
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

                {/* Payment Breakdown */}
                <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/60 space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-semibold">₹{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span className="tabular-nums font-semibold">-₹{selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Charge</span>
                    <span className="tabular-nums font-semibold">
                      {selectedOrder.deliveryCharge === 0 ? 'FREE' : `₹${selectedOrder.deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold pt-2 border-t border-slate-200 text-sm">
                    <span>Grand Total</span>
                    <span className="tabular-nums font-black">₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Order Audit Timeline
                  </h3>
                  <div className="space-y-3 relative pl-6 border-l-2 border-slate-200">
                    {selectedOrder.timeline?.map((step, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-900 ring-4 ring-white" />
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-800">{step.title}</p>
                          <span className="text-[10px] text-slate-400">{step.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
