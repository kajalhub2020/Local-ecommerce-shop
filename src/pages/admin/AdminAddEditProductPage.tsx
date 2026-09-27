import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Upload,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

export const AdminAddEditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const { products, categories, addProduct, updateProduct } = useStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const existingProduct = isEditing ? products.find((p) => p.id === id) : null;

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Men',
    brand: 'Urban Style',
    description: '',
    price: '',
    discountPrice: '',
    stock: '15',
    status: 'active' as 'active' | 'inactive',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Olive'],
    images: [
      '/src/assets/images/category_men_collection_1790509047543.jpg',
    ],
    material: '',
    fit: '',
  });

  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing && existingProduct) {
      setFormData({
        name: existingProduct.name,
        sku: existingProduct.sku,
        category: existingProduct.category,
        brand: existingProduct.brand,
        description: existingProduct.description,
        price: existingProduct.price.toString(),
        discountPrice: existingProduct.discountPrice ? existingProduct.discountPrice.toString() : '',
        stock: existingProduct.stock.toString(),
        status: existingProduct.status,
        sizes: existingProduct.sizes || ['Standard'],
        colors: existingProduct.colors || ['Standard'],
        images: existingProduct.images.length > 0 ? existingProduct.images : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80'],
        material: existingProduct.specifications?.['Material'] || '',
        fit: existingProduct.specifications?.['Fit'] || '',
      });
    } else if (!isEditing) {
      const randomSku = `USF-NEW-${Math.floor(100 + Math.random() * 900)}`;
      setFormData((prev) => ({ ...prev, sku: randomSku }));
    }
  }, [isEditing, existingProduct]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Product title is required';
    if (!formData.sku.trim()) errs.sku = 'SKU identifier is required';
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Valid price is required';
    if (formData.discountPrice && Number(formData.discountPrice) >= Number(formData.price)) {
      errs.discountPrice = 'Discount price must be less than regular price';
    }
    if (!formData.stock || Number(formData.stock) < 0) errs.stock = 'Stock must be non-negative';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (formData.images.length === 0) errs.images = 'At least one product image is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSize = () => {
    if (sizeInput.trim() && !formData.sizes.includes(sizeInput.trim())) {
      setFormData({ ...formData, sizes: [...formData.sizes, sizeInput.trim()] });
      setSizeInput('');
    }
  };

  const handleRemoveSize = (sz: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter((s) => s !== sz) });
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !formData.colors.includes(colorInput.trim())) {
      setFormData({ ...formData, colors: [...formData.colors, colorInput.trim()] });
      setColorInput('');
    }
  };

  const handleRemoveColor = (clr: string) => {
    setFormData({ ...formData, colors: formData.colors.filter((c) => c !== clr) });
  };

  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setFormData({ ...formData, images: [...formData.images, imageUrlInput.trim()] });
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, idx) => idx !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix validation errors before saving.', 'error');
      return;
    }

    const priceNum = Number(formData.price);
    const discountNum = formData.discountPrice ? Number(formData.discountPrice) : priceNum;
    const stockNum = Number(formData.stock);

    const specs: Record<string, string> = {
      'Category': formData.category,
      'Brand': formData.brand,
    };
    if (formData.material) specs['Material'] = formData.material;
    if (formData.fit) specs['Fit'] = formData.fit;

    if (isEditing && id) {
      updateProduct(id, {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        price: priceNum,
        discountPrice: discountNum,
        stock: stockNum,
        status: formData.status,
        sizes: formData.sizes,
        colors: formData.colors,
        images: formData.images,
        specifications: specs,
      });
      showToast(`Product "${formData.name}" successfully updated!`, 'success');
    } else {
      addProduct({
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        price: priceNum,
        discountPrice: discountNum,
        stock: stockNum,
        status: formData.status,
        sizes: formData.sizes,
        colors: formData.colors,
        images: formData.images,
        rating: 5.0,
        reviewsCount: 1,
        specifications: specs,
        isNewArrival: true,
      });
      showToast(`Product "${formData.name}" created and published!`, 'success');
    }

    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-display">
              {isEditing ? `Edit Product: ${existingProduct?.name}` : 'Add New Garment / Accessory'}
            </h1>
            <p className="text-xs text-slate-500">
              Configure product details, variants, media, and pricing.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-2xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            1. Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Product Title *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Architect Minimalist Cotton Overshirt"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                  errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                SKU Identifier *
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="e.g. USF-MEN-101"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                  errors.sku ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.sku && <p className="text-[11px] text-rose-600 mt-1">{errors.sku}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Department / Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Brand / Atelier Label
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g. Urban Style"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Catalog Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white font-medium"
              >
                <option value="active">Active (Visible in Store)</option>
                <option value="inactive">Inactive (Draft / Hidden)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Product Description *
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe fabric weight, fit, stitching, and styling advice..."
                className={`w-full text-xs bg-slate-50 border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                  errors.description ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.description && <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-2xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            2. Pricing & Stock
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Original Price (₹) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="3499"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 tabular-nums focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                  errors.price ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.price && <p className="text-[11px] text-rose-600 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Discount Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                placeholder="2799 (Leave blank for no discount)"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 tabular-nums focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                  errors.discountPrice ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.discountPrice && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.discountPrice}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="24"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2.5 tabular-nums focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white ${
                  errors.stock ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.stock && <p className="text-[11px] text-rose-600 mt-1">{errors.stock}</p>}
            </div>
          </div>
        </div>

        {/* Variants: Sizes & Colors */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-2xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            3. Variants (Sizes & Colors)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Sizes Tag Editor */}
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Sizes ({formData.sizes.length})
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  placeholder="e.g. S, M, 42, 32"
                  className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="px-3 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[36px]">
                {formData.sizes.map((sz) => (
                  <span
                    key={sz}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200"
                  >
                    <span>{sz}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(sz)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Colors Tag Editor */}
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Colors ({formData.colors.length})
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  placeholder="e.g. Olive, Raw Indigo, Camel"
                  className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="px-3 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[36px]">
                {formData.colors.map((clr) => (
                  <span
                    key={clr}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200"
                  >
                    <span>{clr}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(clr)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Images with Preview & Remove */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-2xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            4. Product Imagery
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="Paste image URL (or select from generated assets)..."
              className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Add Image</span>
            </button>
          </div>
          {errors.images && <p className="text-[11px] text-rose-600">{errors.images}</p>}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {formData.images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 group bg-slate-50"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-full shadow-md hover:bg-rose-700 transition-colors"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded">
                  {idx === 0 ? 'Primary Cover' : `Gallery ${idx + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between pt-4">
          <Link
            to="/admin/products"
            className="px-5 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>{isEditing ? 'Update Product' : 'Create & Publish'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
