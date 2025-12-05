import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

// State
import { useCartStore } from '@/stores/cartStore';

// Utils
import { getFormattedCart } from '@/utils/functions/functions';

// GraphQL
import { GET_CART } from '@/utils/gql/GQL_QUERIES';

/**
 * Non-rendering component responsible for initializing the cart state
 * by fetching data from WooCommerce and syncing it with the Zustand store.
 * This should be rendered once at the application root (_app.tsx).
 * @function CartInitializer
 * @returns {null} - This component does not render any UI
 */
const CartInitializer = () => {
  const { syncWithWooCommerce } = useCartStore();

  const { data, refetch, error, loading } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all', // Return partial data even if there are errors
  });

  // Use useEffect instead of onCompleted (deprecated)
  useEffect(() => {
    if (data && !loading) {
      // On successful fetch, format the data and sync with the store
      const updatedCart = getFormattedCart(data);
      if (updatedCart) {
        syncWithWooCommerce(updatedCart);
      }
    }
  }, [data, loading, syncWithWooCommerce]);

  // Log errors for debugging
  useEffect(() => {
    if (error) {
      console.error('[CartInitializer] Error fetching cart:', error);
      if (error.networkError) {
        console.error('[CartInitializer] Network error details:', {
          message: error.networkError.message,
          statusCode: error.networkError.statusCode,
          result: error.networkError.result,
        });
      }
    }
  }, [error]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // This component does not render any UI
  return null;
};

export default CartInitializer;
