import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/utils/gql/GQL_QUERIES';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

const AccountAddresses = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data?.customer) {
    return (
      <div className="woocommerce-MyAccount-content">
        <p className="text-red-600">Error loading addresses. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="woocommerce-MyAccount-content">
      <h2 className="text-2xl font-bold mb-6">Addresses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Address */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Billing address</h3>
            <button className="text-sm text-gray-600 hover:text-gray-900 underline">
              Edit
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>You have not set up this type of address yet.</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Shipping address</h3>
            <button className="text-sm text-gray-600 hover:text-gray-900 underline">
              Edit
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>You have not set up this type of address yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAddresses;

