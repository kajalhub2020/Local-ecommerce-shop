import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, Save, Server, CreditCard, Bell, Key } from 'lucide-react';

export const SuperAdminSettingsPage: React.FC = () => {
  const { showToast } = useToast();

  const [settings, setSettings] = useState({
    platformName: 'LocalStore SaaS Platform',
    supportEmail: 'hq@localstore.io',
    transactionCommissionRate: 2.5,
    payoutSchedule: 'Weekly (Every Monday)',
    maintenanceMode: false,
    autoApproveMerchants: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform settings saved successfully!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            SaaS Platform Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global monetization rules, merchant onboarding policies, and gateway parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Policy</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General SaaS Config */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Server className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              1. Platform Brand & Inquiries
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Platform Name
              </label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Super Admin Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Monetization & Take Rates */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              2. Transaction Commission & Settlement
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Platform Take Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={settings.transactionCommissionRate}
                onChange={(e) =>
                  setSettings({ ...settings, transactionCommissionRate: Number(e.target.value) })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 tabular-nums"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard platform commission applied to customer orders.
              </span>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Merchant Settlement Cadence
              </label>
              <select
                value={settings.payoutSchedule}
                onChange={(e) => setSettings({ ...settings, payoutSchedule: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
              >
                <option value="Daily T+1">Daily T+1 Automatic Payout</option>
                <option value="Weekly (Every Monday)">Weekly (Every Monday)</option>
                <option value="Bi-Weekly">Bi-Weekly Settlement</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Flags */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-slate-700" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              3. Operational Switches
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoApproveMerchants}
                onChange={(e) =>
                  setSettings({ ...settings, autoApproveMerchants: e.target.checked })
                }
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">
                  Automatic Merchant Onboarding
                </span>
                <span className="text-slate-400">
                  Allow new boutique registrations to immediately test their sandbox store.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  setSettings({ ...settings, maintenanceMode: e.target.checked })
                }
                className="rounded border-slate-300 text-rose-600 focus:ring-rose-600"
              />
              <div>
                <span className="font-semibold text-slate-800 block">
                  Global Maintenance Switch
                </span>
                <span className="text-slate-400">
                  Temporary lock on merchant dashboard logins during planned database migrations.
                </span>
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
