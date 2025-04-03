import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TimePicker } from '../TimePicker';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';

export default function BookTable() {
  const axiosPublic = useAxiosPublic();
  const form = useForm();

  const handleOnSubmit = async (data) => {
    const bookingData = {
      ...data,
      date: format(new Date(data.date), 'yyyy-MM-dd'),
    };

    try {
      const response = await axiosPublic.post('/bookings', bookingData);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: 'top-center',
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed', {
        position: 'top-center',
        duration: 4000,
      });
    }
  };

  return (
    <section
      id="book-table"
      className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 bg-white"
    >
      {/* Enhanced Heading */}
      <div className="text-center mb-10 md:mb-14 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Reserve Your <span className="text-orange-500">Table</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Secure your dining experience with us
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-6 md:space-y-8 max-w-4xl mx-auto"
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="3000"
          data-aos-once="true"
        >
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-lg">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your name"
                      {...field}
                      className="h-12 md:h-14 text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  <FormLabel className="text-base md:text-lg">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                      className="h-12 md:h-14 text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  <FormLabel className="text-base md:text-lg">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+49 (0) 123 456 789"
                      {...field}
                      className="h-12 md:h-14 text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfPeople"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-lg">
                    Number of Guests
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="How many people?"
                      min="1"
                      max="20"
                      {...field}
                      className="h-12 md:h-14 text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  <FormLabel className="text-base md:text-lg">Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full h-12 md:h-14 justify-start text-left font-normal text-base border-gray-300',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Select a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel className="text-base md:text-lg block">Time</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimePicker
                          value={field.value}
                          onChange={field.onChange}
                          timeInstruction="From"
                          className="h-12 md:h-14 text-base"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimePicker
                          value={field.value}
                          onChange={field.onChange}
                          timeInstruction="To"
                          className="h-12 md:h-14 text-base"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-lg">
                  Special Requests
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any dietary restrictions or special notes?"
                    {...field}
                    className="min-h-[120px] text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full py-6 text-lg bg-orange-500 hover:bg-orange-600 transition-colors duration-300 rounded-full shadow-md"
          >
            Confirm Reservation
          </Button>
        </form>
      </Form>
    </section>
  );
}
