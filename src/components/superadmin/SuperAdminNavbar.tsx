import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, ChevronRight, ShieldCheck } from 'lucide-react';

interface SuperAdminNavbarProps {
  onToggleSidebar: () => void;
}

export const SuperAdminNavbar: React.FC<SuperAdminNavbarProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const location = useLocation();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentTitle =
    pathParts.length <= 1
      ? 'Overview'
      : pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Super Admin</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-slate-800">{currentTitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-md border border-emerald-200 hidden sm:inline">
          Platform Owner Access
        </span>
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">
              {user?.name || 'Platform Administrator'}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">superadmin@demo.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};
