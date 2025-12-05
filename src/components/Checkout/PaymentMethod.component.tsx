"use client";

import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';

/**
 * Payment method component for checkout
 * Supports multiple payment gateways including Stripe WooCommerce
 * 
 * Stripe gateway ID can be configured via NEXT_PUBLIC_STRIPE_GATEWAY_ID environment variable
 * Common values: 'stripe' (most common, matches webhook URL wc-api=wc_stripe), 'stripe_cc', 'woocommerce_gateway_stripe'
 */
const PaymentMethod = () => {
  const { register, watch, setValue } = useFormContext();
  
  // Get Stripe gateway ID from environment or use common defaults
  // Based on webhook URL format (wc-api=wc_stripe), the gateway ID is typically 'stripe'
  const stripeGatewayId = process.env.NEXT_PUBLIC_STRIPE_GATEWAY_ID || 'stripe';
  
  const [selectedMethod, setSelectedMethod] = useState<string>('bacs'); // Default to Bank Transfer (COD)

  // Watch payment method to sync with form state
  const paymentMethod = watch('paymentMethod');

  // Sync selectedMethod with form state on mount
  useEffect(() => {
    if (paymentMethod) {
      setSelectedMethod(paymentMethod);
    }
  }, [paymentMethod]);

  // Update form value when selection changes
  const handleMethodChange = (method: string) => {
    // Map 'stripe' to the actual Stripe gateway ID
    const actualMethod = method === 'stripe' ? stripeGatewayId : method;
    setSelectedMethod(actualMethod);
    setValue('paymentMethod', actualMethod, { shouldValidate: true });
  };

  // Register the payment method field
  register('paymentMethod', { required: 'Please select a payment method' });

  return (
    <div className="mb-6">
      <div className="text-sm text-gray-600 mb-3">Payment method</div>
      
      <div className="space-y-2">
        {/* Bank Transfer / Cash on Delivery */}
        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="radio"
            value="bacs"
            checked={selectedMethod === 'bacs'}
            onChange={() => handleMethodChange('bacs')}
            className="mr-3 h-4 w-4 cursor-pointer accent-black"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900">Bank Transfer / Cash on Delivery</div>
            <div className="text-xs text-gray-500">Pay with bank transfer or cash on delivery</div>
          </div>
        </label>

        {/* Stripe WooCommerce */}
        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="radio"
            value="stripe"
            checked={
              selectedMethod === stripeGatewayId ||
              selectedMethod === 'stripe' ||
              selectedMethod === 'stripe_cc' ||
              selectedMethod === 'woocommerce_gateway_stripe' ||
              selectedMethod?.startsWith('stripe')
            }
            onChange={() => handleMethodChange('stripe')}
            className="mr-3 h-4 w-4 cursor-pointer accent-black"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900 flex items-center gap-2">
              Credit / Debit Card
              <svg className="w-6 h-4" viewBox="0 0 24 16" fill="none">
                <rect width="24" height="16" rx="2" fill="#635BFF"/>
                <path d="M9.5 8L7 5.5L4.5 8L7 10.5L9.5 8Z" fill="white"/>
                <path d="M14.5 8L17 5.5L19.5 8L17 10.5L14.5 8Z" fill="white"/>
              </svg>
            </div>
            <div className="text-xs text-gray-500">Pay securely with Stripe</div>
          </div>
        </label>

        {/* Legacy Ecrypt Gateway (if still needed) */}
        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="radio"
            value="ecrypt_payment_gateway"
            checked={selectedMethod === 'ecrypt_payment_gateway'}
            onChange={() => handleMethodChange('ecrypt_payment_gateway')}
            className="mr-3 h-4 w-4 cursor-pointer accent-black"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900">Ecrypt Payment Gateway</div>
            <div className="text-xs text-gray-500">Alternative payment method</div>
          </div>
        </label>
      </div>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        value={selectedMethod}
        {...register('paymentMethod')}
      />
    </div>
  );
};

export default PaymentMethod;

