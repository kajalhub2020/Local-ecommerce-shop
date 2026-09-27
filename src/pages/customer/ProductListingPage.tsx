import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../data/products';
import { ProductCard } from '../../components/customer/ProductCard';
import { QuickViewModal } from '../../components/customer/QuickViewModal';
import { Pagination } from '../../components/common/Pagination';
import {
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  Search,
  RotateCcw,
  Star,
  X,
} from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const { products, categories } = useStore();
  const { wishlist } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state sync
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const wishlistOnly = searchParams.get('wishlist') === 'true';

  // Filter states
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const ITEMS_PER_PAGE = 8;

  // Sync url param updates
  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  // Extract all distinct sizes & colors
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes?.forEach((s) => set.add(s)));
    return ['All', ...Array.from(set)];
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.colors?.forEach((c) => set.add(c)));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Must be active
      if (p.status !== 'active') return false;

      // Wishlist view
      if (wishlistOnly && !wishlist.includes(p.id)) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesBrand && !matchesDesc) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Price filter
      const effectivePrice = p.discountPrice || p.price;
      if (effectivePrice > maxPrice) return false;

      // Rating filter
      if (minRating > 0 && p.rating < minRating) return false;

      // Size filter
      if (selectedSize !== 'All' && !p.sizes?.includes(selectedSize)) return false;

      // Color filter
      if (selectedColor !== 'All' && !p.colors?.includes(selectedColor)) return false;

      // Stock status filter
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    });
  }, [
    products,
    wishlistOnly,
    wishlist,
    searchQuery,
    selectedCategory,
    maxPrice,
    minRating,
    selectedSize,
    selectedColor,
    inStockOnly,
  ]);

  // Sorted products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.salesCount - a.salesCount);
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Paginated slice
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(10000);
    setMinRating(0);
    setSelectedSize('All');
    setSelectedColor('All');
    setInStockOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    setCurrentPage(1);
    if (catName === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900">
              {wishlistOnly ? 'Saved Wishlist' : selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </span>
          </nav>
          <h1 className="heading-card font-bold text-slate-900 font-display">
            {wishlistOnly
              ? 'Your Saved Items'
              : selectedCategory === 'All'
              ? 'The Complete Collection'
              : `${selectedCategory} Department`}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Drawer Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-slate-700 shadow-2xs"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="featured">Featured First</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Drops</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 hidden sm:flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 pr-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Filters & Facets
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search within results */}
          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search name, fabric, SKU..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-2">Category</label>
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryClick('All')}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between ${
                  selectedCategory === 'All'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>All Departments</span>
                <span className="tabular-nums opacity-75">{products.filter((p) => p.status === 'active').length}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="tabular-nums opacity-75">{cat.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label className="font-semibold text-slate-800">Max Price</label>
              <span className="font-bold text-slate-900 tabular-nums">
                ₹{maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹1,000</span>
              <span>₹10,000</span>
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-2">Size</label>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.slice(0, 8).map((sz) => (
                <button
                  key={sz}
                  onClick={() => {
                    setSelectedSize(sz);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                    selectedSize === sz
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-2">Color</label>
            <div className="flex flex-wrap gap-1.5">
              {allColors.slice(0, 8).map((clr) => (
                <button
                  key={clr}
                  onClick={() => {
                    setSelectedColor(clr);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                    selectedColor === clr
                      ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {clr}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-2">Minimum Rating</label>
            <div className="space-y-1">
              {[4, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => {
                    setMinRating(minRating === rating ? 0 : rating);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left text-xs px-2 py-1.5 rounded-md flex items-center justify-between ${
                    minRating === rating ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{rating} Stars & above</span>
                  </div>
                  {minRating === rating && <span className="text-[10px] text-amber-600">Active</span>}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <span>In-Stock Items Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Facets Row */}
          {(searchQuery || selectedCategory !== 'All' || maxPrice < 10000 || minRating > 0 || selectedSize !== 'All' || inStockOnly || wishlistOnly) && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400">Active Filters:</span>
              {wishlistOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                  Saved Wishlist
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  {selectedCategory}
                  <button onClick={() => handleCategoryClick('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {maxPrice < 10000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  Under ₹{maxPrice.toLocaleString()}
                  <button onClick={() => setMaxPrice(10000)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  ★ {minRating}+
                  <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedSize !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  In Stock
                  <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Items Count Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-800 tabular-nums">{sortedProducts.length}</strong> items
            </span>
          </div>

          {/* Empty State */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 stroke-1" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No matching garments found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find anything matching your selected filters. Try broadening your criteria or reset all filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {paginatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  viewMode={viewMode}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            totalItems={sortedProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Filter Catalog
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Department */}
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-2">Department</label>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryClick('All')}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md ${
                      selectedCategory === 'All' ? 'bg-slate-900 text-white font-bold' : 'text-slate-700'
                    }`}
                  >
                    All Departments
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCategoryClick(c.name)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md ${
                        selectedCategory === c.name ? 'bg-slate-900 text-white font-bold' : 'text-slate-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Max Price: ₹{maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* In stock */}
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>In-Stock Only</span>
              </label>
            </div>

            <div className="pt-6 border-t border-slate-200 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
