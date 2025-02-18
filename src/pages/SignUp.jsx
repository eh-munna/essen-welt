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
import { AuthContext } from '@/context/authentication/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

export default function SignUp() {
  const { user, setUser, createUser, createGoogleLogin } =
    useContext(AuthContext);
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

  const navigate = useNavigate();

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
      name: `${firstName} ${lastName}`,
      email,
      password,
      phoneNumber,
      street,
      city,
      country,
      postalCode,
      role: 'user',
    };

    try {
      const userCredential = await toast.promise(
        createUser(email, password),
        {
          loading: 'Loading',
          success: () => (
            <div className="bg-white px-6 animate-enter">
              User is created successfully!
            </div>
          ),
          error: (err) => (
            <div className="bg-white px-6">
              {err.code === `auth/email-already-in-use` &&
                'Email already in use!'}
            </div>
          ),
        },
        {
          style: { paddingLeft: '1.5rem', paddingRight: '1.5rem' },
          loading: { position: 'top-right', duration: 3000 },
          success: { position: 'top-right', duration: 3000 },
          error: { position: 'top-right', duration: 3000 },
        }
      );

      const createdUser = userCredential?.user;
      if (createdUser) {
        await updateProfile(createdUser, { displayName: userInfo.name });
        setUser(createdUser);
      }

      form.reset();
      navigate('/');
    } catch (error) {
      console.error(error.code);
    }
  };

  const handleGoogleLogin = () => {
    //     (async () => {
    //       try {
    //         const result = await createGoogleLogin();
    //         const loggedUser = await result.user;
    //         const userInfo = {
    //           name: loggedUser?.displayName,
    //           email: loggedUser?.email,
    //           role: 'user',
    //         };
    //         const { data } = await axiosPublic.post('/users', userInfo);
    //         console.log(data);
    //         if (data?.success) {
    //           setUser(loggedUser);
    //           <Navigate to="/" replace />;
    //         }
    //       } catch (error) {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log('Error:', errorCode, errorMessage);
    //       }
    //     })();
    //   };
    //   if (user) {
    //     // Redirect to homepage or dashboard
    //     return <Navigate to="/" replace />;
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-sky-500 mb-4 text-center">
          Welcome!
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Sign up to enjoy
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="space-y-6"
          >
            {/* First Name & Last Name (Side by Side) */}
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

            {/* Email & Phone Number (Side by Side) */}
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
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Fields (2x2 Grid) */}
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
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <span className="flex-grow h-px bg-gray-600"></span>
          <span className="text-sm text-gray-400">Or login with</span>
          <span className="flex-grow h-px bg-gray-600"></span>
        </div>

        {/* Google & GitHub Login */}
        <div className="mt-4 flex gap-3 justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-gray-700 border border-sky-500 hover:border-sky-700 text-gray-300 hover:bg-gray-600 py-2 px-4 rounded-lg transition duration-200"
          >
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-700 border border-sky-500 hover:border-sky-700 text-gray-300 hover:bg-gray-600 py-2 px-4 rounded-lg transition duration-200">
            <span>GitHub</span>
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Have an account?{' '}
          <Link
            to="/login"
            className="text-sky-500 hover:underline hover:text-sky-400 transition duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
