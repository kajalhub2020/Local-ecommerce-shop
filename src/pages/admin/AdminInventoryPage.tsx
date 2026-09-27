import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { AlertTriangle, Boxes, CheckCircle2, Search, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';

export const AdminInventoryPage: React.FC = () => {
  const { products, updateProduct } = useStore();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');

  const lowStockThreshold = 10;
  const lowStockItems = products.filter((p) => p.stock > 0 && p.stock <= lowStockThreshold);
  const outOfStockItems = products.filter((p) => p.stock <= 0);

  const filteredProducts = products.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filter === 'low' && (p.stock <= 0 || p.stock > lowStockThreshold)) return false;
    if (filter === 'out' && p.stock > 0) return false;
    return true;
  });

  const handleStockAdjust = (id: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    updateProduct(id, { stock: newStock });
    showToast(`Stock updated to ${newStock} units.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Inventory & Stock Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor real-time warehouse counts, low-stock thresholds, and reorder levels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Stock levels synced with store state.', 'success')}
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Sync Warehouse</span>
          </button>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block">
              Low Stock Alert: {lowStockItems.length} items need replenishment
            </span>
            <p className="text-amber-800 mt-0.5">
              The following products have fewer than 10 units remaining in stock: {lowStockItems.map((i) => i.name).slice(0, 3).join(', ')}
              {lowStockItems.length > 3 ? ` and ${lowStockItems.length - 3} more.` : '.'}
            </p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search SKU or item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Items ({products.length})
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'low'
                ? 'bg-amber-500 text-white'
                : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            Low Stock ({lowStockItems.length})
          </button>
          <button
            onClick={() => setFilter('out')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'out'
                ? 'bg-rose-600 text-white'
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            Out of Stock ({outOfStockItems.length})
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Available Stock</th>
                <th className="py-3.5 px-4">Units Sold</th>
                <th className="py-3.5 px-4">Health Status</th>
                <th className="py-3.5 px-4 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map((p) => {
                const isOut = p.stock <= 0;
                const isLow = p.stock > 0 && p.stock <= lowStockThreshold;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 rounded bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                          <ImageWithFallback
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-[200px]">{p.name}</p>
                          <p className="text-[11px] text-slate-400 font-normal">{p.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 tabular-nums">
                      {p.sku}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-slate-900 text-sm tabular-nums">
                        {p.stock}
                      </span>{' '}
                      <span className="text-slate-400">units</span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-700 tabular-nums">
                      {p.salesCount} sold
                    </td>

                    <td className="py-3.5 px-4">
                      {isOut ? (
                        <StatusBadge status="Out of Stock" size="sm" />
                      ) : isLow ? (
                        <StatusBadge status="Low Stock" size="sm" />
                      ) : (
                        <StatusBadge status="In Stock" size="sm" />
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                        <button
                          onClick={() => handleStockAdjust(p.id, p.stock, -5)}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded font-bold transition-colors"
                          title="Deduct 5"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleStockAdjust(p.id, p.stock, -1)}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded font-bold transition-colors"
                          title="Deduct 1"
                        >
                          -1
                        </button>
                        <span className="px-2 font-mono font-bold text-slate-900 tabular-nums">
                          {p.stock}
                        </span>
                        <button
                          onClick={() => handleStockAdjust(p.id, p.stock, 1)}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded font-bold transition-colors"
                          title="Add 1"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleStockAdjust(p.id, p.stock, 10)}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-colors"
                          title="Restock 10"
                        >
                          +10
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
