import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Customer } from '../../data/customers';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import { Search, Eye, X, Mail, Phone, MapPin, ShoppingBag, DollarSign } from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const { customers, orders } = useStore();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const itemsPerPage = 8;

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const mName = c.name.toLowerCase().includes(q);
        const mEmail = c.email.toLowerCase().includes(q);
        const mPhone = c.phone.toLowerCase().includes(q);
        const mCity = c.city.toLowerCase().includes(q);
        if (!mName && !mEmail && !mPhone && !mCity) return false;
      }
      return true;
    });
  }, [customers, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  // Customer orders
  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter(
      (o) =>
        o.email.toLowerCase() === selectedCustomer.email.toLowerCase() ||
        selectedCustomer.orders.includes(o.id)
    );
  }, [selectedCustomer, orders]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Customer Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            CRM database of patrons, order counts, and lifetime spending velocity.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs tabular-nums">
          Total Customers: {customers.length}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by customer name, email, phone, city..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4">Last Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                paginated.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">{c.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <p>{c.email}</p>
                      <p className="text-[11px] text-slate-400">{c.phone}</p>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">{c.city}</td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                      {c.totalOrders} {c.totalOrders === 1 ? 'order' : 'orders'}
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-slate-900 tabular-nums">
                      ₹{c.totalSpent.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {c.lastOrderDate}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={c.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Profile</span>
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

      {/* Customer Details Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div
            className="max-w-md w-full bg-white shadow-2xl h-full flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Customer Profile
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{selectedCustomer.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 text-xs">
                {/* Metric Summary */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] text-slate-400 block">Lifetime Spending</span>
                    <span className="text-base font-extrabold text-slate-900 tabular-nums">
                      ₹{selectedCustomer.totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] text-slate-400 block">Total Orders</span>
                    <span className="text-base font-extrabold text-slate-900 tabular-nums">
                      {selectedCustomer.totalOrders}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Contact Information
                  </h3>
                  <p className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedCustomer.email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedCustomer.phone}</span>
                  </p>
                  <p className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedCustomer.city}</span>
                  </p>
                </div>

                {/* Order History */}
                <div>
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                    Recent Purchase History
                  </h3>
                  {customerOrders.length === 0 ? (
                    <p className="text-slate-400 italic">No historical orders logged yet.</p>
                  ) : (
                    <div className="space-y-2 divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                      {customerOrders.map((ord) => (
                        <div key={ord.id} className="p-3 bg-white">
                          <div className="flex justify-between items-baseline">
                            <span className="font-mono font-bold text-slate-900">
                              {ord.orderNumber}
                            </span>
                            <span className="font-extrabold text-slate-900 tabular-nums">
                              ₹{ord.totalAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                            <span>{new Date(ord.date).toLocaleDateString()}</span>
                            <StatusBadge status={ord.orderStatus} size="sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
