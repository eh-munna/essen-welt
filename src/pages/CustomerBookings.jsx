import ConfirmDialog from '@/components/ConfirmDialog';
import BookingModal from '@/components/Customers/BookingModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomerBookings from '@/hooks/useCustomerBookings';
import convertToDayDate from '@/utils/BookingUtils';
import { LucideTrash } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerBookings() {
  const { customerEmail } = useParams();
  const { customerBookings, refetch } = useCustomerBookings(customerEmail);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const axiosSecure = useAxiosSecure();

  const handleDelete = useCallback(
    async (bookingId) => {
      try {
        const response = await axiosSecure.delete(
          `/bookings/admin/${bookingId}`
        );

        console.log(response);
        if (response.status === 200) {
          console.log('Booking deleted:', bookingId);
          setSelectedBooking(null);
          refetch();
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    },
    [axiosSecure, refetch]
  );

  const handleEdit = useCallback(
    async (data) => {
      try {
        const response = await axiosSecure.put(
          `/bookings/admin/${selectedBooking?._id}`,
          data
        );
        if (response.status === 200) {
          setError('');
          setSelectedBooking(null);
          refetch();
        }
      } catch (error) {
        setError(error.response?.data?.message);
        // console.error('Error updating booking:', response?.data?.message);
      }
    },
    [axiosSecure, refetch, selectedBooking?._id]
  );

  if (!customerBookings) return <p>Loading bookings...</p>;
  if (customerBookings.length === 0)
    return <p>No bookings found for this customer.</p>;

  return (
    <section className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Bookings for {customerEmail}</h2>

      {/* Grid Container for the booking details */}
      <div className="grid grid-cols-5 gap-4 p-4 bg-white shadow-md rounded-lg">
        <div className="font-semibold">Booking ID</div>
        <div className="font-semibold">Date</div>
        <div className="font-semibold">Start Time</div>
        <div className="font-semibold">End Time</div>
        <div className="flex justify-center items-center font-semibold">
          Actions
        </div>
      </div>

      {/* Data Rows */}
      {customerBookings.map((booking) => (
        <div
          className="grid grid-cols-5 gap-4 p-4 bg-white shadow-md rounded-lg items-center"
          key={booking._id}
        >
          <div>{booking._id}</div>
          <div>{convertToDayDate(booking?.date).date}</div>
          <div>{convertToDayDate(booking?.startTime).time}</div>
          <div>{convertToDayDate(booking.endTime).time}</div>

          {/* Actions Column */}
          <div className="flex space-x-2 justify-center items-center">
            <Button
              variant="ghost"
              className="text-yellow-500 hover:text-yellow-700"
              onClick={() => setSelectedBooking(booking)}
            >
              Edit Booking
            </Button>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-700"
              onClick={() => setOpen(true)}
            >
              <LucideTrash size={20} />
            </Button>
          </div>

          <ConfirmDialog
            open={open}
            setOpen={setOpen}
            onConfirm={() => handleDelete(booking?._id)}
            title="Delete Booking"
            description={`Booking for #${booking.name} will be deleted!`}
          />
        </div>
      ))}

      {selectedBooking && (
        <BookingModal
          open={!!selectedBooking}
          setOpen={() => setSelectedBooking(null)}
          onUpdate={handleEdit}
          selectedBooking={selectedBooking}
          error={error}
        />
      )}
    </section>
  );
}
