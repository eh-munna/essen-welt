import useBookings from '@/hooks/useBookings';
import useOrders from '@/hooks/useOrders';

export default function UserDashboardHome() {
  const { orders } = useOrders();
  const { bookings } = useBookings();

  return (
    <>
      <section className="space-y-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="mt-2 space-y-2">
            <div className="text-lg text-gray-800">
              <p>
                You have {orders?.length}{' '}
                {orders?.length > 1 ? 'orders' : 'order'}
              </p>
            </div>
            <div className="text-lg text-gray-800">
              <p>
                You have {bookings?.length}{' '}
                {bookings?.length > 1 ? 'bookings' : 'booking'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
