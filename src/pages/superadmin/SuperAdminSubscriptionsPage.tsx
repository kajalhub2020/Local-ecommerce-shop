import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { SubscriptionPlan } from '../../data/subscriptions';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CreditCard, Check, Edit, Power, X, Plus } from 'lucide-react';

export const SuperAdminSubscriptionsPage: React.FC = () => {
  const { subscriptionPlans, updateSubscriptionPlan, shops } = useStore();
  const { showToast } = useToast();

  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [price, setPrice] = useState(0);
  const [productLimit, setProductLimit] = useState(100);
  const [tagline, setTagline] = useState('');

  const handleOpenEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setPrice(plan.priceMonthly);
    setProductLimit(plan.productLimit);
    setTagline(plan.tagline);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    updateSubscriptionPlan(editingPlan.id, {
      priceMonthly: price,
      productLimit,
      tagline,
    });

    showToast(`Plan "${editingPlan.name}" updated successfully!`, 'success');
    setModalOpen(false);
  };

  const handleToggleStatus = (plan: SubscriptionPlan) => {
    const newStatus = plan.status === 'active' ? 'inactive' : 'active';
    updateSubscriptionPlan(plan.id, { status: newStatus });
    showToast(`Plan "${plan.name}" set to ${newStatus}.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            SaaS Subscription Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure merchant packaging tiers, feature matrices, and monthly subscription tariffs.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
          3 Commercial Tiers Configured
        </div>
      </div>

      {/* Subscription Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => {
          const enrolledShops = shops.filter((s) => s.plan === plan.name);

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-2xs relative ${
                plan.popular ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-slate-200/80'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-3 py-0.5 rounded-full shadow-xs">
                  Most Popular for Boutiques
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">{plan.name}</h2>
                  <StatusBadge status={plan.status} size="sm" />
                </div>

                <p className="text-xs text-slate-500 mt-1.5 min-h-[36px] leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900 tabular-nums">
                    ₹{plan.priceMonthly.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl mt-4 text-xs flex justify-between items-center text-slate-700">
                  <span>Product Limit:</span>
                  <strong className="font-bold text-slate-900">
                    {plan.productLimit > 10000 ? 'Unlimited' : `${plan.productLimit} SKUs`}
                  </strong>
                </div>

                {/* Features List */}
                <div className="pt-4 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Included Features
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold tabular-nums">
                  {enrolledShops.length} Active {enrolledShops.length === 1 ? 'Shop' : 'Shops'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(plan)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Tier</span>
                  </button>

                  <button
                    onClick={() => handleToggleStatus(plan)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded transition-colors"
                    title={`Toggle ${plan.status === 'active' ? 'Inactive' : 'Active'}`}
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Plan Modal */}
      {modalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Edit Subscription: {editingPlan.name}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Monthly Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 tabular-nums"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Product Catalog Limit
                </label>
                <input
                  type="number"
                  value={productLimit}
                  onChange={(e) => setProductLimit(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 tabular-nums"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Tagline</label>
                <textarea
                  rows={2}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-2xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
