import ConfirmDialog from '@/components/ConfirmDialog';
import BookingModal from '@/components/Customers/BookingModal';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomerBookings from '@/hooks/useCustomerBookings';
import useTitle from '@/hooks/useTitle';
import convertToDayDate from '@/utils/BookingUtils';
import { Edit, Loader2, Trash2, XCircle } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function Bookings() {
  const { customerBookings: bookings, refetch } = useCustomerBookings();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  useTitle('Bookings');

  const handleDelete = useCallback(
    async (bookingId) => {
      try {
        const response = await axiosSecure.delete(
          `/bookings/${bookingId}?email=${user?.email}`
        );
        if (response.status === 200) {
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
      }
    },
    [axiosSecure, refetch, selectedBooking?._id]
  );

  if (!bookings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <p className="mt-2 text-lg">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
        <XCircle className="w-10 h-10 text-red-500" />
        <p className="mt-2 text-lg">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Manage Bookings</h2>

        {/* Desktop Grid View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-t-lg text-center">
            <div className="col-span-2 font-medium text-gray-500">
              Booking ID
            </div>
            <div className="col-span-2 font-medium text-gray-500">Name</div>
            <div className="col-span-1 font-medium text-gray-500">People</div>
            <div className="col-span-2 font-medium text-gray-500">Date</div>
            <div className="col-span-1 font-medium text-gray-500">
              Start Time
            </div>
            <div className="col-span-1 font-medium text-gray-500">End Time</div>
            <div className="col-span-3 font-medium text-gray-500">Actions</div>
          </div>
          <div className="space-y-2">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <div className="col-span-2 font-medium truncate">
                  {booking._id}
                </div>
                <div className="col-span-2 text-gray-500">{booking.name}</div>
                <div className="col-span-1 font-semibold">
                  {booking.numberOfPeople}
                </div>
                <div className="col-span-2 text-gray-500">
                  {convertToDayDate(booking?.date).date}
                </div>
                <div className="col-span-1 text-gray-500">
                  {convertToDayDate(booking?.startTime).time}
                </div>
                <div className="col-span-1 text-gray-500">
                  {convertToDayDate(booking.endTime).time}
                </div>
                <div className="col-span-3 flex justify-center space-x-2">
                  <Button
                    onClick={() => setSelectedBooking(booking)}
                    size="icon"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setDeleteConfirm(true);
                    }}
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-orange-500">
                    Booking #{booking._id.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {booking.name} ({booking.numberOfPeople} people)
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {convertToDayDate(booking?.date).date}
                </p>
                <p className="text-sm font-medium">
                  {convertToDayDate(booking?.startTime).time} -{' '}
                  {convertToDayDate(booking.endTime).time}
                </p>
              </div>
              <div className="flex space-x-2 mt-3">
                <Button
                  onClick={() => setSelectedBooking(booking)}
                  size="sm"
                  variant="ghost"
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setDeleteConfirm(true);
                  }}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedBooking && !deleteConfirm && (
        <BookingModal
          open={!!selectedBooking}
          setOpen={() => setSelectedBooking(null)}
          onUpdate={handleEdit}
          selectedBooking={selectedBooking}
          error={error}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        onConfirm={() => {
          handleDelete(selectedBooking?._id);
          setDeleteConfirm(false);
          setSelectedBooking(null);
        }}
        onCancel={() => setSelectedBooking(null)}
        title="Delete Booking"
        description={`Are you sure you want to delete booking #${selectedBooking?._id.slice(
          -6
        )}? This action cannot be undone.`}
      />
    </div>
  );
}
