import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Tags,
  ShoppingBag,
  Users,
  Boxes,
  BarChart3,
  Settings,
  ArrowUpRight,
  Store,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { storeSettings, orders, products } = useStore();
  const { user } = useAuth();

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending').length;
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/products/new', label: 'Add Product', icon: PlusCircle },
    { to: '/admin/categories', label: 'Categories', icon: Tags },
    {
      to: '/admin/orders',
      label: 'Orders',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
    },
    { to: '/admin/customers', label: 'Customers', icon: Users },
    {
      to: '/admin/inventory',
      label: 'Inventory',
      icon: Boxes,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined,
      badgeColor: 'text-amber-700 bg-amber-100',
    },
    { to: '/admin/reports', label: 'Sales Reports', icon: BarChart3 },
    { to: '/admin/settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight leading-tight truncate w-36">
                {storeSettings.storeName}
              </h1>
              <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">
                Merchant Admin
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Store Management
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
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Storefront quick link & user status */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors"
          >
            <span className="font-medium">View Customer Store</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 text-xs font-bold">
              VS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user?.name || 'Vikram Sengupta'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                admin@urbanstyle.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
