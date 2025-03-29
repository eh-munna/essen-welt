import ConfirmDialog from '@/components/ConfirmDialog';
import BookingModal from '@/components/Customers/BookingModal';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useBookings from '@/hooks/useBookings';
import convertToDayDate from '@/utils/BookingUtils';
import { Loader2, LucideEdit, LucideTrash, XCircle } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function MyBookings() {
  const { bookings, refetch } = useBookings();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleDelete = useCallback(
    async (bookingId) => {
      try {
        const response = await axiosSecure.delete(
          `/bookings/${bookingId}?email=${user?.email}`
        );
        if (response.status === 200) {
          setSelectedBooking(null);
          refetch();
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    },
    [axiosSecure, refetch, user?.email]
  );

  const handleEdit = useCallback(
    async (data) => {
      try {
        const response = await axiosSecure.put(
          `/bookings/${selectedBooking?._id}?email=${user?.email}`,
          data
        );
        if (response.status === 200) {
          setError('');
          setSelectedBooking(null);
          refetch();
        }
      } catch (error) {
        setError(error.response?.data?.message);
      }
    },
    [axiosSecure, selectedBooking?._id, refetch, user?.email]
  );

  if (!bookings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6F61]" />
        <p className="mt-2 text-lg text-[#FF6F61]">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <XCircle className="w-10 h-10 text-red-500" />
        <p className="mt-2 text-lg text-[#FF6F61]">No bookings found.</p>
      </div>
    );
  }

  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-semibold text-[#2D6A4F] mb-6">
        Manage Bookings
      </h2>

      {/* Booking List */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-[#2D6A4F] text-white">
                <div className="flex p-4 justify-center items-center text-center">
                  <div className="w-1/6 font-medium">Booking ID</div>
                  <div className="w-1/6 font-medium">Name</div>
                  <div className="w-1/6 font-medium">People</div>
                  <div className="w-1/6 font-medium">Date</div>
                  <div className="w-1/6 font-medium">Time</div>
                  <div className="w-1/6 font-medium">Actions</div>
                </div>
              </div>
              <div>
                {bookings?.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex border-b hover:bg-gray-100 p-4 transition duration-200 justify-center items-center text-center"
                  >
                    <div className="w-1/6 font-semibold text-[#2D6A4F] truncate">
                      {booking._id}
                    </div>
                    <div className="w-1/6">{booking.name}</div>
                    <div className="w-1/6 font-semibold text-[#2D6A4F]">
                      {booking.numberOfPeople} People
                    </div>
                    <div className="w-1/6 text-gray-700">
                      {convertToDayDate(booking?.date).date}
                    </div>
                    <div className="w-1/6 text-gray-700">
                      {convertToDayDate(booking?.startTime).time} -{' '}
                      {convertToDayDate(booking.endTime).time}
                    </div>
                    <div className="w-1/6 flex gap-3 justify-center items-center text-center">
                      <Button
                        variant="ghost"
                        className="text-yellow-500 hover:text-yellow-700 rounded-full p-2"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <LucideEdit size={20} />
                      </Button>
                      <Button
                        onClick={() => setOpen(true)}
                        variant="destructive"
                        className="text-white bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 rounded-full p-2"
                      >
                        <LucideTrash size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {bookings?.map((booking) => (
              <div
                key={booking._id}
                className="border-b rounded-lg shadow-lg hover:shadow-xl transition hover:bg-gray-100 p-4 mb-6"
              >
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-lg font-semibold text-[#2D6A4F]">
                    {booking.name}
                  </h3>
                  <span className="text-[#E63946] font-bold text-lg">
                    {booking.numberOfPeople} People
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700">
                    {convertToDayDate(booking?.date).date} |{' '}
                    {convertToDayDate(booking?.startTime).time} -{' '}
                    {convertToDayDate(booking.endTime).time}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <Button
                      variant="ghost"
                      className="text-yellow-500 hover:text-yellow-700 rounded-full p-2"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <LucideEdit size={20} />
                    </Button>
                    <Button
                      onClick={() => setOpen(true)}
                      variant="destructive"
                      className="text-white bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 rounded-full p-2"
                    >
                      <LucideTrash size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Edit Modal */}
      {selectedBooking && (
        <BookingModal
          open={!!selectedBooking}
          setOpen={() => setSelectedBooking(null)}
          onUpdate={handleEdit}
          selectedBooking={selectedBooking}
          error={error}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => handleDelete(selectedBooking?._id)}
        title="Delete Booking"
        description={`Booking for #${selectedBooking?.name} will be deleted!`}
      />
    </section>
  );
}
