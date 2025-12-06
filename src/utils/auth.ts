import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LOGIN_USER, LOGOUT_USER } from './gql/GQL_MUTATIONS';
import client from './apollo/ApolloClient';

// Return URL handling for post-login redirects
const RETURN_URL_KEY = 'loginReturnUrl';

export function setReturnUrl(url: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(RETURN_URL_KEY, url);
  }
}

export function getReturnUrl(): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(RETURN_URL_KEY);
  }
  return null;
}

export function clearReturnUrl(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(RETURN_URL_KEY);
  }
}

export function navigateToLogin(currentRoute?: string): string {
  if (typeof window !== 'undefined') {
    const route = currentRoute || window.location.pathname + window.location.search;
    // Only store return URL if it's not already the login page
    if (route && route !== '/login' && route !== '/account') {
      setReturnUrl(route);
    }
    return '/login';
  }
  return '/login';
}

// Cookie-based authentication - no token storage needed
export function hasCredentials() {
  if (typeof window === 'undefined') {
    return false; // Server-side, no credentials available
  }
  
  // With cookie-based auth, we'll check if user is logged in through a query
  // For now, we'll return false and let components handle the check
  return false;
}

export async function getAuthToken() {
  // Cookie-based auth doesn't need JWT tokens
  return null;
}

function getErrorMessage(error: any): string {
  // Check for GraphQL errors
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0];
    const message = graphQLError.message;
    
    // Map GraphQL error messages to user-friendly messages
    switch (message) {
      case 'invalid_username':
        return 'Invalid username or email address. Please check and try again.';
      case 'incorrect_password':
        return 'Wrong password. Please check your password and try again.';
      case 'invalid_email':
        return 'Invalid email address. Please enter a valid email address.';
      case 'empty_username':
        return 'Please enter username or email address.';
      case 'empty_password':
        return 'Please enter password.';
      case 'too_many_retries':
        return 'Too many failed attempts. Please wait a moment before trying again.';
      default:
        return 'Login failed. Please check your credentials and try again.';
    }
  }
  
  // Check for network errors
  if (error.networkError) {
    return 'Network error. Please check your internet connection and try again.';
  }
  
  // Fallback for other errors
  if (error.message) {
    return 'An error occurred during login. Please try again.';
  }
  
  return 'An unknown error occurred. Please try again later.';
}

export async function login(username: string, password: string) {
  try {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      cache: new InMemoryCache(),
      credentials: 'include', // Include cookies in requests
    });

    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    const loginResult = data.loginWithCookies;

    if (loginResult.status !== 'SUCCESS') {
      throw new Error('Login failed. Please check your credentials and try again.');
    }

    // On successful login, cookies are automatically set by the server
    return { success: true, status: loginResult.status };
  } catch (error: unknown) {
    const userFriendlyMessage = getErrorMessage(error);
    throw new Error(userFriendlyMessage);
  }
}

/**
 * Clears all cookies for the current domain
 * This is necessary for proper logout with cookie-based authentication
 */
function clearAllCookies() {
  if (typeof window === 'undefined') return;

  const hostname = window.location.hostname;
  const paths = ['/', '/wp-admin/', '/wp-content/', '/wp-includes/'];
  const domains = [
    hostname,
    `.${hostname}`,
    window.location.host,
    `.${window.location.host}`,
  ];

  // Get all cookies
  const allCookies = document.cookie.split(';');
  const cookiesToClear: string[] = [];

  // Collect all cookie names
  allCookies.forEach((cookie) => {
    const cookieName = cookie.split('=')[0].trim();
    if (cookieName) {
      cookiesToClear.push(cookieName);
    }
  });

  // Also clear known WordPress/WooCommerce cookie prefixes
  const cookiePrefixes = [
    'wordpress_logged_in_',
    'wordpress_',
    'wp_',
    'wp-settings-',
    'wp-settings-time-',
    'woocommerce_',
    'woocommerce_cart_',
    'woocommerce_items_in_cart',
    'woocommerce_cart_hash',
    'woocommerce_session_',
  ];

  // Clear cookies with all combinations of paths and domains
  cookiesToClear.forEach((cookieName) => {
    // Check if it matches any prefix or is in our list
    const shouldClear = cookiePrefixes.some((prefix) => cookieName.startsWith(prefix)) || 
                       cookiesToClear.includes(cookieName);

    if (shouldClear) {
      paths.forEach((path) => {
        domains.forEach((domain) => {
          // Try clearing with specific domain and path
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
          // Also try without domain
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
          // Try with secure flag
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}; secure;`;
          // Try with SameSite
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}; SameSite=None; Secure;`;
        });
      });
    }
  });
}

export async function logout() {
  try {
    console.log('[Auth] Starting logout process...');

    // Step 1: Call logout mutation to clear server-side session
    try {
      await client.mutate({
        mutation: LOGOUT_USER,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all', // Continue even if mutation fails
      });
      console.log('[Auth] Logout mutation successful');
    } catch (error) {
      // If logout mutation fails (e.g., not enabled or user already logged out), continue with client-side cleanup
      console.warn('[Auth] Logout mutation failed, proceeding with client-side logout:', error);
    }

    // Step 2: Clear WooCommerce session from localStorage (before clearing all)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('woo-session');
      localStorage.removeItem('woocommerce-cart');
      console.log('[Auth] WooCommerce session cleared');
    }

    // Step 3: Clear all cookies (WordPress session cookies, etc.)
    if (typeof window !== 'undefined') {
      clearAllCookies();
      console.log('[Auth] Cookies cleared');
    }

    // Step 4: Clear Apollo cache (must happen before redirect)
    try {
      // Clear the cache first
      await client.clearStore();
      console.log('[Auth] Apollo cache cleared');
      
      // Reset the store to ensure fresh state
      await client.resetStore();
      console.log('[Auth] Apollo store reset');
    } catch (cacheError) {
      console.error('[Auth] Error clearing Apollo cache:', cacheError);
    }

    // Step 5: Clear remaining localStorage and sessionStorage
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      console.log('[Auth] Storage cleared');
    }

    // Step 6: Force a hard redirect to home page
    // Add a small delay to ensure all cleanup is complete
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        // Use replace to prevent back button from going to account page
        // Add timestamp to prevent caching
        window.location.replace('/?logout=success&t=' + Date.now());
      }, 100);
    }
  } catch (error) {
    console.error('[Auth] Logout error:', error);
    // Even if logout fails, perform comprehensive cleanup
    try {
      if (typeof window !== 'undefined') {
        // Clear WooCommerce session
        localStorage.removeItem('woo-session');
        localStorage.removeItem('woocommerce-cart');
        // Clear all cookies
        clearAllCookies();
        // Clear storage
        localStorage.clear();
        sessionStorage.clear();
      }
      
      // Clear Apollo cache
      await client.clearStore();
      await client.resetStore();
    } catch (clearError) {
      console.error('[Auth] Error during cleanup:', clearError);
    }
    
    // Always redirect to home page even on error
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.replace('/?logout=success&t=' + Date.now());
      }, 100);
    }
  }
}
