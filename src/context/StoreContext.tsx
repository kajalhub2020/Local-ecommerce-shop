import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, initialProducts } from '../data/products';
import { Category, initialCategories } from '../data/categories';
import { Order, initialOrders } from '../data/orders';
import { Customer, initialCustomers } from '../data/customers';
import { Shop, initialShops } from '../data/shops';
import { SubscriptionPlan, initialSubscriptionPlans } from '../data/subscriptions';
import { StoreSettings, defaultStoreSettings } from '../data/storeSettings';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  shops: Shop[];
  subscriptionPlans: SubscriptionPlan[];
  storeSettings: StoreSettings;
  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'salesCount'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  // Category actions
  addCategory: (category: Omit<Category, 'id' | 'productCount'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  // Order actions
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'timeline'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  // Customer actions
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  // Shop actions
  toggleShopStatus: (id: string) => void;
  updateShop: (id: string, updates: Partial<Shop>) => void;
  // Subscription actions
  updateSubscriptionPlan: (id: string, updates: Partial<SubscriptionPlan>) => void;
  // Store Settings actions
  updateStoreSettings: (updates: Partial<StoreSettings>) => void;
  resetAllDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('localstore_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Load categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('localstore_categories');
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('localstore_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Load customers
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('localstore_customers');
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch {
      return initialCustomers;
    }
  });

  // Load shops
  const [shops, setShops] = useState<Shop[]>(() => {
    try {
      const saved = localStorage.getItem('localstore_shops');
      return saved ? JSON.parse(saved) : initialShops;
    } catch {
      return initialShops;
    }
  });

  // Load subscriptions
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(() => {
    try {
      const saved = localStorage.getItem('localstore_subscriptions');
      return saved ? JSON.parse(saved) : initialSubscriptionPlans;
    } catch {
      return initialSubscriptionPlans;
    }
  });

  // Load settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('localstore_settings');
      return saved ? JSON.parse(saved) : defaultStoreSettings;
    } catch {
      return defaultStoreSettings;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('localstore_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('localstore_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('localstore_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('localstore_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('localstore_shops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem('localstore_subscriptions', JSON.stringify(subscriptionPlans));
  }, [subscriptionPlans]);

  useEffect(() => {
    localStorage.setItem('localstore_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // Recalculate category product counts dynamically
  useEffect(() => {
    setCategories((prevCats) =>
      prevCats.map((cat) => {
        const count = products.filter(
          (p) => p.category.toLowerCase() === cat.name.toLowerCase() && p.status === 'active'
        ).length;
        return { ...cat, productCount: count };
      })
    );
  }, [products]);

  // Product Actions
  const addProduct = (prodData: Omit<Product, 'id' | 'salesCount'>): Product => {
    const newId = `prod-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...prodData,
      id: newId,
      salesCount: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
          : item
      )
    );
  };

  // Category Actions
  const addCategory = (catData: Omit<Category, 'id' | 'productCount'>): Category => {
    const newId = `cat-${Date.now().toString().slice(-4)}`;
    const newCat: Category = {
      ...catData,
      id: newId,
      productCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  // Order Actions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'timeline'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${randomNum}`;
    const newId = `ord-${Date.now().toString().slice(-6)}`;
    const now = new Date();

    const newOrder: Order = {
      ...orderData,
      id: newId,
      orderNumber,
      date: now.toISOString(),
      timeline: [
        {
          title: 'Order Placed',
          time: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          description: orderData.paymentMethod === 'Demo Online Payment' ? 'Demo payment verified' : 'Cash on Delivery selected',
        },
      ],
    };

    // Deduct stock for ordered items and update salesCount
    setProducts((prevProds) =>
      prevProds.map((prod) => {
        const orderedItem = orderData.items.find((i) => i.productId === prod.id);
        if (orderedItem) {
          const newStock = Math.max(0, prod.stock - orderedItem.quantity);
          return {
            ...prod,
            stock: newStock,
            salesCount: prod.salesCount + orderedItem.quantity,
          };
        }
        return prod;
      })
    );

    // Add to orders list (latest first)
    setOrders((prev) => [newOrder, ...prev]);

    // Update or create customer profile
    setCustomers((prevCusts) => {
      const existing = prevCusts.find(
        (c) => c.email.toLowerCase() === orderData.email.toLowerCase()
      );
      if (existing) {
        return prevCusts.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + orderData.totalAmount,
                lastOrderDate: now.toISOString().split('T')[0],
                orders: [newId, ...c.orders],
              }
            : c
        );
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now().toString().slice(-4)}`,
          name: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
          city: orderData.shippingAddress.city,
          totalOrders: 1,
          totalSpent: orderData.totalAmount,
          lastOrderDate: now.toISOString().split('T')[0],
          status: 'Active',
          orders: [newId],
        };
        return [newCust, ...prevCusts];
      }
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const newTimeline = [
            {
              title: `Status changed to ${status}`,
              time: timeStr,
              description: `Admin updated order status to ${status}`,
            },
            ...ord.timeline,
          ];
          return {
            ...ord,
            orderStatus: status,
            paymentStatus: status === 'Delivered' && ord.paymentMethod === 'Cash on Delivery' ? 'Paid' : ord.paymentStatus,
            timeline: newTimeline,
          };
        }
        return ord;
      })
    );
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const toggleShopStatus = (id: string) => {
    setShops((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
          : s
      )
    );
  };

  const updateShop = (id: string, updates: Partial<Shop>) => {
    setShops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const updateSubscriptionPlan = (id: string, updates: Partial<SubscriptionPlan>) => {
    setSubscriptionPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const updateStoreSettings = (updates: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('localstore_products');
    localStorage.removeItem('localstore_categories');
    localStorage.removeItem('localstore_orders');
    localStorage.removeItem('localstore_customers');
    localStorage.removeItem('localstore_shops');
    localStorage.removeItem('localstore_subscriptions');
    localStorage.removeItem('localstore_settings');
    setProducts(initialProducts);
    setCategories(initialCategories);
    setOrders(initialOrders);
    setCustomers(initialCustomers);
    setShops(initialShops);
    setSubscriptionPlans(initialSubscriptionPlans);
    setStoreSettings(defaultStoreSettings);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        customers,
        shops,
        subscriptionPlans,
        storeSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        createOrder,
        updateOrderStatus,
        updateCustomer,
        toggleShopStatus,
        updateShop,
        updateSubscriptionPlan,
        updateStoreSettings,
        resetAllDemoData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
