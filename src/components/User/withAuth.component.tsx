import { useRouter } from 'next/router';
import { useEffect, ComponentType, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../utils/gql/GQL_QUERIES';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withAuth<P = any>(WrappedComponent: ComponentType<P>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [hasRedirected, setHasRedirected] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    
    // Ensure we're mounted on the client side
    useEffect(() => {
      setIsMounted(true);
    }, []);
    
    // Use network-only to always check server-side authentication
    // This prevents showing stale cached data after logout
    // Only run query on client side after mounting
    const isClient = typeof window !== 'undefined';
    const { data, loading, error } = useQuery(GET_CURRENT_USER, {
      errorPolicy: 'all',
      fetchPolicy: 'network-only', // Always fetch from network, never use cache
      notifyOnNetworkStatusChange: false, // Don't trigger loading state on network updates
      skip: !isClient || !isMounted, // Skip query during SSR and until mounted
    });

    useEffect(() => {
      // Only check once we're mounted on the client and have a definitive answer
      if (isMounted && !loading && !hasRedirected) {
        // If there's an error or no customer data, user is not authenticated
        if (error || !data?.customer) {
          setHasRedirected(true);
          // Use replace instead of push to prevent back button from going to account page
          router.replace('/login');
          return;
        }
      }
    }, [data, loading, error, router, hasRedirected, isMounted]);

    // Show loading during SSR or initial load
    if (!isMounted || loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      );
    }

    // If we've redirected or no customer data, don't render (show nothing)
    // Also check for error to prevent showing content when not authenticated
    if (hasRedirected || !data?.customer || error) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}

export default withAuth;
