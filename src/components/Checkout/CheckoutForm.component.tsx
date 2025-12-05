/*eslint complexity: ["error", 20]*/
// Imports
import { useState, useEffect } from 'react';
import { useQuery, useMutation, ApolloError } from '@apollo/client';

// Components
import Billing from './Billing.component';
import CheckoutOrderSummary from './CheckoutOrderSummary.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import CheckoutConfirmation from './CheckoutConfirmation.component';

// GraphQL
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { CHECKOUT_MUTATION } from '@/utils/gql/GQL_MUTATIONS';
import { useCartStore } from '@/stores/cartStore';

// Utils
import {
  getFormattedCart,
  createCheckoutData,
  ICheckoutDataProps,
} from '@/utils/functions/functions';

export interface IBilling {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface IShipping {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface ICheckoutData {
  clientMutationId: string;
  billing: IBilling;
  shipping: IShipping;
  shipToDifferentAddress: boolean;
  paymentMethod: string;
  isPaid: boolean;
  transactionId: string;
}

interface OrderResponse {
  checkout: {
    result: string;
    redirect: string;
    order: {
      id: string;
      databaseId: number;
      orderNumber: string;
      orderKey: string;
      status: string;
      date: string;
      total: string;
      subtotal: string;
      totalTax: string;
      shippingTotal: string;
      paymentMethod: string;
      paymentMethodTitle: string;
      currency: string;
      billing: {
        firstName: string;
        lastName: string;
        address1: string;
        address2?: string;
        city: string;
        state?: string;
        postcode: string;
        country: string;
        email: string;
        phone?: string;
        company?: string;
      };
      shipping: {
        firstName: string;
        lastName: string;
        address1: string;
        address2?: string;
        city: string;
        state?: string;
        postcode: string;
        country: string;
      };
      lineItems: {
        nodes: Array<{
          id: string;
          productId: number | null;
          quantity: number;
          subtotal: string;
          total: string;
          product: {
            node: {
              id: string;
              name: string;
              image: {
                sourceUrl: string;
                altText: string;
              } | null;
            };
          } | null;
          variation: {
            node: {
              id: string;
              name: string;
              image: {
                sourceUrl: string;
                altText: string;
              } | null;
            };
          } | null;
        }>;
      };
    } | null;
  };
}

const CheckoutForm = () => {
  const { cart, clearWooCommerceSession, syncWithWooCommerce } = useCartStore();
  const [orderData, setOrderData] = useState<ICheckoutData | null>(null);
  const [requestError, setRequestError] = useState<ApolloError | null>(null);
  const [orderCompleted, setorderCompleted] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderResponse['checkout']['order'] | null>(null);

  // Get cart data query
  const { data, refetch, error: cartError } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all', // Return partial data even if there are errors
  });

  // Use useEffect instead of onCompleted (deprecated)
  useEffect(() => {
    if (data) {
      const updatedCart = getFormattedCart(data);
      if (!updatedCart && !data?.cart?.contents?.nodes?.length) {
        clearWooCommerceSession();
        return;
      }
      if (updatedCart) {
        syncWithWooCommerce(updatedCart);
      }
    }
  }, [data, clearWooCommerceSession, syncWithWooCommerce]);

  // Log errors for debugging
  useEffect(() => {
    if (cartError) {
      console.error('[CheckoutForm] Error fetching cart:', cartError);
    }
  }, [cartError]);

  // Checkout GraphQL mutation
  const [checkout, { loading: checkoutLoading, data: checkoutData, error: checkoutError }] = useMutation<OrderResponse>(
    CHECKOUT_MUTATION,
    {
      variables: {
        input: orderData,
      },
      errorPolicy: 'all', // Return partial data even if there are errors
    },
  );

  // Use useEffect instead of onCompleted (deprecated)
  useEffect(() => {
    if (checkoutData?.checkout?.order) {
      clearWooCommerceSession();
      setorderCompleted(true);
      setCompletedOrder(checkoutData.checkout.order);
      refetch();
    }
  }, [checkoutData, clearWooCommerceSession, refetch]);

  // Log errors for debugging
  useEffect(() => {
    if (checkoutError) {
      setRequestError(checkoutError);
      console.error('[CheckoutForm] Checkout mutation error:', checkoutError);
      refetch();
    }
  }, [checkoutError, refetch]);

  useEffect(() => {
    if (checkoutData?.checkout && !checkoutData.checkout.order) {
      console.error('[CheckoutForm] Checkout completed but no order data received');
    }
  }, [checkoutData]);

  useEffect(() => {
    if (null !== orderData) {
      // Perform checkout mutation when the value for orderData changes.
      checkout();
      setTimeout(() => {
        refetch();
      }, 2000);
    }
  }, [checkout, orderData, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleFormSubmit = (submitData: ICheckoutDataProps) => {
    // Ensure all required fields have defaults
    const formData: ICheckoutDataProps = {
      ...submitData,
      address2: submitData.address2 || '',
      country: submitData.country || 'US',
      state: submitData.state || '',
      company: submitData.company || '',
      paymentMethod: submitData.paymentMethod || 'bacs',
    };
    
    const checkOutData = createCheckoutData(formData);

    setOrderData(checkOutData);
    setRequestError(null);
  };

  return (
    <>
      {cart && !orderCompleted ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Checkout Form */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Checkout
                </h1>
                
                {/* Error display*/}
                {requestError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">
                      An error has occurred. Please try again.
                    </p>
                  </div>
                )}
                
                {/* Checkout Loading*/}
                {checkoutLoading && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                    <p className="text-blue-600 mb-2">
                      Processing order, please wait...
                    </p>
                    <LoadingSpinner />
                  </div>
                )}
                
                {/* Payment Details Form */}
                <Billing handleFormSubmit={handleFormSubmit} />
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <CheckoutOrderSummary className="lg:sticky lg:top-20" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {!cart && !orderCompleted && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  No products in cart
                </h1>
                <p className="text-gray-600 mb-6">
                  Your cart is empty. Add some products to continue.
                </p>
                <a
                  href="/catalog"
                  className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          )}
          {orderCompleted && completedOrder && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <CheckoutConfirmation order={completedOrder} />
            </div>
          )}
          {orderCompleted && !completedOrder && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Thank you for your order!
                </h1>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CheckoutForm;
