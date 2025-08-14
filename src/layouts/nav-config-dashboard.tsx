import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

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
    title: 'Users',
    path: '/dashboard/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: icon('ic-cart'),
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: icon('ic-cart'),
  },
  {
    title: 'Blogs',
    path: '/dashboard/blog',
    icon: icon('ic-blog'),
  },
];
