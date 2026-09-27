# LocalStore — Local Shop E-commerce SaaS

A comprehensive, production-grade frontend SaaS application for local/neighborhood merchants and boutique retail stores. Built with **React, TypeScript, React Router, Tailwind CSS, Bootstrap 5, Context API, and localStorage persistence**.

---

## 🌟 Architecture & Application Areas

LocalStore is structured into three distinct portals:

1. **Customer Storefront (`/`)**:
   - Modern, responsive boutique e-commerce shopping experience for "Urban Style Fashion".
   - Hero campaign showcase with studio editorial imagery.
   - Curated category navigation (Men, Women, Kids, Footwear, Accessories).
   - Dynamic product search, multi-faceted filtering (categories, price range slider, star rating, sizes, colors, in-stock status), and sorting options.
   - Interactive Product Details (PDP) with image gallery thumbnails, size & color selectors, live stock status, specifications matrix, customer reviews, and related items.
   - Quick-View modal for instant drawer preview and cart addition.
   - Persistent Shopping Cart with quantity steppers, coupon discount calculator (`URBAN10`, `LOCAL20`), free shipping threshold progress tracker, and wishlist movement.
   - Full Checkout with customer information, address inputs, standard vs. express courier cadence, Cash on Delivery (COD) or Demo Online Payment simulation, and order validation.
   - Order Confirmation receipt with generated order number and direct link to inspect fulfillment in the Shop Admin panel.

2. **Shop Admin Dashboard (`/admin`)**:
   - Merchant portal for "Urban Style Fashion".
   - Real-time KPI statistics: Total Sales, Total Orders, Total Customers, Catalog Items, Pending Orders, Low Stock warnings.
   - Monthly revenue growth bar charts and weekly sales velocity tracking.
   - Full Product CRUD with multi-tag size and color pickers, SKU generation, pricing/discount setup, image preview management, and instant storefront publishing.
   - Category management with live product count recalculation.
   - Order fulfillment queue with statuses: `Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`, customer inspection drawer, and audit timeline tracking.
   - Inventory tracking with low-stock warnings and quick-adjustment counters.
   - Customer CRM with order frequency and lifetime spending metrics.
   - Commercial sales analytics with date filtering (`Today`, `7 Days`, `30 Days`, `This Year`).
   - Store settings with brand details, shipping fee thresholds, notification switches, and factory data reset.

3. **Super Admin SaaS HQ (`/superadmin`)**:
   - Platform owner dashboard overseeing all tenant shops (Urban Style Fashion, Bella Casa Home Decor, Green Leaf Organics, Peak Fitness Gear, Artisan Roast, Heritage Leather).
   - Global GMV, processed orders, platform shopper metrics, and subscription MRR velocity.
   - Merchant Directory with multi-faceted search, plan filters, and 1-click Activate/Deactivate controls.
   - Detailed Shop Profile with merchant verification details, store URL links, and audit history.
   - Subscription Tier Manager: Starter (₹499/mo), Growth (₹999/mo), and Business (₹1,999/mo) with live limits and pricing adjustments.
   - Platform-wide governance settings: commission take rates (e.g., 2.5%), payout schedules, and operational switches.

---

## 🔑 Demo Login Credentials

The app includes a dedicated login screen at `/login` as well as a **Universal Demo Role Switcher Bar** pinned to the top of every screen for instant one-click switching:

| Role | Demo Email | Password | Destination |
| :--- | :--- | :--- | :--- |
| **Customer Store** | `customer@demo.com` | `demo123` | `/` (Storefront) |
| **Shop Admin** | `admin@demo.com` | `admin123` | `/admin` (Shop Admin Portal) |
| **Super Admin** | `superadmin@demo.com` | `super123` | `/superadmin` (Platform HQ) |

---

## 💾 How `localStorage` is Used

LocalStore operates entirely on the client side without external backend dependencies, persisting all state through custom browser keys:

- `localstore_products`: Master catalog of products, modified by additions, edits, deletes, and stock deductions on checkout.
- `localstore_categories`: Department categories and their active item counts.
- `localstore_orders`: Log of customer orders, status changes, and timeline audits.
- `localstore_customers`: Registered shoppers, total order counts, and lifetime spending totals.
- `localstore_shops`: Enrolled tenant boutiques managed by the Super Admin.
- `localstore_subscriptions`: Tier limits, pricing, and active shop counts.
- `localstore_settings`: Store profile, free delivery threshold, and notification preferences.
- `localstore_cart`: Active items in cart with selected sizes, colors, and quantities.
- `localstore_wishlist`: Array of saved product IDs.
- `localstore_user`: Authenticated demo user session and role.

---

## 🚀 How to Install & Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. Extract the project archive or clone the repository:
   ```bash
   cd localstore
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Folder Structure

```
localstore/
├── index.html                  # HTML entry point with fonts and meta tags
├── metadata.json               # Applet metadata
├── package.json                # Project dependencies and scripts
├── src/
│   ├── assets/                 # High-resolution generated product & hero imagery
│   ├── components/
│   │   ├── common/             # Reusable UI (ImageWithFallback, RoleSwitcher, StatusBadge, Pagination, SimpleChart)
│   │   ├── customer/           # Storefront UI (Navbar, Footer, ProductCard, QuickViewModal, Layout)
│   │   ├── admin/              # Shop Admin layout & navigation (Sidebar, Navbar, Layout)
│   │   └── superadmin/         # Super Admin layout & navigation (Sidebar, Navbar, Layout)
│   ├── context/
│   │   ├── AuthContext.tsx     # Role-based demo auth with localStorage session
│   │   ├── CartContext.tsx     # Shopping bag, coupon validation, delivery fee math, and wishlist
│   │   ├── StoreContext.tsx    # State management for products, categories, orders, customers, and shops
│   │   └── ToastContext.tsx    # Toast notifications
│   ├── data/
│   │   ├── categories.ts       # Initial boutique categories
│   │   ├── customers.ts        # Initial patron CRM records
│   │   ├── orders.ts           # Initial order ledger
│   │   ├── products.ts         # 22+ detailed fashion products with specs, sizes, and colors
│   │   ├── shops.ts            # Multi-tenant shops for Super Admin
│   │   ├── storeSettings.ts    # Store identity & delivery parameters
│   │   └── subscriptions.ts    # SaaS pricing tiers
│   ├── pages/
│   │   ├── auth/LoginPage.tsx
│   │   ├── customer/           # Home, Categories, ProductListing, ProductDetails, Cart, Checkout, OrderSuccess
│   │   ├── admin/              # Dashboard, Products, Add/Edit Product, Categories, Orders, Customers, Inventory, Reports, Settings
│   │   └── superadmin/         # Dashboard, Shops, ShopDetails, Subscriptions, Analytics, Settings
│   ├── App.tsx                 # Central routing configuration
│   ├── index.css               # Design tokens, typography clamp rules, and Tailwind styling
│   └── main.tsx                # React DOM mount point
```
