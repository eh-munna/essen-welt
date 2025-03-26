import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import convertToDayDate from '@/utils/BookingUtils';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function BookingModal({
  selectedBooking,
  open,
  setOpen,
  refetch,
}) {
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState('');

  const form = useForm({
    defaultValues: {
      ...selectedBooking,
      date: convertToDayDate(selectedBooking?.date).date,
      startTime: convertToDayDate(selectedBooking?.startTime).time,
      endTime: convertToDayDate(selectedBooking?.endTime).time,
      numberOfPeople: selectedBooking?.numberOfPeople || 1,
    },
  });

  const handleSubmit = useCallback(
    async (data) => {
      try {
        const response = await axiosSecure.put(
          `/bookings/admin/${selectedBooking?._id}`,
          data
        );
        console.log(response);
        if (response.status === 200) {
          setError('');
          setOpen(false);
          refetch();
        }
      } catch ({ response }) {
        setError(response?.data?.message);
        // console.error('Error updating booking:', response?.data?.message);
      }
    },
    [axiosSecure, selectedBooking?._id, setOpen, refetch]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white text-gray-800 p-8 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#075E54]">
            Edit Booking
          </DialogTitle>
          {error && <h3 className="text-red-500">{error}</h3>}
        </DialogHeader>

        <div className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Date Field */}
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        placeholder="Booking Date"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Time Field */}
              <FormField
                name="startTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        placeholder="Booking Start Time"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Time Field */}
              <FormField
                name="endTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        placeholder="Booking End Time"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Number of Guests */}
              <FormField
                name="numberOfPeople"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of People</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Number of Guests"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit & Close Buttons */}
              <DialogFooter className="sm:justify-end mt-6 flex w-full">
                <Button
                  type="submit"
                  className="bg-[#075E54] text-white hover:bg-[#128C7E]"
                >
                  Save Changes
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Prop validations
BookingModal.propTypes = {
  selectedBooking: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
