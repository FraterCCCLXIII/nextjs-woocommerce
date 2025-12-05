import dynamic from 'next/dynamic';
import Layout from '@/components/Layout/Layout.component';
import CustomerAccount from '@/components/User/CustomerAccount.component';
import withAuth from '@/components/User/withAuth.component';

import type { NextPage } from 'next';

const CustomerAccountPage: NextPage = () => {
  return (
    <Layout title="Account">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CustomerAccount />
      </div>
    </Layout>
  );
};

// Disable SSR to prevent issues with authentication hooks
// Wrap the page component first, then dynamically import it
const AuthenticatedPage = dynamic(
  () => Promise.resolve(withAuth(CustomerAccountPage)),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    ),
  }
);

export default AuthenticatedPage;

