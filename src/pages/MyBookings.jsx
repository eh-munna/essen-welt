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
      {/* Section Header */}
      <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">
        Manage Your Bookings
      </h2>

      {/* Booking List */}
      <div className="space-y-6">
        <div className="p-6">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-[#2D6A4F] text-white font-semibold">
                <div className="flex p-4 justify-between text-center">
                  {[
                    'Booking ID',
                    'Name',
                    'People',
                    'Date',
                    'Time',
                    'Actions',
                  ].map((title, index) => (
                    <div key={index} className="w-1/6">
                      {title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {bookings?.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex items-center justify-between text-center py-4 px-6 hover:bg-gray-100 transition duration-200"
                  >
                    <div className="w-1/6 font-medium text-[#2D6A4F] truncate">
                      {booking._id}
                    </div>
                    <div className="w-1/6 truncate">{booking.name}</div>
                    <div className="w-1/6 font-semibold text-[#2D6A4F]">
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
                        className="text-orange-500 hover:text-orange-600 rounded-full p-2"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <LucideEdit size={20} />
                      </Button>
                      <Button
                        onClick={() => setOpen(true)}
                        variant="destructive"
                        className="text-white bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 rounded-full p-2 h-8 w-8"
                      >
                        <Trash2 size={20} />
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
                className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 mb-4 transition hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-[#2D6A4F]">
                    {booking.name}
                  </h3>
                  <span className="text-[#E63946] font-bold">
                    {booking.numberOfPeople} People
                  </span>
                </div>
                <p className="text-[#131313] mt-2">
                  {convertToDayDate(booking?.date).date} |{' '}
                  {convertToDayDate(booking?.startTime).time} -{' '}
                  {convertToDayDate(booking?.endTime).time}
                </p>
                <div className="flex gap-3 mt-3">
                  <Button
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 rounded-full p-2"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <LucideEdit size={20} />
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    variant="destructive"
                    className="text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
                  >
                    <LucideTrash size={20} />
                  </Button>
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
