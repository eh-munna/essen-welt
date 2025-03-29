import useBookings from '@/hooks/useBookings';
import useOrders from '@/hooks/useOrders';

export default function UserDashboardHome() {
  const { orders } = useOrders();
  const { bookings } = useBookings();

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mt-2 space-y-2">
            <div className="text-lg">
              <p>
                You have {orders?.length}{' '}
                {orders?.length > 1 ? 'orders' : 'order'}
              </p>
            </div>
            <div className="text-lg">
              <p>
                You have {bookings?.length}{' '}
                {bookings?.length > 1 ? 'bookings' : 'booking'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
