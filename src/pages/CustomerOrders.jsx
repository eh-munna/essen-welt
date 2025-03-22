import OrderModal from '@/components/Customers/OrderModal';
import { Button } from '@/components/ui/button';
import useCustomerOrders from '@/hooks/useCustomerOrders';
import { LucideTrash } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerOrders() {
  const { customerEmail } = useParams();
  const { customerOrders } = useCustomerOrders(customerEmail);

  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!customerOrders) return <p>Loading orders...</p>;
  if (customerOrders.length === 0)
    return <p>No orders found for this customer.</p>;

  const handleEditStatus = (order) => {
    setSelectedOrder(order);
  };

  const handleDelete = (orderId) => {
    console.log(`Deleting order with ID: ${orderId}`);
    // Logic to delete the order
  };

  return (
    <section className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Orders for {customerEmail}</h2>

      {/* Grid Container for the order details */}
      <div className="grid grid-cols-5 gap-4 p-4 bg-white shadow-md rounded-lg">
        {/* Header Row */}
        <div className="font-semibold">Order ID</div>
        <div className="font-semibold">Items</div>
        <div className="font-semibold">Total Price</div>
        <div className="font-semibold">Status</div>
        <div className="flex justify-center items-center font-semibold">
          Actions
        </div>
      </div>

      {/* Data Rows */}
      {customerOrders.map((order) => (
        <div
          className="grid grid-cols-5 gap-4 p-4 bg-white shadow-md rounded-lg items-center"
          key={order._id}
        >
          <div className="order-id">{order._id}</div>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.name}>
                {item.name} (x{item.quantity})
              </div>
            ))}
          </div>
          <div className="order-totalPrice">€ {order.totalPrice}</div>
          <div>
            <p
              className={`order-status px-2 py-1 rounded-full ${
                order.status === 'pending'
                  ? 'bg-yellow-200 text-gray-900'
                  : 'bg-green-200 text-green-600'
              }`}
            >
              {order.status}
            </p>
          </div>

          {/* Actions Column */}
          <div className="order-actions flex space-x-2 justify-center items-center">
            <Button
              disabled={order.status === 'approved'}
              variant="ghost"
              className="text-yellow-500 hover:text-yellow-700"
              onClick={() => handleEditStatus(order)}
            >
              Edit Status
            </Button>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(order._id)}
            >
              <LucideTrash size={20} />
            </Button>
          </div>
        </div>
      ))}

      {/* Order Status Edit Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          open={selectedOrder}
          setOpen={() => setSelectedOrder(null)}
        />
      )}
    </section>
  );
}
