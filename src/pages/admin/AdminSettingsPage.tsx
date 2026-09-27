import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { Save, Store, Truck, Bell, Palette, RotateCcw } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { storeSettings, updateStoreSettings, resetAllDemoData } = useStore();
  const { showToast } = useToast();

  const [form, setForm] = useState({ ...storeSettings });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({ ...form });
    showToast('Store settings updated and persisted successfully!', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo catalog, orders, and settings back to factory defaults?')) {
      resetAllDemoData();
      showToast('All demo data restored to pristine state.', 'info');
      setTimeout(() => window.location.reload(), 600);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Store Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure boutique identity, shipping rates, and notification channels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            title="Reset demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Store Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Store className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              1. Store Profile & Contact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Store Name *
              </label>
              <input
                type="text"
                value={form.storeName}
                onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Merchant Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-800 block mb-1">
                Store Description
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-800 block mb-1">Street Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-800 block mb-1">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-800 block mb-1">Pincode</label>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Shipping Rules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Truck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              2. Shipping Rules & Free Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Standard Delivery Charge (₹)
              </label>
              <input
                type="number"
                value={form.standardDeliveryFee}
                onChange={(e) => setForm({ ...form, standardDeliveryFee: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 tabular-nums"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Express Delivery Charge (₹)
              </label>
              <input
                type="number"
                value={form.expressDeliveryFee}
                onChange={(e) => setForm({ ...form, expressDeliveryFee: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 tabular-nums"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Free Delivery Threshold (₹)
              </label>
              <input
                type="number"
                value={form.freeDeliveryThreshold}
                onChange={(e) => setForm({ ...form, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 tabular-nums"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Notification Automation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bell className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              3. Notifications & Low-Stock Alerts
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.orderNotificationEmail}
                onChange={(e) => setForm({ ...form, orderNotificationEmail: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">Instant Order Alert Emails</span>
                <span className="text-slate-400">Receive merchant dispatch email whenever a customer checkout succeeds.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.lowStockAlert}
                onChange={(e) => setForm({ ...form, lowStockAlert: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">Low Inventory Radar</span>
                <span className="text-slate-400">Alert merchant team when any SKU drops below 10 available units.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.customerSmsNotification}
                onChange={(e) => setForm({ ...form, customerSmsNotification: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">Customer Dispatch SMS</span>
                <span className="text-slate-400">Simulate SMS notifications with courier tracking link on status update.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 4: Storefront Appearance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Palette className="w-4 h-4 text-purple-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              4. Storefront Layout
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Layout Mode</label>
              <select
                value={form.storeLayout}
                onChange={(e) => setForm({ ...form, storeLayout: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
              >
                <option value="grid">Modern Boutique Grid</option>
                <option value="editorial">Editorial Lookbook Layout</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Primary Theme Tone</label>
              <select
                value={form.primaryThemeColor}
                onChange={(e) => setForm({ ...form, primaryThemeColor: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-medium"
              >
                <option value="#0f172a">Classic Charcoal / Slate (Default)</option>
                <option value="#1e3a8a">Midnight Navy</option>
                <option value="#14532d">Deep Forest</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
