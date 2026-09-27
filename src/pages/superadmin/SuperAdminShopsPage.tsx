import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { Shop } from '../../data/shops';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import { Search, Eye, Power, ExternalLink, RotateCcw, Filter, Building2 } from 'lucide-react';

export const SuperAdminShopsPage: React.FC = () => {
  const { shops, toggleShopStatus } = useStore();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = useMemo(() => {
    return shops.filter((s) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const mName = s.name.toLowerCase().includes(q);
        const mOwner = s.owner.toLowerCase().includes(q);
        const mEmail = s.email.toLowerCase().includes(q);
        const mCat = s.category.toLowerCase().includes(q);
        if (!mName && !mOwner && !mEmail && !mCat) return false;
      }
      if (planFilter !== 'All' && s.plan !== planFilter) return false;
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;
      return true;
    });
  }, [shops, search, planFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const handleToggle = (id: string, name: string) => {
    toggleShopStatus(id);
    showToast(`Status toggled for "${name}".`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Tenant Shops Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global directory of all onboarded merchant boutiques, plans, and statuses.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs tabular-nums">
          Total Merchants: {shops.length}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by shop name, owner, email, category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
          />
        </div>

        <select
          value={planFilter}
          onChange={(e) => {
            setPlanFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">All Plans</option>
          <option value="Starter">Starter (₹499)</option>
          <option value="Growth">Growth (₹999)</option>
          <option value="Business">Business (₹1,999)</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>

        {(search || planFilter !== 'All' || statusFilter !== 'All') && (
          <button
            onClick={() => {
              setSearch('');
              setPlanFilter('All');
              setStatusFilter('All');
              setCurrentPage(1);
            }}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 px-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Shop</th>
                <th className="py-3.5 px-4">Owner Contact</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Subscription Plan</th>
                <th className="py-3.5 px-4">Registered Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {paginated.map((shop) => (
                <tr key={shop.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {shop.logo}
                      </div>
                      <div>
                        <Link
                          to={`/superadmin/shops/${shop.id}`}
                          className="font-bold text-slate-900 hover:text-emerald-700"
                        >
                          {shop.name}
                        </Link>
                        <p className="text-[11px] text-slate-400 font-normal">
                          {shop.city} · {shop.productsCount} products
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    <p className="font-semibold">{shop.owner}</p>
                    <p className="text-[11px] text-slate-400 font-normal">{shop.email}</p>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">{shop.category}</td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {shop.plan}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {shop.registrationDate}
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={shop.status} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/superadmin/shops/${shop.id}`}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                      >
                        Inspect
                      </Link>

                      <button
                        onClick={() => handleToggle(shop.id, shop.name)}
                        className={`p-1.5 rounded transition-colors ${
                          shop.status === 'Active'
                            ? 'text-emerald-600 hover:text-emerald-700'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={`Toggle ${shop.status === 'Active' ? 'Deactivate' : 'Activate'}`}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};
