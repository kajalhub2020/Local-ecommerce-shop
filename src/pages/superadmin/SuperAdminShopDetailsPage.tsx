import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Power,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const SuperAdminShopDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { shops, toggleShopStatus } = useStore();
  const { showToast } = useToast();

  const shop = shops.find((s) => s.id === id) || shops[0];

  if (!shop) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Shop Not Found</h1>
        <Link to="/superadmin/shops" className="text-xs text-emerald-700 font-bold hover:underline">
          Return to directory
        </Link>
      </div>
    );
  }

  const handleToggle = () => {
    toggleShopStatus(shop.id);
    showToast(`Status toggled for "${shop.name}".`, 'info');
  };

  const activityHistory = [
    { title: 'Catalog Synced', time: 'Sep 26, 2026', desc: 'Added 4 new product SKUs to Autumn collection' },
    { title: 'Billing Settled', time: 'Sep 01, 2026', desc: `Subscription renewed under ${shop.plan} tier` },
    { title: 'Merchant Verified', time: shop.registrationDate, desc: 'KYC documents and business registration approved' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/superadmin/shops"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Shops</span>
        </Link>

        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            shop.status === 'Active'
              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{shop.status === 'Active' ? 'Deactivate Merchant' : 'Activate Merchant'}</span>
        </button>
      </div>

      {/* Main Shop Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-black text-xl flex items-center justify-center shadow-sm">
              {shop.logo}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {shop.name}
                </h1>
                <StatusBadge status={shop.status} />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {shop.category} · {shop.city} · Registered on {shop.registrationDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={shop.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <span>{shop.storeUrl.replace('https://', '')}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
          <p className="text-xl font-black text-slate-900 tabular-nums">₹{shop.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
          <p className="text-xl font-black text-slate-900 tabular-nums">{shop.ordersCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Catalog SKUs</span>
          <p className="text-xl font-black text-slate-900 tabular-nums">{shop.productsCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Customer Rating</span>
          <p className="text-xl font-black text-slate-900 tabular-nums">{shop.rating} / 5</p>
        </div>
      </div>

      {/* Details Grid: Owner & Subscription + Audit History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Owner & Subscription Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5 text-xs">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Merchant Contact & Owner Info
            </h2>
            <dl className="mt-3 space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Business Owner:</span>
                <span className="font-semibold text-slate-900">{shop.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Email:</span>
                <span className="font-semibold text-slate-900">{shop.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-900">{shop.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">City / Jurisdiction:</span>
                <span className="font-semibold text-slate-900">{shop.city}, India</span>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              SaaS Plan & Entitlements
            </h2>
            <dl className="mt-3 space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Active Tier:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {shop.plan} Plan
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Billing Cadence:</span>
                <span className="font-semibold text-slate-900">Monthly Auto-Debit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Custom Domain:</span>
                <span className="font-semibold text-slate-900">Provisioned (Active)</span>
              </div>
            </dl>
          </div>
        </div>

        {/* Activity & Audit History */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            Tenant Audit Trail
          </h2>

          <div className="space-y-4 text-xs relative pl-5 border-l-2 border-slate-200">
            {activityHistory.map((step, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-white" />
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{step.title}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{step.time}</span>
                </div>
                <p className="text-slate-500 mt-0.5 text-[11px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
