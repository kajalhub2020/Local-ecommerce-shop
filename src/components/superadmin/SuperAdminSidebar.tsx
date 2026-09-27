import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  LayoutDashboard,
  Building2,
  CreditCard,
  TrendingUp,
  Settings,
  Users,
  Store,
  X,
} from 'lucide-react';

interface SuperAdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ isOpen, onClose }) => {
  const { shops } = useStore();
  const pendingShops = shops.filter((s) => s.status === 'Pending').length;

  const navItems = [
    { to: '/superadmin', label: 'Platform Dashboard', icon: LayoutDashboard, end: true },
    {
      to: '/superadmin/shops',
      label: 'All Shops',
      icon: Building2,
      badge: pendingShops > 0 ? `${pendingShops} pending` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    { to: '/superadmin/subscriptions', label: 'Subscription Plans', icon: CreditCard },
    { to: '/superadmin/customers', label: 'Platform Customers', icon: Users },
    { to: '/superadmin/analytics', label: 'Platform Analytics', icon: TrendingUp },
    { to: '/superadmin/settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">
                LocalStore SaaS
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                Super Admin HQ
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Multi-Tenant Controls
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick jump to Shop Admin */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-900/50">
          <Link
            to="/admin"
            className="flex items-center justify-between px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-blue-400" />
              <span>Switch to Shop Admin</span>
            </div>
          </Link>
          <div className="text-[11px] text-slate-400 px-1">
            SuperAdmin role grants multi-shop oversight and plan governance.
          </div>
        </div>
      </aside>
    </>
  );
};
