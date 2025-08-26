import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;
const glassIcon = (name: string) => <SvgColor src={`/assets/icons/glass/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Inventory',
    path: '/dashboard/inventory',
    icon: glassIcon('ic-glass-bag'),
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: glassIcon('ic-glass-buy'),
  },
  {
    title: 'Categories',
    path: '/dashboard/categories',
    icon: glassIcon('ic-glass-bag'),
  },
  {
    title: 'Purchase Orders',
    path: '/dashboard/purchase-orders',
    icon: glassIcon('ic-glass-buy'),
  },
  {
    title: 'Suppliers',
    path: '/dashboard/suppliers',
    icon: glassIcon('ic-glass-bag'),
  },
  {
    title: 'Customers',
    path: '/dashboard/customers',
    icon: glassIcon('ic-glass-users'),
  },
  {
    title: 'Employees',
    path: '/dashboard/employees',
    icon: glassIcon('ic-glass-users'),
  },
  {
    title: 'Attendance',
    path: '/dashboard/attendance',
    icon: glassIcon('ic-glass-users'),
  },
  {
    title: 'Leave Management',
    path: '/dashboard/leave-management',
    icon: glassIcon('ic-glass-users'),
  },
  {
    title: 'Performance Reviews',
    path: '/dashboard/performance-reviews',
    icon: glassIcon('ic-glass-users'),
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: glassIcon('ic-glass-buy'),
  },
  {
    title: 'Sales Reports',
    path: '/dashboard/sales-reports',
    icon: glassIcon('ic-glass-buy'),
  },
  // {
  //   title: 'Users',
  //   path: '/dashboard/user',
  //   icon: icon('ic-user'),
  // },
  // {
  //   title: 'Foods',
  //   path: '/dashboard/foods',
  //   icon: icon('ic-cart'),
  // },
  // {
  //   title: 'Blogs',
  //   path: '/dashboard/blog',
  //   icon: icon('ic-blog'),
  // },
];
