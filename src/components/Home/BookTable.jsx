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
import { CalendarIcon, CircleX, TriangleAlert } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Heading from '../Heading';
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
      const response = await axiosPublic.post(`/bookings`, bookingData);
      if (response.status === 201) {
        const successMsg = response?.data?.message;
        toast(
          (t) => (
            <span className="p-3 text-green-600">
              {successMsg}
              <Button
                variant={'ghost'}
                className="absolute top-0 right-0 text-green-600 bg-transparent hover:bg-transparent hover:text-green-700 cursor-pointer"
                onClick={() => toast.dismiss(t.id)}
              >
                <CircleX />
              </Button>
            </span>
          ),

          {
            position: 'top-right',
            duration: 4000,
            type: 'success',
          }
        );
      }
    } catch (error) {
      console.log(error);
      const errMsg = error?.response?.data?.message;
      toast(
        (t) => (
          <span className="p-3 text-red-600">
            {errMsg}
            <Button
              variant={'ghost'}
              className="absolute top-0 right-0 text-red-600 bg-transparent hover:bg-transparent hover:text-red-700 cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
            >
              <CircleX />
            </Button>
          </span>
        ),

        {
          icon: <TriangleAlert color="#fb0000" />,
          position: 'top-right',
          duration: 4000,
          type: 'error',
        }
      );
    }
  };

  return (
    <section
      id="book-table"
      className="container mx-auto pt-[72px] mb-2 bg-white rounded-lg"
    >
      <Heading headingText={'Book Your Table'} />

      <Form {...form}>
        <form
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          data-aos-delay="100"
          data-aos-once="true"
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-8"
        >
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {' '}
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
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F] mt-2"
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
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F] mt-2"
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
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F] mt-2"
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
                  <FormLabel>Number of Persons</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="How many people?"
                      {...field}
                      min="0"
                      value={field.value || ''}
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F] mt-2"
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
                  <div>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F] mt-2',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd.MM.yyyy')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full">
                <FormLabel>From</FormLabel>
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className={'w-full'}>
                      <FormControl>
                        <TimePicker
                          value={field.value}
                          onChange={field.onChange}
                          timeInstruction={'Pick your start time'}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormLabel>To</FormLabel>
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className={'w-full'}>
                      <FormControl>
                        <TimePicker
                          value={field.value}
                          onChange={field.onChange}
                          timeInstruction={'Pick your end time'}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
                      className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F] mt-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-2 px-6 bg-orange-500 text-white hover:bg-orange-600 transition duration-200 cursor-pointer rounded-full"
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
