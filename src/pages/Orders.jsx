const mockOrders = [
  {
    id: '001',
    customer: 'John Doe',
    item: 'Grilled Salmon',
    quantity: 2,
    price: 31.98,
    status: 'Delivered',
  },
  {
    id: '002',
    customer: 'Jane Smith',
    item: 'Veggie Pizza',
    quantity: 1,
    price: 12.49,
    status: 'Preparing',
  },
  {
    id: '003',
    customer: 'Mike Johnson',
    item: 'Avocado Salad',
    quantity: 3,
    price: 29.97,
    status: 'Pending',
  },
];

const Orders = () => {
  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-semibold text-[#2D6A4F] mb-6">Orders</h2>

      {/* Order List */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          {/* For Desktop View (full data) */}
          <div className="hidden md:block">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-[#2D6A4F] text-white">
                <div className="flex p-4">
                  <div className="w-1/6 font-medium">Order ID</div>
                  <div className="w-1/6 font-medium">Customer</div>
                  <div className="w-1/6 font-medium">Item</div>
                  <div className="w-1/6 font-medium">Quantity</div>
                  <div className="w-1/6 font-medium">Total Price</div>
                  <div className="w-1/6 font-medium">Status</div>
                </div>
              </div>
              <div>
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex border-b hover:bg-gray-100 p-4 transition duration-200"
                  >
                    <div className="w-1/6 font-semibold">{order.id}</div>
                    <div className="w-1/6">{order.customer}</div>
                    <div className="w-1/6">{order.item}</div>
                    <div className="w-1/6">{order.quantity}</div>
                    <div className="w-1/6 font-semibold text-[#E63946]">
                      ${order.price.toFixed(2)}
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

          {/* For Mobile View (card style with less data) */}
          <div className="sm:hidden">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="flex border-b rounded-lg shadow-lg hover:shadow-xl transition hover:bg-gray-100 p-4 mb-6"
              >
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-lg font-semibold text-[#2D6A4F]">
                    {order.item}
                  </h3>
                  <span className="text-[#E63946] font-bold text-lg">
                    ${order.price.toFixed(2)}
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
};

export default Orders;
