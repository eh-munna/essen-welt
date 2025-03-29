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
        <Loader2 className="w-10 h-10 animate-spin text-[#2D6A4F]" />
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-[#2D6A4F] mb-4 text-center">
          Edit Your Profile
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Update your information below
        </p>

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

            {/* Email & Phone Number */}
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
                      placeholder="Enter your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Fields */}
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
            <Button
              type="submit"
              className="w-full bg-[#2D6A4F] hover:bg-[#21583C] text-white"
            >
              Update Profile
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
