export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  orders: string[]; // order IDs
}

export const initialCustomers: Customer[] = [
  {
    id: 'cust-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    totalOrders: 4,
    totalSpent: 16450,
    lastOrderDate: '2026-09-26',
    status: 'Active',
    orders: ['ord-1001'],
  },
  {
    id: 'cust-002',
    name: 'Priya Mehra',
    email: 'priya.mehra@example.com',
    phone: '+91 99887 76655',
    city: 'Bengaluru',
    totalOrders: 3,
    totalSpent: 19800,
    lastOrderDate: '2026-09-26',
    status: 'Active',
    orders: ['ord-1002'],
  },
  {
    id: 'cust-003',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@example.com',
    phone: '+91 97112 33445',
    city: 'New Delhi',
    totalOrders: 1,
    totalSpent: 4499,
    lastOrderDate: '2026-09-27',
    status: 'Active',
    orders: ['ord-1003'],
  },
  {
    id: 'cust-004',
    name: 'Ananya Verma',
    email: 'ananya.v@example.com',
    phone: '+91 91234 56789',
    city: 'Hyderabad',
    totalOrders: 2,
    totalSpent: 8790,
    lastOrderDate: '2026-09-27',
    status: 'Active',
    orders: ['ord-1004'],
  },
  {
    id: 'cust-005',
    name: 'Vikram Patel',
    email: 'vikram.patel@example.com',
    phone: '+91 98223 11223',
    city: 'Ahmedabad',
    totalOrders: 5,
    totalSpent: 28400,
    lastOrderDate: '2026-09-18',
    status: 'Active',
    orders: [],
  },
  {
    id: 'cust-006',
    name: 'Meera Iyer',
    email: 'meera.iyer@example.com',
    phone: '+91 94455 66778',
    city: 'Chennai',
    totalOrders: 2,
    totalSpent: 6200,
    lastOrderDate: '2026-08-30',
    status: 'Inactive',
    orders: [],
  },
];
