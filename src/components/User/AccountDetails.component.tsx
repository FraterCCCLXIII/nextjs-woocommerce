import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_CURRENT_USER } from '@/utils/gql/GQL_QUERIES';
import { UPDATE_CUSTOMER } from '@/utils/gql/GQL_MUTATIONS';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

const AccountDetails = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const [updateCustomer, { loading: updating }] = useMutation(UPDATE_CUSTOMER);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const customer = data?.customer;

  // Initialize form data when customer data loads (using useEffect to avoid render issues)
  useEffect(() => {
    if (customer && !isEditing && formData.firstName === '') {
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [customer, isEditing]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !customer) {
    return (
      <div className="woocommerce-MyAccount-content">
        <p className="text-red-600">Error loading account details. Please try again later.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMessage(null);
    setUpdateError(null);

    // Validate passwords if changing
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setUpdateError('New passwords do not match.');
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 8) {
      setUpdateError('New password must be at least 8 characters long.');
      return;
    }

    try {
      const updateInput: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      // Only include password if provided
      if (formData.newPassword) {
        updateInput.password = formData.newPassword;
      }

      const { data: updateData } = await updateCustomer({
        variables: {
          input: updateInput,
        },
      });

      if (updateData?.updateCustomer?.customer) {
        setUpdateMessage('Account details updated successfully!');
        setIsEditing(false);
        // Reset password fields
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        // Refetch customer data to get latest
        await refetch();
      } else {
        setUpdateError('Failed to update account details. Please try again.');
      }
    } catch (err: any) {
      console.error('Error updating customer:', err);
      setUpdateError(err.message || 'Failed to update account details. Please try again.');
    }
  };

  return (
    <div className="woocommerce-MyAccount-content">
      <h2 className="text-2xl font-bold mb-6">Account details</h2>

      {updateMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">{updateMessage}</div>
      )}
      {updateError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">{updateError}</div>
      )}

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
                disabled={updating}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? 'Saving...' : 'Save changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setUpdateMessage(null);
                  setUpdateError(null);
                  // Reset form to original values
                  setFormData({
                    firstName: customer.firstName || '',
                    lastName: customer.lastName || '',
                    email: customer.email || '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  });
                }}
                disabled={updating}
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
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

