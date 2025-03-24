import { Button } from '@/components/ui/button';
import useBookings from '@/hooks/useBookings';
import { Loader2, LucideEdit, LucideTrash, XCircle } from 'lucide-react';

export default function Bookings() {
  const { bookings } = useBookings();

  if (!bookings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#25D366]" />
        <p className="mt-2 text-lg">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <XCircle className="w-10 h-10 text-red-500" />
        <p className="mt-2 text-lg">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#075E54] min-h-screen text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>

      <div className="overflow-x-auto">
        <div className="bg-[#075E54] text-white shadow-md rounded-lg">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-600 font-semibold">
            <div>Booking ID</div>
            <div>Name</div>
            <div>People</div>
            <div>Date</div>
            <div>Time</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="grid grid-cols-6 gap-4 items-center p-4 border-b border-gray-700"
            >
              <div className="text-[#25D366] font-medium">{booking._id}</div>
              <div>{booking.name}</div>
              <div className="font-semibold">{booking.numberOfPeople}</div>
              <div>{new Date(booking.date).toLocaleDateString()}</div>
              <div>
                {new Date(booking.startTime).toLocaleTimeString()} -{' '}
                {new Date(booking.endTime).toLocaleTimeString()}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <LucideEdit size={20} />
                </Button>
                <Button
                  variant="destructive"
                  className="text-white bg-red-500 hover:bg-white hover:text-red-500"
                >
                  <LucideTrash size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
