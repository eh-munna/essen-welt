import BookingModal from '@/components/Customers/BookingModal';
import { Button } from '@/components/ui/button';
import useCustomerBookings from '@/hooks/useCustomerBookings';
import { LucideTrash } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerBookings() {
  const { customerEmail } = useParams();
  const { customerBookings } = useCustomerBookings(customerEmail);

  const [selectedBooking, setSelectedBooking] = useState(null);

  if (!customerBookings) return <p>Loading bookings...</p>;
  if (customerBookings.length === 0)
    return <p>No bookings found for this customer.</p>;

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const handleDelete = (bookingId) => {
    console.log(`Deleting booking with ID: ${bookingId}`);
    // Logic to delete the booking
  };

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
          <div>{new Date(booking.date).toLocaleDateString()}</div>
          <div>{new Date(booking.startTime).toLocaleTimeString()}</div>
          <div>{new Date(booking.endTime).toLocaleTimeString()}</div>

          {/* Actions Column */}
          <div className="flex space-x-2 justify-center items-center">
            <Button
              variant="ghost"
              className="text-yellow-500 hover:text-yellow-700"
              onClick={() => handleEditBooking(booking)}
            >
              Edit Booking
            </Button>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(booking._id)}
            >
              <LucideTrash size={20} />
            </Button>
          </div>
        </div>
      ))}

      {selectedBooking && (
        <BookingModal
          open={selectedBooking}
          setOpen={() => setSelectedBooking(null)}
          selectedBooking={selectedBooking}
        />
      )}
    </section>
  );
}
