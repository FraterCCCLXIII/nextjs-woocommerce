"use client";

import { useFormContext } from 'react-hook-form';

/**
 * Payment method component for checkout
 * Hidden - assumes only Ecrypt is active
 */
const PaymentMethod = () => {
  const { register } = useFormContext();

  return (
    <div className="hidden">
      {/* Hidden payment method - default to Ecrypt */}
      <input
        type="hidden"
        value="ecrypt_payment_gateway"
        {...register('paymentMethod')}
      />
    </div>
  );
};

export default PaymentMethod;

