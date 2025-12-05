import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '@/utils/auth';
import { useState } from 'react';

interface AccountNavItem {
  id: string;
  label: string;
  href: string;
  endpoint: string;
}

const accountNavItems: AccountNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/account', endpoint: 'dashboard' },
  { id: 'orders', label: 'Orders', href: '/account/orders', endpoint: 'orders' },
  { id: 'downloads', label: 'Downloads', href: '/account/downloads', endpoint: 'downloads' },
  { id: 'addresses', label: 'Addresses', href: '/account/addresses', endpoint: 'edit-address' },
  { id: 'payment-methods', label: 'Payment methods', href: '/account/payment-methods', endpoint: 'payment-methods' },
  { id: 'account-details', label: 'Account details', href: '/account/account-details', endpoint: 'edit-account' },
];

interface AccountNavigationProps {
  activeEndpoint?: string;
}

const AccountNavigation = ({ activeEndpoint = 'dashboard' }: AccountNavigationProps) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Determine active item based on current path
  const getActiveItem = () => {
    if (currentPath === '/account') return 'dashboard';
    if (currentPath.startsWith('/account/orders')) return 'orders';
    if (currentPath.startsWith('/account/downloads')) return 'downloads';
    if (currentPath.startsWith('/account/addresses')) return 'addresses';
    if (currentPath.startsWith('/account/payment-methods')) return 'payment-methods';
    if (currentPath.startsWith('/account/account-details')) return 'account-details';
    return activeEndpoint;
  };

  const activeId = getActiveItem();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="woocommerce-MyAccount-navigation" aria-label="Account pages">
      <ul className="space-y-1 lg:block flex flex-wrap gap-2">
        {accountNavItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li
              key={item.id}
              className={`woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--${item.endpoint} ${
                isActive ? 'is-active' : ''
              }`}
            >
              <Link
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        
        {/* Logout Link */}
        <li className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isLoggingOut
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {isLoggingOut ? 'Logging out...' : 'Log out'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AccountNavigation;

