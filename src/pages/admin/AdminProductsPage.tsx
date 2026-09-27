import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Power,
  RotateCcw,
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, deleteProduct, toggleProductStatus } = useStore();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('All'); // 'All' | 'in_stock' | 'low_stock' | 'out_of_stock'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'active' | 'inactive'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered Products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const mName = p.name.toLowerCase().includes(q);
        const mSku = p.sku.toLowerCase().includes(q);
        const mCat = p.category.toLowerCase().includes(q);
        if (!mName && !mSku && !mCat) return false;
      }
      // Category
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Status
      if (statusFilter !== 'All' && p.status !== statusFilter) {
        return false;
      }
      // Stock
      if (stockFilter === 'in_stock' && p.stock < 10) return false;
      if (stockFilter === 'low_stock' && (p.stock > 10 || p.stock === 0)) return false;
      if (stockFilter === 'out_of_stock' && p.stock > 0) return false;

      return true;
    });
  }, [products, search, selectedCategory, statusFilter, stockFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      showToast(`Product "${name}" deleted.`, 'info');
    }
  };

  const handleToggle = (id: string, name: string) => {
    toggleProductStatus(id);
    showToast(`Status toggled for "${name}".`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your store's inventory, variants, prices, and publishing status.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, SKU, category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Stock filter */}
        <select
          value={stockFilter}
          onChange={(e) => {
            setStockFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">All Stock Levels</option>
          <option value="in_stock">In Stock (10+)</option>
          <option value="low_stock">Low Stock (&le; 10)</option>
          <option value="out_of_stock">Out of Stock (0)</option>
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>

        {(search || selectedCategory !== 'All' || stockFilter !== 'All' || statusFilter !== 'All') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setStockFilter('All');
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

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No products match the selected criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                          <ImageWithFallback
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-[200px]">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-slate-400 font-normal">
                            Brand: {product.brand} · {product.sizes?.join(', ')}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 tabular-nums">
                      {product.sku}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      {product.category}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 tabular-nums">
                        ₹{(product.discountPrice || product.price).toLocaleString()}
                      </span>
                      {product.discountPrice && (
                        <span className="text-[10px] text-slate-400 line-through tabular-nums block">
                          ₹{product.price.toLocaleString()}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`font-semibold tabular-nums ${
                          product.stock <= 0
                            ? 'text-rose-600 font-bold'
                            : product.stock < 10
                            ? 'text-amber-600 font-bold'
                            : 'text-slate-800'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={product.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View in Storefront */}
                        <Link
                          to={`/products/${product.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded transition-colors"
                          title="View live on storefront"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        {/* Toggle Status */}
                        <button
                          onClick={() => handleToggle(product.id, product.name)}
                          className={`p-1.5 rounded transition-colors ${
                            product.status === 'active'
                              ? 'text-emerald-600 hover:text-emerald-700'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title={`Toggle ${product.status === 'active' ? 'Inactive' : 'Active'}`}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
