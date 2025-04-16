import ConfirmDialog from '@/components/ConfirmDialog';
import BookingModal from '@/components/Customers/BookingModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomerBookings from '@/hooks/useCustomerBookings';
import useTitle from '@/hooks/useTitle';
import convertToDayDate from '@/utils/BookingUtils';
import { Edit, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerBookings() {
  useTitle('Bookings');
  const { customerEmail } = useParams();
  const { customerBookings, refetch } = useCustomerBookings(customerEmail);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();

  const handleDelete = useCallback(
    async (bookingId) => {
      try {
        const response = await axiosSecure.delete(
          `/bookings/admin/${bookingId}`
        );
        if (response.status === 200) {
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
      }
    },
    [axiosSecure, refetch, selectedBooking?._id]
  );

  if (!customerBookings)
    return <p className="p-6 text-gray-900">Loading bookings...</p>;
  if (customerBookings.length === 0) {
    return (
      <section className="bg-white min-h-screen p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-gray-900 mb-6">
            No bookings found for this customer
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold">
            Bookings for {customerEmail}
          </h2>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-t-lg text-center">
            <div className="col-span-2 font-medium text-gray-500">
              Booking ID
            </div>
            <div className="col-span-2 font-medium text-gray-500">People</div>
            <div className="col-span-3 font-medium text-gray-500">Date</div>
            <div className="col-span-1 font-medium text-gray-500">
              Start Time
            </div>
            <div className="col-span-1 font-medium text-gray-500">End Time</div>
            <div className="col-span-3 font-medium text-gray-500">Actions</div>
          </div>
          <div className="space-y-2">
            {customerBookings.map((booking) => (
              <div
                key={booking._id}
                className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <div className="col-span-2 font-medium truncate">
                  {booking._id}
                </div>
                <div className="col-span-2 text-gray-500">
                  {booking?.numberOfPeople}
                </div>
                <div className="col-span-3 text-gray-500">
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
                    size="sm"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
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
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {customerBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">#Booking {booking._id}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {convertToDayDate(booking?.date).date}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Start</p>
                  <p>{convertToDayDate(booking?.startTime).time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">End</p>
                  <p>{convertToDayDate(booking.endTime).time}</p>
                </div>
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

        {/* Delete Confirmation */}
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
          )}?`}
        />
      </div>
    </section>
  );
}
