export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryMethod: 'Standard' | 'Express';
  paymentMethod: 'Cash on Delivery' | 'Demo Online Payment';
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  totalAmount: number;
  estimatedDelivery: string;
  notes?: string;
  timeline: {
    title: string;
    time: string;
    description: string;
  }[];
}

export const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-8942',
    date: '2026-09-26T14:32:00Z',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    shippingAddress: {
      address: 'Flat 402, Skyline Residency, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
    },
    deliveryMethod: 'Standard',
    paymentMethod: 'Demo Online Payment',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    items: [
      {
        productId: 'prod-001',
        name: 'Architect Minimalist Cotton Overshirt',
        price: 2799,
        quantity: 1,
        size: 'L',
        color: 'Olive',
        image: '/src/assets/images/category_men_collection_1790509047543.jpg',
      },
      {
        productId: 'prod-009',
        name: 'Heavyweight Loopwheel Boxy T-Shirt',
        price: 1299,
        quantity: 2,
        size: 'L',
        color: 'Vintage White',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      },
    ],
    subtotal: 5397,
    discount: 400,
    deliveryCharge: 0,
    totalAmount: 4997,
    estimatedDelivery: 'Sep 29, 2026',
    timeline: [
      { title: 'Delivered', time: 'Sep 27, 2026 11:30 AM', description: 'Package handed over to recipient' },
      { title: 'Out for Delivery', time: 'Sep 27, 2026 08:45 AM', description: 'Courier partner out with package' },
      { title: 'Shipped', time: 'Sep 26, 2026 06:15 PM', description: 'Dispatched via BlueDart AWB #9201948' },
      { title: 'Confirmed & Paid', time: 'Sep 26, 2026 02:35 PM', description: 'Online demo payment verified' },
    ],
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-8943',
    date: '2026-09-26T18:15:00Z',
    customerName: 'Priya Mehra',
    email: 'priya.mehra@example.com',
    phone: '+91 99887 76655',
    shippingAddress: {
      address: 'Villa 14, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
    },
    deliveryMethod: 'Express',
    paymentMethod: 'Demo Online Payment',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    items: [
      {
        productId: 'prod-002',
        name: 'Relaxed Tailored Linen Trouser',
        price: 3199,
        quantity: 1,
        size: 'M',
        color: 'Oatmeal',
        image: '/src/assets/images/category_women_collection_1790509062470.jpg',
      },
      {
        productId: 'prod-005',
        name: 'Oversized Sculptural Wool Blazer',
        price: 5299,
        quantity: 1,
        size: 'M',
        color: 'Camel',
        image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=600&q=80',
      },
    ],
    subtotal: 8498,
    discount: 500,
    deliveryCharge: 150,
    totalAmount: 8148,
    estimatedDelivery: 'Sep 28, 2026',
    timeline: [
      { title: 'Shipped', time: 'Sep 27, 2026 09:20 AM', description: 'Dispatched with Express Priority' },
      { title: 'Processing', time: 'Sep 26, 2026 08:30 PM', description: 'Garments steamed, packed in branded garment bag' },
      { title: 'Order Placed', time: 'Sep 26, 2026 06:15 PM', description: 'Order received from customer store' },
    ],
  },
  {
    id: 'ord-1003',
    orderNumber: 'ORD-8944',
    date: '2026-09-27T08:05:00Z',
    customerName: 'Rohan Gupta',
    email: 'rohan.gupta@example.com',
    phone: '+91 97112 33445',
    shippingAddress: {
      address: 'B-12/4, Vasant Vihar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110057',
    },
    deliveryMethod: 'Standard',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    items: [
      {
        productId: 'prod-004',
        name: 'Monochrome Low-Top Leather Sneaker',
        price: 4499,
        quantity: 1,
        size: '42',
        color: 'Chalk White',
        image: '/src/assets/images/category_footwear_collection_1790509078615.jpg',
      },
    ],
    subtotal: 4499,
    discount: 0,
    deliveryCharge: 0,
    totalAmount: 4499,
    estimatedDelivery: 'Oct 01, 2026',
    timeline: [
      { title: 'Processing', time: 'Sep 27, 2026 09:10 AM', description: 'Item picked from footwear warehouse shelf' },
      { title: 'Order Placed', time: 'Sep 27, 2026 08:05 AM', description: 'COD verification pending on delivery' },
    ],
  },
  {
    id: 'ord-1004',
    orderNumber: 'ORD-8945',
    date: '2026-09-27T10:45:00Z',
    customerName: 'Ananya Verma',
    email: 'ananya.v@example.com',
    phone: '+91 91234 56789',
    shippingAddress: {
      address: '73 Jubilee Hills, Road No 36',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
    },
    deliveryMethod: 'Standard',
    paymentMethod: 'Demo Online Payment',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    items: [
      {
        productId: 'prod-006',
        name: 'Structured Canvas Everyday Tote',
        price: 1999,
        quantity: 1,
        size: 'One Size',
        color: 'Olive Drab',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      },
      {
        productId: 'prod-011',
        name: 'Vegetable-Tanned Minimalist Bifold Wallet',
        price: 1499,
        quantity: 1,
        size: 'One Size',
        color: 'Whiskey Tan',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
      },
    ],
    subtotal: 3498,
    discount: 200,
    deliveryCharge: 0,
    totalAmount: 3298,
    estimatedDelivery: 'Oct 02, 2026',
    timeline: [
      { title: 'Order Placed', time: 'Sep 27, 2026 10:45 AM', description: 'Payment confirmed via demo gateway' },
    ],
  },
];
