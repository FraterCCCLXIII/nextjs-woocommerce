// Imports
import {
  SubmitHandler,
  useForm,
  useFormContext,
  FormProvider,
} from 'react-hook-form';

// Components
import { InputField } from '@/components/Input/InputField.component';
import Button from '../UI/Button.component';
import CheckoutLogin from './CheckoutLogin.component';
import CreateAccountCheckbox from './CreateAccountCheckbox.component';
import PaymentMethod from './PaymentMethod.component';
import CreditCardFields from './CreditCardFields.component';
import StateField from './StateField.component';
import BillingAddressCheckbox from './BillingAddressCheckbox.component';
import BillingAddressFields from './BillingAddressFields.component';

// Constants
import { INPUT_FIELDS } from '@/utils/constants/INPUT_FIELDS';
import { ICheckoutDataProps } from '@/utils/functions/functions';

interface IBillingProps {
  handleFormSubmit: SubmitHandler<ICheckoutDataProps>;
}

const OrderButton = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const paymentMethod = watch('paymentMethod');

  return (
    <div className="w-full">
      
      {/* Terms Checkbox in Grey Border Container */}
      <div className="mb-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 cursor-pointer accent-black flex-shrink-0"
            {...register('termsAccepted', { 
              required: 'You must accept the terms and conditions to proceed' 
            })}
          />
          <span className="ml-3 text-sm text-gray-700">
            I have read, understood and agreed with your Terms of Service and Waiver Agreement. I certify that these products will not be used on humans.
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-red-600 text-sm mt-2 ml-7">
            {errors.termsAccepted.message as string}
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <Button type="submit">PLACE ORDER</Button>
      </div>
    </div>
  );
};

const Billing = ({ handleFormSubmit }: IBillingProps) => {
  const methods = useForm<ICheckoutDataProps>();
  const email = methods.watch('email') || '';

  return (
    <section className="text-gray-700">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          {/* Login Section */}
          <CheckoutLogin />

          {/* Compact Form Fields - Side by Side, No Top Labels */}
          <div className="space-y-3 mb-6">
            {/* Email - Full Width */}
            {INPUT_FIELDS.filter(field => field.name === 'email').map(({ id, label, name, customValidation }) => (
              <InputField
                key={id}
                inputLabel={label}
                inputName={name}
                customValidation={customValidation}
                className="w-full"
              />
            ))}

            {/* Shipping Information Heading */}
            <div className="text-sm text-gray-600 mb-3">Shipping Information</div>

            {/* First Name and Last Name - Side by Side */}
            <div className="flex gap-3">
              {INPUT_FIELDS.filter(field => field.name === 'firstName' || field.name === 'lastName').map(({ id, label, name, customValidation }) => (
                <InputField
                  key={id}
                  inputLabel={label}
                  inputName={name}
                  customValidation={customValidation}
                />
              ))}
            </div>

            {/* Address - Full Width */}
            {INPUT_FIELDS.filter(field => field.name === 'address1').map(({ id, label, name, customValidation }) => (
              <InputField
                key={id}
                inputLabel={label}
                inputName={name}
                customValidation={customValidation}
                className="w-full"
              />
            ))}

            {/* City, State, and Postal Code - Side by Side */}
            <div className="flex gap-3">
              {INPUT_FIELDS.filter(field => field.name === 'city').map(({ id, label, name, customValidation }) => (
                <InputField
                  key={id}
                  inputLabel={label}
                  inputName={name}
                  customValidation={customValidation}
                />
              ))}
              <StateField />
              {INPUT_FIELDS.filter(field => field.name === 'postcode').map(({ id, label, name, customValidation }) => (
                <InputField
                  key={id}
                  inputLabel={label}
                  inputName={name}
                  customValidation={customValidation}
                />
              ))}
            </div>

            {/* Phone - Full Width */}
            {INPUT_FIELDS.filter(field => field.name === 'phone').map(({ id, label, name, customValidation }) => (
              <InputField
                key={id}
                inputLabel={label}
                inputName={name}
                customValidation={customValidation}
                className="w-full"
              />
            ))}
          </div>

          {/* Create Account During Checkout */}
          {email && (
            <CreateAccountCheckbox
              email={email}
              firstName={methods.watch('firstName')}
              lastName={methods.watch('lastName')}
            />
          )}

          {/* Payment Method */}
          <PaymentMethod />

          {/* Credit Card Fields - Always visible under payment gateway */}
          <CreditCardFields />

          {/* Billing Address Checkbox */}
          <BillingAddressCheckbox />

          {/* Billing Address Fields - Show when checkbox is unchecked */}
          <BillingAddressFields />

          {/* Order Button */}
          <OrderButton />
        </form>
      </FormProvider>
    </section>
  );
};

export default Billing;
