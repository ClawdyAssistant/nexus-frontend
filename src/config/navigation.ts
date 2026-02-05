/**
 * Navigation Configuration
 */
import { Home, Users, Package, ShoppingCart, FileText, Settings } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  description?: string;
}

export const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview and analytics',
  },
  {
    title: 'CRM',
    href: '/crm/leads',
    icon: Users,
    description: 'Leads and deals',
  },
  {
    title: 'Inventory',
    href: '/inventory/products',
    icon: Package,
    description: 'Products and stock',
  },
  {
    title: 'Sales',
    href: '/sales/orders',
    icon: ShoppingCart,
    description: 'Sales orders',
  },
  {
    title: 'Purchasing',
    href: '/purchasing/orders',
    icon: FileText,
    description: 'Purchase orders',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Account settings',
  },
];
