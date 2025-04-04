import ConfirmDialog from '@/components/ConfirmDialog';
import BookingModal from '@/components/Customers/BookingModal';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useBookings from '@/hooks/useBookings';
import convertToDayDate from '@/utils/BookingUtils';
import {
  Loader2,
  LucideEdit,
  LucideTrash,
  Trash2,
  XCircle,
} from 'lucide-react';
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

  console.log(selectedBooking);

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
    <section className="px-6 py-10 bg-gray-50 min-h-screen">
      {/* Section Header */}
      <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">
        Manage Your Bookings
      </h2>
      {/* Booking List */}
      <div className="space-y-6">
        <div className="p-6 rounded-xl">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-200">
              {/* Table Header - Using your #131313 for text with orange accent */}
              <div className="bg-gray-100">
                <div className="flex p-4 justify-between text-center">
                  {[
                    'Booking ID',
                    'Name',
                    'People',
                    'Date',
                    'Time',
                    'Actions',
                  ].map((title, index) => (
                    <div
                      key={index}
                      className="w-1/6 font-medium text-[#131313]"
                    >
                      {title}
                    </div>
                  ))}
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {bookings?.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex items-center justify-between text-center py-4 px-6 hover:bg-orange-50 transition duration-200"
                    // {/* Orange hover */}
                  >
                    <div className="w-1/6 font-medium text-gray-600 truncate">
                      {' '}
                      {/* Secondary text */}
                      {booking._id}
                    </div>
                    <div className="w-1/6 truncate text-[#131313]">
                      {booking.name}
                    </div>
                    <div className="w-1/6 font-semibold text-orange-500">
                      {' '}
                      {/* Orange accent */}
                      {booking.numberOfPeople} People
                    </div>
                    <div className="w-1/6 text-[#131313]">
                      {convertToDayDate(booking?.date).date}
                    </div>
                    <div className="w-1/6 text-[#131313]">
                      {convertToDayDate(booking?.startTime).time} -{' '}
                      {convertToDayDate(booking?.endTime).time}
                    </div>
                    <div className="w-1/6 flex justify-center gap-3">
                      <Button
                        variant="ghost"
                        className="text-orange-500 hover:bg-orange-100 rounded-full p-2"
                        // {/* Consistent hover */}
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <LucideEdit size={20} />
                      </Button>
                      <Button
                        onClick={() => setOpen(true)}
                        variant="ghost"
                        className="text-red-500 hover:bg-red-100 rounded-full p-2"
                        // {/* Consistent style */}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>

                    {/* <ConfirmDialog
                      open={open}
                      setOpen={setOpen}
                      onConfirm={() => handleDelete(booking?._id)}
                      title="Delete Booking"
                      description={`Booking for #${booking?.name} will be deleted!`}
                    /> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {bookings?.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-orange-200 transition-all"
                // {/* Orange hover border */}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-[#131313]">
                    {booking.name}
                  </h3>
                  <span className="font-bold text-orange-500">
                    {' '}
                    {/* Orange accent */}
                    {booking.numberOfPeople} People
                  </span>
                </div>
                <p className="text-gray-600 mt-2">
                  {' '}
                  {/* Secondary text */}
                  {convertToDayDate(booking?.date).date} |{' '}
                  {convertToDayDate(booking?.startTime).time} -{' '}
                  {convertToDayDate(booking?.endTime).time}
                </p>
                <div className="flex gap-3 mt-3">
                  <Button
                    variant="outline"
                    className="text-orange-500 border-orange-300 hover:bg-orange-50 rounded-full"
                    // {/* Consistent style */}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <LucideEdit size={18} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-300 hover:bg-red-50 rounded-full"
                    // {/* Consistent style */}
                    onClick={() => setOpen(true)}
                  >
                    <LucideTrash size={18} className="mr-2" />
                    Delete
                  </Button>
                </div>
                {/* Confirm Delete Dialog */}
                <ConfirmDialog
                  open={open}
                  setOpen={setOpen}
                  onConfirm={() => handleDelete(booking?._id)}
                  title="Delete Booking"
                  description={`Booking for #${booking?.name} will be deleted!`}
                />
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
    </section>
  );
}
