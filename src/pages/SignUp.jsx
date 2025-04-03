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
import { deleteUser, updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const axiosPublic = useAxiosPublic();
  const { setUser, createUser, createGoogleLogin } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      'deliveryAddress.street': '',
      'deliveryAddress.city': '',
      'deliveryAddress.country': '',
      'deliveryAddress.postalCode': '',
    },
  });

  const handleSignUp = async (data) => {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      deliveryAddress: { street, city, country, postalCode },
    } = data;

    const userInfo = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      deliveryAddress: {
        street,
        city,
        country,
        postalCode,
      },
      role: 'customer',
    };

    let createdUser = null;
    try {
      await toast.promise(
        async () => {
          createdUser = await createUser(email, password);
          if (!createdUser?.user) {
            throw new Error('Firebase user creation failed');
          }

          await updateProfile(createdUser?.user, {
            displayName: `${userInfo.firstName} ${userInfo.lastName}`,
          });

          await axiosPublic.post('/users', {
            ...userInfo,
            uid: createdUser?.user?.uid,
          });

          setUser(createdUser?.user);
          navigate('/');
        },
        {
          loading: toastOptions.loading,
          success: toastOptions.success,
          error: toastOptions.error,
        },
        toastOptions.styles
      );
    } catch (error) {
      console.error(error);
      if (createdUser?.user) {
        try {
          await deleteUser(createdUser.user);
        } catch (deleteError) {
          console.error('Failed to delete Firebase user:', deleteError);
        }
      }
    }
  };

  const handleGoogleLogin = async () => {
    let createdUser = null;
    try {
      await toast.promise(
        async () => {
          createdUser = await createGoogleLogin();

          if (!createdUser?.user) {
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

          const { data } = await axiosPublic.post('/users', userInfo);

          toast.success(data?.message, {
            position: 'top-right',
            duration: 3000,
          });

          setUser(createdUser?.user);
          navigate('/');
        },
        {
          loading: toastOptions.loading,
          error: toastOptions.error,
        },
        toastOptions.styles
      );
    } catch (error) {
      console.error(error);
      if (createdUser?.user) {
        await deleteUser(createdUser.user);
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 pt-[72px]">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl">
        {/* Header Section */}
        <div className="bg-orange-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
          <p className="text-orange-100 mt-2">Join us today</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        First Name*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Last Name*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          className="h-12 text-base focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email*</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+49 123 456 789"
                          className="h-12 text-base focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="At least 8 characters"
                        className="h-12 text-base focus-visible:ring-orange-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Section */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700">
                  Delivery Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="deliveryAddress.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Street*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main St"
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
                    name="deliveryAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">City*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Berlin"
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
                    name="deliveryAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Postal Code*
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10115"
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
                    name="deliveryAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Country*
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Germany"
                            className="h-12 text-base focus-visible:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-full"
              >
                Create Account
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
                Or sign up with
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

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
