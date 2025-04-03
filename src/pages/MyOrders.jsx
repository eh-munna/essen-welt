import useOrders from '@/hooks/useOrders';
import useTitle from '@/hooks/useTitle';
import { Loader2, XCircle } from 'lucide-react';
import { Fragment } from 'react';

export default function MyOrders() {
  const { orders } = useOrders();
  useTitle('My Orders');

  if (!orders) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6F61]" />
        <p className="mt-2 text-lg text-[#FF6F61]">Loading orders...</p>
      </div>
    );
  }

  if (orders?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <XCircle className="w-10 h-10 text-red-500" />
        <p className="mt-2 text-lg text-[#FF6F61]">No orders found.</p>
      </div>
    );
  }

  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">
        Your Orders
      </h2>

      {/* Order List */}
      <div className="space-y-6">
        <div className="p-6">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-[#2D6A4F] text-white">
                <div className="flex p-4 justify-center items-center text-center">
                  <div className="w-1/6 font-medium">Order Nr</div>
                  <div className="w-1/6 font-medium">Customer</div>
                  <div className="w-1/6 font-medium">Item(s)</div>
                  <div className="w-1/6 font-medium">Quantity</div>
                  <div className="w-1/6 font-medium">Total Price</div>
                  <div className="w-1/6 font-medium">Status</div>
                </div>
              </div>
              <div>
                {orders?.map((order, idx) => (
                  <div
                    key={order?._id}
                    className="flex border-b hover:bg-gray-100 p-4 transition duration-200 justify-center items-center text-center"
                  >
                    <div className="w-1/6 font-semibold">{idx + 1}</div>
                    <div className="w-1/6">{`${order?.customer?.firstName} ${order?.customer?.lastName}`}</div>
                    {order?.items?.map((item, itemIdx) => (
                      <Fragment key={`${order?._id}${itemIdx}`}>
                        <div className="w-1/6">{item?.name}</div>
                        <div className="w-1/6">{item?.quantity}</div>
                      </Fragment>
                    ))}
                    <div className="w-1/6 font-semibold text-[#E63946]">
                      €{order?.totalPrice.toFixed(2)}
                    </div>
                    <div className="w-1/6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
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

          {/* Mobile View */}
          <div className="md:hidden">
            {orders?.map((order) => (
              <div
                key={order._id}
                className="border-b rounded-lg shadow-lg hover:shadow-xl transition hover:bg-gray-100 p-4 mb-6"
              >
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-lg font-semibold text-[#2D6A4F]">
                    {order.items.map((item) => item.name).join(', ')}
                  </h3>
                  <span className="text-[#E63946] font-bold text-lg">
                    €{order.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
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
