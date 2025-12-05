import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_CURRENT_USER } from '@/utils/gql/GQL_QUERIES';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import { InputField } from '../Input/InputField.component';

const AccountDetails = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data?.customer) {
    return (
      <div className="woocommerce-MyAccount-content">
        <p className="text-red-600">Error loading account details. Please try again later.</p>
      </div>
    );
  }

  const customer = data.customer;

  // Initialize form data when customer data loads
  if (!isEditing && formData.firstName === '' && customer.firstName) {
    setFormData({
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      email: customer.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement update mutation
    console.log('Update account:', formData);
    setIsEditing(false);
  };

  return (
    <div className="woocommerce-MyAccount-content">
      <h2 className="text-2xl font-bold mb-6">Account details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
              First name
            </label>
            <input
              id="first-name"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
              Last name
            </label>
            <input
              id="last-name"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {isEditing && (
          <>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Password change</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Current password (leave blank to leave unchanged)
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    New password (leave blank to leave unchanged)
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm new password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Edit account details
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;

