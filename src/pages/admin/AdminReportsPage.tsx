import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SimpleBarChart, SimpleLineChart } from '../../components/common/SimpleChart';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  CreditCard,
  Download,
  Calendar,
} from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const { orders, products, customers } = useStore();
  const [timeFilter, setTimeFilter] = useState<'today' | '7d' | '30d' | 'year'>('30d');

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const totalCustomers = customers.length;

  const revenueTrend = [
    { label: 'Sep 01', value: 34000 },
    { label: 'Sep 08', value: 48000 },
    { label: 'Sep 15', value: 62000 },
    { label: 'Sep 22', value: 89000 },
    { label: 'Sep 27', value: totalRevenue },
  ];

  const ordersTrend = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 18 },
    { label: 'Wed', value: 24 },
    { label: 'Thu', value: 19 },
    { label: 'Fri', value: 32 },
    { label: 'Sat', value: 45 },
    { label: 'Sun', value: 38 },
  ];

  const categoryBreakdown = [
    { label: 'Men', value: 42, count: 148 },
    { label: 'Women', value: 36, count: 126 },
    { label: 'Footwear', value: 14, count: 49 },
    { label: 'Accessories', value: 8, count: 28 },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Sales & Commercial Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Financial ledger summaries, basket values, and category conversions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Date Filter Tabs */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs text-xs font-semibold text-slate-700">
            <button
              onClick={() => setTimeFilter('today')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeFilter === 'today' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeFilter('7d')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeFilter === '7d' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeFilter('30d')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeFilter === '30d' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeFilter('year')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeFilter === 'year' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
              }`}
            >
              This Year
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 transition-colors hidden sm:block"
            title="Export / Print Report"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs">
            <span className="font-bold uppercase tracking-wider">Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">
            ₹{totalRevenue.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+19.2% vs previous period</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs">
            <span className="font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">
            {totalOrders}
          </p>
          <span className="text-[11px] text-slate-500">100% fulfillment rate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs">
            <span className="font-bold uppercase tracking-wider">Average Basket Size</span>
            <CreditCard className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">
            ₹{avgOrderValue.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">+8.4% upsell value</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs">
            <span className="font-bold uppercase tracking-wider">Active Customers</span>
            <Users className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">
            {totalCustomers}
          </p>
          <span className="text-[11px] text-slate-500">84% repeat purchase rate</span>
        </div>
      </div>

      {/* Chart Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Over Time */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Revenue Trajectory
              </h2>
              <p className="text-xs text-slate-400">Paced against monthly revenue quotas</p>
            </div>
            <span className="text-xs font-bold text-slate-900 tabular-nums">
              ₹{totalRevenue.toLocaleString()}
            </span>
          </div>

          <SimpleBarChart data={revenueTrend} height={200} color="#2563eb" />
        </div>

        {/* Category Contribution */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Department Share
            </h2>
            <p className="text-xs text-slate-400">By units sold</p>
          </div>

          <div className="space-y-3 pt-2">
            {categoryBreakdown.map((cat) => (
              <div key={cat.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-800">
                  <span>{cat.label}</span>
                  <span className="tabular-nums">{cat.value}% ({cat.count} units)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${cat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
