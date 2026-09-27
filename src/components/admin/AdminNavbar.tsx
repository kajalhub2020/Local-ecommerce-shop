import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { Menu, Bell, ExternalLink, LogOut, CheckCircle2, ChevronRight } from 'lucide-react';

interface AdminNavbarProps {
  onToggleSidebar: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { orders, products, storeSettings } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending');
  const lowStockProducts = products.filter((p) => p.stock <= 10);
  const totalNotifications = pendingOrders.length + (lowStockProducts.length > 0 ? 1 : 0);

  // Derive simple breadcrumb
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentTitle =
    pathParts.length <= 1
      ? 'Dashboard'
      : pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-3 sm:px-6 lg:px-8">
      {/* Left: Mobile hamburger & Context breadcrumbs */}
      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 shrink-0"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm min-w-0">
          <span className="text-slate-400 font-medium hidden sm:inline truncate">Urban Style Shop Admin</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline shrink-0" />
          <span className="font-semibold text-slate-800 truncate">{currentTitle}</span>
        </div>
      </div>

      {/* Right: Quick actions, notifications & profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Storefront Link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span>Live Storefront</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors"
            aria-label="Store alerts"
          >
            <Bell className="w-4 h-4" />
            {totalNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Store Notifications
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {totalNotifications} new
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                {pendingOrders.length > 0 ? (
                  pendingOrders.map((ord) => (
                    <Link
                      key={ord.id}
                      to="/admin/orders"
                      onClick={() => setShowNotifications(false)}
                      className="block p-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-semibold text-slate-800">
                          New Order {ord.orderNumber}
                        </span>
                        <span className="text-[10px] text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                          Pending
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1">
                        {ord.customerName} ordered {ord.items.length} items (₹
                        {ord.totalAmount.toLocaleString()})
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-400 text-xs">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-500 stroke-1" />
                    All customer orders are currently up to date!
                  </div>
                )}

                {lowStockProducts.length > 0 && (
                  <Link
                    to="/admin/inventory"
                    onClick={() => setShowNotifications(false)}
                    className="block p-3 bg-amber-50/50 hover:bg-amber-50 transition-colors"
                  >
                    <span className="font-semibold text-amber-800">
                      Low Inventory Warning
                    </span>
                    <p className="text-amber-700 mt-0.5 text-[11px]">
                      {lowStockProducts.length} items have less than 10 units in stock.
                    </p>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown indicator */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">
              {user?.name?.split(' ')[0] || 'Shop Admin'}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Urban Style</p>
          </div>
        </div>
      </div>
    </header>
  );
};
