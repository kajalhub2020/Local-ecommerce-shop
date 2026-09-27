import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { useStore } from './StoreContext';

export interface CartItem {
  id: string; // unique item id: productId-size-color
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  moveToWishlistFromCart: (cartItemId: string) => void;
  // Calculations
  cartCount: number;
  subtotal: number;
  discount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  deliveryCharge: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storeSettings } = useStore();

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('localstore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('localstore_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('localstore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('localstore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const selectedColor = color || (product.colors && product.colors[0]) || 'Standard';
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          size: selectedSize,
          color: selectedColor,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const moveToWishlistFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    if (item) {
      if (!wishlist.includes(item.productId)) {
        setWishlist((prev) => [...prev, item.productId]);
      }
      removeFromCart(cartItemId);
    }
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, product.sizes[0] || 'M', product.colors[0] || 'Default', 1);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };

  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'URBAN10' || normalized === 'LOCAL20' || normalized === 'WELCOME') {
      setAppliedCoupon(normalized);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  // Coupon discount
  let couponDiscountAmount = 0;
  if (appliedCoupon === 'URBAN10') {
    couponDiscountAmount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'LOCAL20') {
    couponDiscountAmount = Math.round(subtotal * 0.2);
  } else if (appliedCoupon === 'WELCOME') {
    couponDiscountAmount = Math.min(300, Math.round(subtotal * 0.15));
  }

  const discount = couponDiscountAmount;

  // Delivery charge rule
  const deliveryCharge =
    subtotal === 0 || subtotal >= (storeSettings.freeDeliveryThreshold || 2000)
      ? 0
      : storeSettings.standardDeliveryFee || 99;

  const total = Math.max(0, subtotal - discount + deliveryCharge);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        moveToWishlistFromCart,
        cartCount,
        subtotal,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        deliveryCharge,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
