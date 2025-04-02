import { Link, Navigate, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toastOptions from '@/constants/toastOptions';
import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { deleteUser } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export default function Login() {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const form = useForm();
  const { userSignIn, setUser, user, createGoogleLogin } = useAuth();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || '/';

  const handleUserSignIn = async (data) => {
    const { email, password } = data;

    try {
      let result = null;
      result = await toast.promise(
        userSignIn(email, password),
        {
          loading: toastOptions.loading,
          success: () =>
            toastOptions.success(result?.user?.displayName || 'User logged in'),
          error: toastOptions.error,
        },
        {
          ...toastOptions.styles,
        }
      );

      if (result?.user) {
        setUser(result?.user);
        await new Promise((resolve) => setTimeout(resolve, 100));
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right' });
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    let createdUser = null;
    try {
      await toast.promise(
        async () => {
          createdUser = await createGoogleLogin();

          if (!createdUser || !createdUser.user) {
            throw new Error('Firebase user creation failed');
          }
          const userInfo = {
            name: createdUser?.user?.displayName,
            email: createdUser?.user?.email,
            phoneNumber: createdUser?.user?.phoneNumber || 'defaultValue',
            deliveryAddress: {
              street: 'defaultValue',
              city: 'defaultValue',
              country: 'defaultValue',
              postalCode: 'defaultValue',
            },
            role: 'customer',
            uid: createdUser?.user?.uid,
          };

          const { data } = await axiosPublic.post(`/users`, userInfo);

          if (!data?.isNew) {
            toast.success(`${data?.message}`, {
              position: 'top-right',
              duration: 3000,
            });
          } else {
            toast.success(`${data?.message}`, {
              position: 'top-right',
              duration: 3000,
            });
          }
          if (createdUser?.user) {
            setUser(createdUser?.user);
            await new Promise((resolve) => setTimeout(resolve, 100));
            navigate(from, { replace: true });
          }
        },
        {
          loading: toastOptions.loading,
          error: toastOptions.error,
        },
        {
          ...toastOptions.styles,
        }
      );
    } catch (error) {
      console.log(error);
      if (createdUser?.user) {
        await deleteUser(createdUser.user);
      }
    }
  };

  if (user) {
    // Redirect to homepage or dashboard
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex items-center justify-center min-h-[70vh] p-8">
      <div className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold text-sky-500 mb-6 text-center">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-400 text-center mb-6">
          Login to access your account
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUserSignIn)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      className="w-full mt-2 p-3 rounded bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="you@example.com"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      className="w-full mt-2 p-3 rounded bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Enter your password"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <span className="flex-grow h-px bg-gray-600"></span>
          <span className="text-sm text-gray-400">Or login with</span>
          <span className="flex-grow h-px bg-gray-600"></span>
        </div>

        {/* Google Login Button */}
        <div className="mt-4 flex gap-3 justify-center">
          <Button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-gray-700 border border-sky-500 hover:border-sky-700 text-gray-300 hover:bg-gray-600 py-2 px-4 rounded-lg transition duration-200"
            type="button"
          >
            <span>Google</span>
          </Button>
          <Button
            className="flex items-center justify-center gap-2 bg-gray-700 border border-sky-500 hover:border-sky-700 text-gray-300 hover:bg-gray-600 py-2 px-4 rounded-lg transition duration-200"
            type="button"
          >
            <span>Github</span>
          </Button>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/sign-up"
            className="text-sky-500 hover:underline hover:text-sky-400 transition duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
