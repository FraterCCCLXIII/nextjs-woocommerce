import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LOGIN_USER, LOGOUT_USER } from './gql/GQL_MUTATIONS';
import client from './apollo/ApolloClient';

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

    // Step 2: Clear Apollo cache
    try {
      await client.clearStore();
      await client.resetStore();
      console.log('[Auth] Apollo cache cleared');
    } catch (cacheError) {
      console.error('[Auth] Error clearing Apollo cache:', cacheError);
    }

    // Step 3: Clear localStorage and sessionStorage
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      console.log('[Auth] Storage cleared');
    }

    // Step 4: Redirect to home page
    if (typeof window !== 'undefined') {
      // Use replace to prevent back button from going to account page
      window.location.replace('/?logout=success');
    }
  } catch (error) {
    console.error('[Auth] Logout error:', error);
    // Even if logout fails, try to redirect
    if (typeof window !== 'undefined') {
      window.location.replace('/');
    }
  }
}
