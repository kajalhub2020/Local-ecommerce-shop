import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Store, ShieldCheck, LogIn, ChevronDown, Check, Download, Code2 } from 'lucide-react';
import { CodebaseModal } from './CodebaseModal';

export const RoleSwitcher: React.FC = () => {
  const { user, role, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const currentRole = role || 'guest';

  const handleSelectRole = (newRole: 'customer' | 'admin' | 'superadmin') => {
    switchRole(newRole);
    setIsOpen(false);
    if (newRole === 'customer') {
      navigate('/');
    } else if (newRole === 'admin') {
      navigate('/admin');
    } else if (newRole === 'superadmin') {
      navigate('/superadmin');
    }
  };

  const getRoleLabel = () => {
    if (role === 'superadmin') return 'Super Admin';
    if (role === 'admin') return 'Shop Admin';
    if (role === 'customer') return 'Customer';
    return 'Guest';
  };

  return (
    <>
      <div className="bg-slate-900 text-white text-xs py-1.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Role info & direct switch */}
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto py-0.5 scrollbar-none w-full sm:w-auto">
            <span className="font-semibold text-slate-400 hidden lg:inline shrink-0 text-[11px] uppercase tracking-wider">
              DEMO:
            </span>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleSelectRole('customer')}
                className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs transition-colors whitespace-nowrap ${
                  location.pathname === '/' || location.pathname.startsWith('/products') || location.pathname.startsWith('/cart') || location.pathname.startsWith('/checkout')
                    ? 'bg-white text-slate-900 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>

              <button
                onClick={() => handleSelectRole('admin')}
                className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs transition-colors whitespace-nowrap ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Shop Admin</span>
              </button>

              <button
                onClick={() => handleSelectRole('superadmin')}
                className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs transition-colors whitespace-nowrap ${
                  location.pathname.startsWith('/superadmin')
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super Admin</span>
              </button>
            </div>
          </div>

          {/* Right: Code & ZIP buttons, plus Active user badge & Login link */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto sm:ml-0">
            {/* View Codebase Modal Trigger */}
            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors text-[11px] sm:text-xs border border-slate-700/60"
              title="Inspect Project Codebase"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Codebase</span>
            </button>

            {/* Direct ZIP Download Button */}
            <a
              href="/localstore-project.zip?v=2"
              download="localstore-project.zip"
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all text-[11px] sm:text-xs shadow-xs"
              title="Download localstore-project.zip"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </a>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-slate-200 hover:text-white px-1.5 py-1 rounded hover:bg-slate-800 transition-colors text-[11px] sm:text-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="hidden md:inline font-medium">{getRoleLabel()}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[11px] text-slate-500 font-medium">Logged in as</p>
                    <p className="font-semibold text-xs truncate">{user?.name || 'Guest'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleSelectRole('customer')}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                        <div>
                          <p className="font-medium">Customer View</p>
                          <p className="text-[10px] text-slate-500">customer@demo.com</p>
                        </div>
                      </div>
                      {currentRole === 'customer' && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </button>

                    <button
                      onClick={() => handleSelectRole('admin')}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <Store className="w-3.5 h-3.5 text-blue-600" />
                        <div>
                          <p className="font-medium">Shop Admin View</p>
                          <p className="text-[10px] text-slate-500">admin@demo.com</p>
                        </div>
                      </div>
                      {currentRole === 'admin' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>

                    <button
                      onClick={() => handleSelectRole('superadmin')}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <div>
                          <p className="font-medium">Super Admin View</p>
                          <p className="text-[10px] text-slate-500">superadmin@demo.com</p>
                        </div>
                      </div>
                      {currentRole === 'superadmin' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/login');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Open Login Credentials Page</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Codebase Viewer Modal */}
      <CodebaseModal isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
    </>
  );
};
