import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function BookTable() {
  const form = useForm();

  const handleOnSubmit = (data) => {
    console.log(data);
  };

  return (
    <section
      id="book-table"
      className="mx-auto p-8 mb-2 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-3xl font-semibold text-[#2D6A4F] mb-6">
        Book Your Table
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-8"
        >
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your name"
                      {...field}
                      value={field.value || ''}
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                    />
                  </FormControl>
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
                      placeholder="Email"
                      {...field}
                      value={field.value || ''}
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Phone and Number of People */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+49(0)123456789"
                      {...field}
                      value={field.value || ''}
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Persons</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="How many people?"
                      {...field}
                      min="0"
                      value={field.value || ''}
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value || ''}
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      value={field.value || ''}
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Message */}
          <div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Do you have any note for us?"
                      {...field}
                      value={field.value || ''}
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-[#2D6A4F] text-white hover:bg-[#1F4F39] transition duration-200"
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
