import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { login } from '../../utils/auth';
import { InputField } from '../Input/InputField.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import Button from '../UI/Button.component';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ILoginData {
  username: string;
  password: string;
}

/**
 * User login component that handles user authentication
 * @function UserLogin
 * @returns {JSX.Element} - Rendered component with login form
 */
const UserLogin = () => {
  const methods = useForm<ILoginData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: ILoginData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(data.username, data.password);
      if (result.success && result.status === 'SUCCESS') {
        router.push('/account');
      } else {
        throw new Error('Failed to login');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-gray-700 container p-4 py-2 mx-auto mb-[8rem] md:mb-0">
      <div className="mx-auto lg:w-1/2">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Log In
        </h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <label htmlFor="username" className="block pb-2 text-sm font-medium text-gray-700">
                  Username or email
                </label>
                <input
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-black focus:border-black block w-full p-2.5 placeholder-gray-400"
                  id="username"
                  placeholder="Username or email"
                  type="text"
                  {...methods.register('username', { required: true })}
                />
              </div>
              <div className="w-full">
                <label htmlFor="password" className="block pb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-black focus:border-black block w-full p-2.5 placeholder-gray-400"
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...methods.register('password', { required: true })}
                />
              </div>

              {error && (
                <div className="w-full text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="w-full mt-4">
                <Button variant="primary" buttonDisabled={loading} type="submit">
                  {loading ? <LoadingSpinner /> : 'Log In'}
                </Button>
              </div>

              <div className="w-full mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-black font-semibold hover:underline">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default UserLogin;
