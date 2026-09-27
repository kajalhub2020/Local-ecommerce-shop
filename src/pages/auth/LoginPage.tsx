import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Lock,
  Mail,
  ShoppingBag,
  Store,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter a demo email.', 'error');
      return;
    }

    const trimmed = email.trim().toLowerCase();
    login(trimmed);

    if (trimmed.includes('super')) {
      showToast('Welcome, Super Admin! Redirecting to Platform HQ...', 'success');
      navigate('/superadmin');
    } else if (trimmed.includes('admin')) {
      showToast('Welcome, Merchant! Redirecting to Shop Admin...', 'success');
      navigate('/admin');
    } else {
      showToast('Welcome back! Redirecting to Customer Store...', 'success');
      navigate('/');
    }
  };

  const handleQuickLogin = (roleEmail: string, roleName: string, path: string) => {
    setEmail(roleEmail);
    setPassword('demo123');
    login(roleEmail);
    showToast(`Signed in as ${roleName}!`, 'success');
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center mx-auto shadow-sm">
          <Store className="w-6 h-6" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 font-display">
          LocalStore SaaS Demo Access
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Select a demo persona or log in below to explore role-specific experiences.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        {/* Quick 1-Click Role Login Cards */}
        <div className="space-y-3 mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
            One-Click Instant Roles
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Customer Store */}
            <button
              type="button"
              onClick={() => handleQuickLogin('customer@demo.com', 'Customer', '/')}
              className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-left transition-all shadow-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-slate-700 mb-1.5">
                  <ShoppingBag className="w-4 h-4 text-slate-900" />
                  <span className="text-[10px] text-slate-400 font-medium">Boutique</span>
                </div>
                <h2 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Customer
                </h2>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">customer@demo.com</p>
              </div>
              <span className="text-[10px] text-blue-600 font-bold mt-3 block">
                Enter Store &rarr;
              </span>
            </button>

            {/* Shop Admin */}
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@demo.com', 'Shop Admin', '/admin')}
              className="p-3.5 bg-white hover:bg-slate-50 border border-blue-200 hover:border-blue-400 rounded-xl text-left transition-all shadow-2xs group flex flex-col justify-between bg-blue-50/20"
            >
              <div>
                <div className="flex items-center justify-between text-blue-600 mb-1.5">
                  <Store className="w-4 h-4" />
                  <span className="text-[10px] text-blue-500 font-medium">Merchant</span>
                </div>
                <h2 className="text-xs font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                  Shop Admin
                </h2>
                <p className="text-[11px] text-blue-600 font-mono mt-0.5">admin@demo.com</p>
              </div>
              <span className="text-[10px] text-blue-700 font-bold mt-3 block">
                Enter Shop Admin &rarr;
              </span>
            </button>

            {/* Super Admin */}
            <button
              type="button"
              onClick={() => handleQuickLogin('superadmin@demo.com', 'Super Admin', '/superadmin')}
              className="p-3.5 bg-white hover:bg-slate-50 border border-emerald-200 hover:border-emerald-400 rounded-xl text-left transition-all shadow-2xs group flex flex-col justify-between bg-emerald-50/20"
            >
              <div>
                <div className="flex items-center justify-between text-emerald-600 mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] text-emerald-500 font-medium">Platform HQ</span>
                </div>
                <h2 className="text-xs font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                  Super Admin
                </h2>
                <p className="text-[11px] text-emerald-600 font-mono mt-0.5">superadmin@demo.com</p>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold mt-3 block">
                Enter Platform HQ &rarr;
              </span>
            </button>
          </div>
        </div>

        {/* Manual Login Card */}
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="text-center pb-2 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Or Sign In with Demo Credentials
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Default password for all demo accounts is: <strong className="text-slate-800 font-mono">demo123</strong>
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Demo Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@demo.com or customer@demo.com"
                  required
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
                />
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="demo123"
                  required
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
                />
                <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Authenticate & Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            <Link to="/" className="text-slate-600 hover:text-slate-900 font-semibold underline">
              Return to Customer Storefront without signing in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
