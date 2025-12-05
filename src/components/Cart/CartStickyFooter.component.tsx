"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import Button from '@/components/UI/Button.component';

/**
 * Sticky footer component for cart page
 * Contains subtotal, terms checkbox, and checkout button
 */
const CartStickyFooter = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { data } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  const cartTotal = data?.cart?.total || '$0.00';
  const hasItems = data?.cart?.contents?.nodes?.length > 0;

  if (!hasItems) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Terms Checkbox - Above other elements in grey border container */}
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 cursor-pointer accent-black flex-shrink-0"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span className="ml-3 text-sm text-gray-700">
                I have read, understood and agreed with your Terms of Service and Waiver Agreement. I certify that these products will not be used on humans.
              </span>
            </label>
          </div>

          {/* Subtotal and Checkout Button */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Subtotal */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Subtotal:</span>
              <span className="text-lg font-bold text-gray-900">{cartTotal}</span>
            </div>

            {/* Checkout Button */}
            <div className="w-full md:w-auto min-w-[200px]">
              {termsAccepted ? (
                <Link href="/checkout" passHref>
                  <Button variant="primary" fullWidth>
                    GO TO CHECKOUT
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="primary" 
                  fullWidth
                  buttonDisabled={true}
                >
                  GO TO CHECKOUT
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartStickyFooter;

