import { Button } from '@/components/ui/button';
import useOrders from '@/hooks/useOrders';
import useTitle from '@/hooks/useTitle';
import { Loader2, XCircle } from 'lucide-react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const { orders } = useOrders();
  useTitle('My Orders');

  const navigate = useNavigate();

  if (!orders) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <p className="mt-2 text-lg text-orange-500">Loading orders...</p>
      </div>
    );
  }

  if (orders?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <XCircle className="w-10 h-10 text-orange-500" />
        <p className="mt-2 text-lg text-orange-500">No orders found.</p>
        <Button
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => navigate('/menu')}
        >
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">
          Your Orders
        </h2>

        {/* Order List */}
        <div className="space-y-6">
          {/* Desktop View */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-100">
              <div className="grid grid-cols-6 p-4 text-center">
                {[
                  'Order #',
                  'Customer',
                  'Item(s)',
                  'Quantity',
                  'Total',
                  'Status',
                ].map((title, index) => (
                  <div key={index} className="font-medium text-[#131313]">
                    {title}
                  </div>
                ))}
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {orders?.map((order, idx) => (
                <div
                  key={order?._id}
                  className="grid grid-cols-6 p-4 hover:bg-orange-50 transition duration-200 text-center items-center"
                >
                  <div className="font-semibold text-orange-500">{idx + 1}</div>
                  <div className="text-[#131313]">
                    {`${order?.customer?.firstName} ${order?.customer?.lastName}`}
                  </div>
                  {order?.items?.map((item, itemIdx) => (
                    <Fragment key={`${order?._id}${itemIdx}`}>
                      <div className="text-[#131313]">{item?.itemName}</div>
                      <div className="text-gray-600">{item?.quantity}</div>
                    </Fragment>
                  ))}
                  <div className="font-semibold text-orange-500">
                    €{order?.totalPrice.toFixed(2)}
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Preparing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {orders?.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-orange-300 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[#131313]">
                      {order.items.map((item) => item.name).join(', ')}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}{' '}
                      items
                    </p>
                  </div>
                  <span className="font-bold text-orange-500">
                    €{order.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {`${order?.customer?.firstName} ${order?.customer?.lastName}`}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Preparing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
