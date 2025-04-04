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
import { Textarea } from '@/components/ui/textarea';
import toastOptions from '@/constants/toastOptions';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const axiosPublic = useAxiosPublic();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const handleContactSubmit = async (data) => {
    try {
      await toast.promise(
        axiosPublic.post('/contact', data),
        {
          loading: toastOptions.loading,
          success: 'Message sent successfully!',
          error: toastOptions.error,
        },
        toastOptions.styles
      );
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-4 pt-[80px]">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl">
        {/* Header Section */}
        <div className="bg-orange-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Contact Us</h2>
          <p className="text-orange-100 mt-2">We'd love to hear from you</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleContactSubmit)}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Full Name*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
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
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
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
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Subject*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Regarding my order"
                          className="h-12 text-base focus-visible:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Your Message*
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here..."
                        className="min-h-[120px] text-base focus-visible:ring-orange-500"
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
                Send Message
              </Button>
            </form>
          </Form>

          {/* Additional Contact Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Visit Us
              </h3>
              <p className="text-gray-600">
                Restaurant Straße 123
                <br />
                Berlin, Germany 10115
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Call Us
              </h3>
              <p className="text-gray-600">
                +49 123 456 789
                <br />
                Mon-Fri: 12:00-22:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
