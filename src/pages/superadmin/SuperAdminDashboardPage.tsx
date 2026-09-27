import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SimpleBarChart, SimpleLineChart } from '../../components/common/SimpleChart';
import {
  Building2,
  DollarSign,
  Users,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Power,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const SuperAdminDashboardPage: React.FC = () => {
  const { shops, toggleShopStatus, customers, orders } = useStore();
  const { showToast } = useToast();

  const totalShops = shops.length;
  const activeShops = shops.filter((s) => s.status === 'Active').length;
  const inactiveShops = shops.filter((s) => s.status === 'Inactive').length;
  const pendingShops = shops.filter((s) => s.status === 'Pending').length;

  const platformRevenue = shops.reduce((acc, s) => acc + s.revenue, 0);
  const platformOrders = shops.reduce((acc, s) => acc + s.ordersCount, 0);

  const monthlySubscriptionsRevenue = [
    { label: 'May', value: 18500 },
    { label: 'Jun', value: 24900 },
    { label: 'Jul', value: 32400 },
    { label: 'Aug', value: 41800 },
    { label: 'Sep', value: 54900 },
  ];

  const shopsGrowthData = [
    { label: 'May', value: 2 },
    { label: 'Jun', value: 3 },
    { label: 'Jul', value: 4 },
    { label: 'Aug', value: 5 },
    { label: 'Sep', value: totalShops },
  ];

  const handleToggle = (shopId: string, name: string) => {
    toggleShopStatus(shopId);
    showToast(`Status updated for shop "${name}".`, 'info');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            LocalStore Platform HQ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global multi-tenant metrics across all enrolled local boutiques and neighborhood shops.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/superadmin/shops"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
          >
            Manage All {totalShops} Shops
          </Link>
        </div>
      </div>

      {/* 6 Platform Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Shops</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-black text-slate-900 tabular-nums">{totalShops}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">+2 new this month</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Tenants</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-black text-emerald-600 tabular-nums">{activeShops}</p>
          <span className="text-[11px] text-slate-400">Live storefronts</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Approval</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-black text-amber-600 tabular-nums">{pendingShops}</p>
          <span className="text-[11px] text-amber-700 font-semibold">Requires KYC audit</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl font-black text-slate-900 tabular-nums">
            {platformOrders.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Across all merchants</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Customers</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-xl font-black text-slate-900 tabular-nums">1,420</p>
          <span className="text-[11px] text-slate-400">Platform shopper base</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Platform GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-black text-slate-900 tabular-nums">
            ₹{(platformRevenue / 100000).toFixed(1)}L
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">Gross Merchandise Value</span>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Monthly SaaS Subscriptions MRR
              </h2>
              <p className="text-xs text-slate-400">Platform recurring membership revenue</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              ₹54,900 / mo
            </span>
          </div>
          <SimpleBarChart data={monthlySubscriptionsRevenue} height={190} color="#059669" />
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Merchant Onboarding Trajectory
              </h2>
              <p className="text-xs text-slate-400">Total registered shops</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Steady Growth
            </span>
          </div>
          <SimpleLineChart data={shopsGrowthData} height={170} />
        </div>
      </div>

      {/* Recent Shops Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Tenant Shops Overview
            </h2>
            <p className="text-xs text-slate-400">Active and pending shop registrations</p>
          </div>
          <Link
            to="/superadmin/shops"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>Full Directory</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Shop</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">GMV Volume</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {shops.map((shop) => (
                <tr key={shop.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {shop.logo}
                      </div>
                      <div>
                        <Link
                          to={`/superadmin/shops/${shop.id}`}
                          className="font-bold text-slate-900 hover:text-emerald-700"
                        >
                          {shop.name}
                        </Link>
                        <p className="text-[11px] text-slate-400 font-normal">{shop.city}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    <p className="font-semibold">{shop.owner}</p>
                    <p className="text-[11px] text-slate-400 font-normal">{shop.email}</p>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">{shop.category}</td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {shop.plan}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                    ₹{shop.revenue.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={shop.status} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/superadmin/shops/${shop.id}`}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                      >
                        Inspect
                      </Link>

                      <button
                        onClick={() => handleToggle(shop.id, shop.name)}
                        className={`p-1.5 rounded transition-colors ${
                          shop.status === 'Active'
                            ? 'text-emerald-600 hover:text-emerald-700'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={`Toggle ${shop.status === 'Active' ? 'Deactivate' : 'Activate'}`}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
