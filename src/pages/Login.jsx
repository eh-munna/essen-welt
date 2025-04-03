import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

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
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
        {/* Header Section */}
        <div className="bg-orange-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-orange-100 mt-2">Login to access your account</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUserSignIn)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="h-12 text-base focus-visible:ring-orange-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-orange-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="h-12 text-base focus-visible:ring-orange-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-full"
              >
                Login
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500 text-sm">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="h-12 gap-2 border-gray-300 hover:bg-gray-50"
            >
              <FcGoogle className="text-xl" />
              <span>Google</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 gap-2 border-gray-300 hover:bg-gray-50"
            >
              <FaGithub className="text-xl" />
              <span>GitHub</span>
            </Button>
          </div>

          {/* Signup Link */}
          <p className="mt-8 text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              to="/sign-up"
              className="font-medium text-orange-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
