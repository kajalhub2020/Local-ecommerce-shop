import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { ArrowRight, ChevronRight, Layers } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, products } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">Collections</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Store Departments</span>
          </span>
          <h1 className="heading-section font-bold text-slate-900 tracking-tight font-display mt-1">
            Shop by Category
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1.5">
            Explore our curated departments ranging from architecturally cut tailoring and denim to handcrafted footwear and leather accessories.
          </p>
        </div>
        <span className="text-xs font-medium text-slate-500 tabular-nums">
          {categories.length} Curated Departments
        </span>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((category) => {
          const catProducts = products.filter(
            (p) => p.category.toLowerCase() === category.name.toLowerCase() && p.status === 'active'
          );

          return (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-bold text-slate-900 tabular-nums shadow-xs">
                  {catProducts.length} items
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>{category.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Browse {category.name} Lineup</span>
                  <span className="text-blue-600 font-bold">Explore &rarr;</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
