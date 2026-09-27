import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SimpleBarChart, SimpleLineChart } from '../../components/common/SimpleChart';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { orders, products, customers, updateOrderStatus } = useStore();
  const { showToast } = useToast();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'year'>('30d');

  // KPI Calculations
  const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending');
  const lowStockProducts = products.filter((p) => p.stock <= 10);

  // Chart data
  const monthlyRevenueData = [
    { label: 'May', value: 42000 },
    { label: 'Jun', value: 58000 },
    { label: 'Jul', value: 71000 },
    { label: 'Aug', value: 89000 },
    { label: 'Sep', value: totalSales },
  ];

  const salesTrendData = [
    { label: 'W1', value: 18500 },
    { label: 'W2', value: 24200 },
    { label: 'W3', value: 31000 },
    { label: 'W4', value: 38900 },
  ];

  // Top 5 products by salesCount
  const topProducts = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 5);

  const recentOrders = orders.slice(0, 5);

  const handleStatusChange = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order status updated to ${newStatus}`, 'success');
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Store Performance Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time analytics, inventory levels, and order fulfillment status for Urban Style Fashion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products/new"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
          >
            + Add New Product
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
          >
            Manage All Orders
          </Link>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Sales */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Sales</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
            ₹{totalSales.toLocaleString()}
          </p>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% this mo.</span>
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
            {totalOrders}
          </p>
          <span className="text-[11px] text-slate-400">Lifetime orders logged</span>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Customers</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
            {totalCustomers}
          </p>
          <span className="text-[11px] text-slate-400">Registered profiles</span>
        </div>

        {/* Active Products */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Products</span>
            <Package className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
            {totalProducts}
          </p>
          <span className="text-[11px] text-slate-400">Active catalog items</span>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-lg sm:text-xl font-black text-amber-600 tabular-nums">
            {pendingOrders.length}
          </p>
          <span className="text-[11px] text-amber-700 font-semibold">Requires fulfillment</span>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Low Stock</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-lg sm:text-xl font-black text-rose-600 tabular-nums">
            {lowStockProducts.length}
          </p>
          <span className="text-[11px] text-rose-700 font-semibold">Under 10 items left</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Overview (Bar chart) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Revenue Growth by Month
              </h2>
              <p className="text-xs text-slate-400">Total verified order volume</p>
            </div>
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md tabular-nums">
              ₹{totalSales.toLocaleString()} Total
            </span>
          </div>

          <SimpleBarChart data={monthlyRevenueData} height={200} color="#2563eb" />
        </div>

        {/* Weekly Sales Velocity (Line chart) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Weekly Sales Velocity
              </h2>
              <p className="text-xs text-slate-400">Current month cadence</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              +24% Weekly
            </span>
          </div>

          <SimpleLineChart data={salesTrendData} height={180} />
        </div>
      </div>

      {/* Tables Section: Recent Orders & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Recent Orders
              </h2>
              <p className="text-xs text-slate-400">Live order queue from customer storefront</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200/80">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      <Link to="/admin/orders" className="hover:text-blue-600">
                        {ord.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-slate-900">
                      <p className="font-semibold">{ord.customerName}</p>
                      <p className="text-[11px] text-slate-400 font-normal">{ord.shippingAddress.city}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(ord.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                      ₹{ord.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-slate-600 block">{ord.paymentMethod === 'Cash on Delivery' ? 'COD' : 'Online'}</span>
                      <span className={`text-[10px] font-semibold ${ord.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={ord.orderStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 font-medium focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Top Products
              </h2>
              <p className="text-xs text-slate-400">By sales volume</p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              Catalog
            </Link>
          </div>

          <div className="p-4 space-y-4 divide-y divide-slate-100">
            {topProducts.map((p) => (
              <div key={p.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-13 rounded-md bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                    <ImageWithFallback
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h3>
                    <p className="text-[11px] text-slate-400">
                      {p.category} · Stock: <strong className={p.stock < 10 ? 'text-rose-600 font-bold' : 'text-slate-700'}>{p.stock}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-slate-900 tabular-nums block">
                    {p.salesCount} sold
                  </span>
                  <span className="text-[11px] text-slate-400 tabular-nums">
                    ₹{((p.discountPrice || p.price) * p.salesCount).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
