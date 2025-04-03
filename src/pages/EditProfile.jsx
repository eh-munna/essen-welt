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
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomer from '@/hooks/useCustomer';
import useTitle from '@/hooks/useTitle';
import { updateProfile } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { customer, isLoading } = useCustomer();
  const navigate = useNavigate();

  useTitle('Edit Profile');

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      deliveryAddress: {
        street: '',
        city: '',
        country: '',
        postalCode: '',
      },
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phoneNumber: customer.phoneNumber || '',
        deliveryAddress: {
          street: customer.deliveryAddress?.street || '',
          city: customer.deliveryAddress?.city || '',
          country: customer.deliveryAddress?.country || '',
          postalCode: customer.deliveryAddress?.postalCode || '',
        },
      });
    }
  }, [customer, form]);

  const handleUpdateProfile = async (data) => {
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

    try {
      await toast.promise(
        async () => {
          // Update user in Firebase
          await updateProfile(user, {
            displayName: `${userInfo.firstName} ${userInfo.lastName}`,
          });

          // Update user in the database
          await axiosSecure.put(
            `/users/${customer?._id}?email=${customer?.email}`,
            userInfo
          );

          setUser({
            ...user,
            displayName: `${userInfo.firstName} ${userInfo.lastName}`,
          });
          navigate('/dashboard/profile');
        },
        {
          loading: toastOptions.loading,
          success: toastOptions.success,
          error: toastOptions.error,
        },
        {
          ...toastOptions.styles,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-[#2D6A4F]" />
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 border border-gray-200">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-orange-500 text-center">
        Edit Your Profile
      </h2>
      <p className="text-sm text-gray-600 text-center">
        Update your information below
      </p>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="space-y-6"
        >
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="First name" {...field} />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      disabled
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1234567890" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Address */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="deliveryAddress.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Street address"
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
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="deliveryAddress.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Postal Code" {...field} />
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
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="py-2 px-6 flex items-center space-x-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition duration-300 shadow-sm"
            >
              <span>Update Profile</span>
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
