import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SimpleBarChart, SimpleLineChart } from '../../components/common/SimpleChart';
import {
  TrendingUp,
  Building2,
  DollarSign,
  Users,
  CreditCard,
  ShoppingBag,
} from 'lucide-react';

export const SuperAdminAnalyticsPage: React.FC = () => {
  const { shops, products, orders, customers } = useStore();

  const totalShops = shops.length;
  const platformGMV = shops.reduce((acc, s) => acc + s.revenue, 0);
  const totalOrders = shops.reduce((acc, s) => acc + s.ordersCount, 0);
  const totalProducts = shops.reduce((acc, s) => acc + s.productsCount, 0);

  const monthlyGMVData = [
    { label: 'May', value: 410000 },
    { label: 'Jun', value: 680000 },
    { label: 'Jul', value: 920000 },
    { label: 'Aug', value: 1450000 },
    { label: 'Sep', value: platformGMV },
  ];

  const planDistribution = [
    { label: 'Starter (₹499)', count: 2, share: 33 },
    { label: 'Growth (₹999)', count: 3, share: 50 },
    { label: 'Business (₹1,999)', count: 1, share: 17 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
          Platform-Wide Ecosystem Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Aggregated GMV, merchant transaction volume, and subscription health across all regions.
        </p>
      </div>

      {/* KPI 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Gross Platform GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">
            ₹{platformGMV.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">+34.8% QoQ Growth</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Total Enrolled Shops</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">{totalShops}</p>
          <span className="text-[11px] text-slate-500">6 Indian Metro Hubs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Processed Orders</span>
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">{totalOrders.toLocaleString()}</p>
          <span className="text-[11px] text-slate-500">99.8% Successful delivery</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Active Inventory SKUs</span>
            <CreditCard className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">{totalProducts}</p>
          <span className="text-[11px] text-slate-500">Live indexed products</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Quarterly GMV Velocity
              </h2>
              <p className="text-xs text-slate-400">Total customer checkout value across all shops</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              High Growth
            </span>
          </div>

          <SimpleBarChart data={monthlyGMVData} height={200} color="#059669" />
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Subscription Plan Mix
            </h2>
            <p className="text-xs text-slate-400">Active merchant tiers</p>
          </div>

          <div className="space-y-4 pt-2">
            {planDistribution.map((p) => (
              <div key={p.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-800">
                  <span>{p.label}</span>
                  <span className="tabular-nums">{p.count} shops ({p.share}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${p.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
