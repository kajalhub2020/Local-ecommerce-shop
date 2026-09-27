import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';

// Common
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { DownloadButton } from './components/common/DownloadButton';

// Customer
import { CustomerLayout } from './components/customer/CustomerLayout';
import { HomePage } from './pages/customer/HomePage';
import { CategoriesPage } from './pages/customer/CategoriesPage';
import { ProductListingPage } from './pages/customer/ProductListingPage';
import { ProductDetailsPage } from './pages/customer/ProductDetailsPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderSuccessPage } from './pages/customer/OrderSuccessPage';

// Shop Admin
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminAddEditProductPage } from './pages/admin/AdminAddEditProductPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Super Admin
import { SuperAdminLayout } from './components/superadmin/SuperAdminLayout';
import { SuperAdminDashboardPage } from './pages/superadmin/SuperAdminDashboardPage';
import { SuperAdminShopsPage } from './pages/superadmin/SuperAdminShopsPage';
import { SuperAdminShopDetailsPage } from './pages/superadmin/SuperAdminShopDetailsPage';
import { SuperAdminSubscriptionsPage } from './pages/superadmin/SuperAdminSubscriptionsPage';
import { SuperAdminAnalyticsPage } from './pages/superadmin/SuperAdminAnalyticsPage';
import { SuperAdminSettingsPage } from './pages/superadmin/SuperAdminSettingsPage';

// Auth
import { LoginPage } from './pages/auth/LoginPage';

export default function App() {
  return (
    <ToastProvider>
      <StoreProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              {/* Universal Demo Persona & Role Switching Bar */}
              <RoleSwitcher />

              <Routes>
                {/* 1. Customer Storefront */}
                <Route path="/" element={<CustomerLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="products" element={<ProductListingPage />} />
                  <Route path="products/:id" element={<ProductDetailsPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order-success/:id" element={<OrderSuccessPage />} />
                </Route>

                {/* 2. Shop Admin Portal */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="products/new" element={<AdminAddEditProductPage />} />
                  <Route path="products/edit/:id" element={<AdminAddEditProductPage />} />
                  <Route path="categories" element={<AdminCategoriesPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                  <Route path="customers" element={<AdminCustomersPage />} />
                  <Route path="inventory" element={<AdminInventoryPage />} />
                  <Route path="reports" element={<AdminReportsPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>

                {/* 3. Super Admin SaaS Management */}
                <Route path="/superadmin" element={<SuperAdminLayout />}>
                  <Route index element={<SuperAdminDashboardPage />} />
                  <Route path="shops" element={<SuperAdminShopsPage />} />
                  <Route path="shops/:id" element={<SuperAdminShopDetailsPage />} />
                  <Route path="subscriptions" element={<SuperAdminSubscriptionsPage />} />
                  <Route path="customers" element={<AdminCustomersPage />} />
                  <Route path="analytics" element={<SuperAdminAnalyticsPage />} />
                  <Route path="settings" element={<SuperAdminSettingsPage />} />
                </Route>

                {/* 4. Demo Login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              {/* Floating Download ZIP Widget */}
              <DownloadButton />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </StoreProvider>
    </ToastProvider>
  );
}
