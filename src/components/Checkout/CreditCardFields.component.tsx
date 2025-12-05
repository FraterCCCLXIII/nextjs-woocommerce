"use client";

import { useFormContext } from 'react-hook-form';

/**
 * Credit card fields component for checkout
 * Compact layout with card number, expiration, and CVC
 * Always visible under payment gateway section
 */
const CreditCardFields = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const paymentMethod = watch('paymentMethod');

  return (
    <div className="mb-6">
      <div className="text-sm text-gray-600 mb-3">Card information</div>
      
      {/* Name on Card */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Name on card"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-sm"
          {...register('cardName', {
            required: paymentMethod === 'ecrypt_payment_gateway' ? 'Name on card is required' : false
          })}
        />
        {errors.cardName && (
          <p className="text-red-600 text-xs mt-1">{errors.cardName.message as string}</p>
        )}
      </div>

      {/* Card Number */}
      <div className="mb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="1234 1234 1234 1234"
            maxLength={19}
            className="w-full px-3 py-2 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-sm"
            {...register('cardNumber', {
              required: paymentMethod === 'ecrypt_payment_gateway' ? 'Card number is required' : false,
              validate: (value) => {
                if (paymentMethod === 'ecrypt_payment_gateway' && !value) {
                  return 'Card number is required';
                }
                if (paymentMethod === 'ecrypt_payment_gateway' && value && !/^[\d\s]{13,19}$/.test(value)) {
                  return 'Please enter a valid card number';
                }
                return true;
              }
            })}
            onInput={(e) => {
              // Format card number with spaces
              let value = e.currentTarget.value.replace(/\s/g, '');
              if (value.length > 0) {
                value = value.match(/.{1,4}/g)?.join(' ') || value;
                e.currentTarget.value = value;
              }
            }}
          />
          {/* Payment Method Logos */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
            <div className="w-7 h-4 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">VISA</span>
            </div>
            <div className="w-7 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">MC</span>
            </div>
            <div className="w-7 h-4 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">AM</span>
            </div>
            <div className="w-7 h-4 bg-gradient-to-r from-blue-600 via-red-500 to-green-500 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">JCB</span>
            </div>
          </div>
        </div>
        {errors.cardNumber && (
          <p className="text-red-600 text-xs mt-1">{errors.cardNumber.message as string}</p>
        )}
      </div>

      {/* Expiration and CVC - Side by Side */}
      <div className="flex gap-3">
        {/* Expiration Date */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="MM / YY"
            maxLength={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-sm"
            {...register('cardExpiry', {
              required: paymentMethod === 'ecrypt_payment_gateway' ? 'Expiration date is required' : false,
              validate: (value) => {
                if (paymentMethod === 'ecrypt_payment_gateway' && !value) {
                  return 'Expiration date is required';
                }
                if (paymentMethod === 'ecrypt_payment_gateway' && value && !/^(0[1-9]|1[0-2])\s?\/\s?([0-9]{2})$/.test(value)) {
                  return 'Please enter MM/YY format';
                }
                return true;
              }
            })}
            onInput={(e) => {
              // Format expiration date
              let value = e.currentTarget.value.replace(/\D/g, '');
              if (value.length >= 2) {
                value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
              }
              e.currentTarget.value = value;
            }}
          />
          {errors.cardExpiry && (
            <p className="text-red-600 text-xs mt-1">{errors.cardExpiry.message as string}</p>
          )}
        </div>

        {/* CVC */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="CVC"
            maxLength={4}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-sm"
            {...register('cardCvc', {
              required: paymentMethod === 'ecrypt_payment_gateway' ? 'CVC is required' : false,
              validate: (value) => {
                if (paymentMethod === 'ecrypt_payment_gateway' && !value) {
                  return 'CVC is required';
                }
                if (paymentMethod === 'ecrypt_payment_gateway' && value && !/^[0-9]{3,4}$/.test(value)) {
                  return 'Please enter a valid CVC';
                }
                return true;
              }
            })}
          />
          {/* CVC Hint Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          {errors.cardCvc && (
            <p className="text-red-600 text-xs mt-1">{errors.cardCvc.message as string}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardFields;

