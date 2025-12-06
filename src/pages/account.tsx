import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout.component';
import AccountNavigation from '@/components/User/AccountNavigation.component';
import AccountDashboard from '@/components/User/AccountDashboard.component';
import AccountOrders from '@/components/User/AccountOrders.component';
import AccountDownloads from '@/components/User/AccountDownloads.component';
import AccountAddresses from '@/components/User/AccountAddresses.component';
import AccountPaymentMethods from '@/components/User/AccountPaymentMethods.component';
import AccountDetails from '@/components/User/AccountDetails.component';
import withAuth from '@/components/User/withAuth.component';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/utils/gql/GQL_QUERIES';

import type { NextPage } from 'next';

const CustomerAccountPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const activeTab = (query.tab as string) || 'my-details';
  
  // Get user data for avatar
  const { data: userData } = useQuery(GET_CURRENT_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });
  
  const customer = userData?.customer;
  const avatar = customer?.avatar?.url || null;
  const firstName = customer?.firstName || customer?.email || 'User';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-details':
      case 'dashboard':
        return <AccountDashboard />;
      case 'orders':
        return <AccountOrders />;
      case 'downloads':
        return <AccountDownloads />;
      case 'addresses':
        return <AccountAddresses />;
      case 'payment-methods':
        return <AccountPaymentMethods />;
      case 'account-details':
        return <AccountDetails />;
      default:
        return <AccountDashboard />;
    }
  };

  return (
    <Layout title="My account">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row items-start justify-between w-full lg:gap-12 mb-24">
          {/* Left Sidebar */}
          <div className="mt-2 lg:sticky top-16 w-full lg:max-w-[260px]">
            {/* User Info with Avatar */}
            <section className="my-8 flex gap-4 items-start justify-center w-full">
              {avatar ? (
                <img 
                  src={avatar} 
                  className="rounded-full aspect-square border border-gray-300" 
                  alt="user-avatar" 
                  width="48" 
                  height="48" 
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-lg">
                    {firstName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1 text-balance leading-tight w-full text-ellipsis overflow-hidden">
                <div className="text-lg font-semibold">Welcome, {firstName}</div>
                {customer?.email && (
                  <span className="text-gray-400 font-light text-sm" title={customer.email}>
                    {customer.email}
                  </span>
                )}
              </div>
            </section>
            
            <hr className="my-8" />
            
            {/* Navigation */}
            <AccountNavigation activeEndpoint={activeTab} />
          </div>

          {/* Main Content */}
          <main className="flex-1 w-full lg:my-8 rounded-lg max-w-screen-lg lg:sticky top-24">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </Layout>
  );
};

// Wrap with auth HOC
const AuthenticatedPage = withAuth(CustomerAccountPage);

export default AuthenticatedPage;

