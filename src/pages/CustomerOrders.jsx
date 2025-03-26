import ConfirmDialog from '@/components/ConfirmDialog';
import OrderModal from '@/components/Customers/OrderModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomerOrders from '@/hooks/useCustomerOrders';
import { LucideTrash } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerOrders() {
  const { customerEmail } = useParams();
  const { customerOrders, refetch } = useCustomerOrders(customerEmail);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleDelete = useCallback(
    async (orderId) => {
      try {
        const response = await axiosSecure.delete(`/orders/admin/${orderId}`);
        if (response.status === 200) {
          setSelectedOrder(null);
          refetch();
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    },
    [axiosSecure, refetch]
  );

  if (!customerOrders) return <p>Loading orders...</p>;
  if (customerOrders.length === 0)
    return <p>No orders found for this customer.</p>;

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
              disabled={order.status === 'confirmed'}
              variant="ghost"
              className="text-yellow-500 hover:text-yellow-700"
              onClick={() => setSelectedOrder(order)}
            >
              Edit Status
            </Button>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-700"
              onClick={() => setOpen(true)}
            >
              <LucideTrash size={20} />
            </Button>
          </div>
          <ConfirmDialog
            open={open}
            setOpen={setOpen}
            onConfirm={() => handleDelete(order?._id)}
            title="Delete Order"
            description={`Order for #${order?._id} will be deleted!`}
          />
        </div>
      ))}

      {/* Order Status Edit Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          open={selectedOrder}
          setOpen={() => setSelectedOrder(null)}
          refetch={refetch}
        />
      )}
    </section>
  );
}
