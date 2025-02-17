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
import { AuthContext } from '@/context/authentication/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router';

export default function SignUp() {
  const { user, setUser, createUser, createGoogleLogin } =
    useContext(AuthContext);
  const form = useForm();

  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const { name, email, password } = data;
    const userInfo = { name, email, role: 'user' };

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
          error: (err) => <div className="bg-white px-6">{err.message}</div>,
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
      console.error('Error creating user:', error);
    }
  };

  const handleGoogleLogin = () => {
    (async () => {
      try {
        const result = await createGoogleLogin();
        const loggedUser = await result.user;
        const userInfo = {
          name: loggedUser?.displayName,
          email: loggedUser?.email,
          role: 'user',
        };
        const { data } = await axiosPublic.post('/users', userInfo);
        console.log(data);
        if (data?.success) {
          setUser(loggedUser);
          <Navigate to="/" replace />;
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error:', errorCode, errorMessage);
      }
    })();
  };

  if (user) {
    // Redirect to homepage or dashboard
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold text-sky-500 mb-6 text-center">
          Welcome!
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Sign up to enjoy
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      className="w-full mt-2 p-3 rounded bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Your name"
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
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-gray-700 border border-sky-500 hover:border-sky-700 text-gray-300 hover:bg-gray-600 py-2 px-4 rounded-lg transition duration-200"
            type="button"
          >
            <span>Google</span>
          </button>
          <button
            // onClick={}
            className="flex items-center justify-center gap-2 bg-gray-700 border border-sky-500 hover:border-sky-700 text-gray-300 hover:bg-gray-600 py-2 px-4 rounded-lg transition duration-200"
            type="button"
          >
            <span>Github</span>
          </button>
        </div>

        {/* Signup Link */}
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
