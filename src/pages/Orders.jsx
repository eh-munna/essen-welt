import ConfirmDialog from '@/components/ConfirmDialog';
import OrderModal from '@/components/Customers/OrderModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomerOrders from '@/hooks/useCustomerOrders';
import useTitle from '@/hooks/useTitle';
import { Loader2, LucideEdit, LucideTrash, XCircle } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function Orders() {
  const { customerOrders: allOrders, refetch } = useCustomerOrders();
  useTitle('Orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

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

  if (!allOrders) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#25D366]" />
        <p className="mt-2 text-lg">Loading orders...</p>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <XCircle className="w-10 h-10 text-red-500" />
        <p className="mt-2 text-lg">No orders found.</p>
      </div>
    );
  }

  return (
    <section className="bg-[#075E54] min-h-screen text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

      <div className="overflow-x-auto">
        <div className="bg-[#075E54] text-white shadow-md rounded-lg">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-600 font-semibold">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Total</div>
            <div>Status</div>
            <div>Payment</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {allOrders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-6 gap-4 items-center p-4 border-b border-gray-700"
            >
              <div className="text-[#25D366] font-medium">{order._id}</div>
              <div>{order.customer.name}</div>
              <div className="font-semibold">${order.totalPrice}</div>

              <div
                className={`px-2 py-1 text-xs font-bold rounded-md ${
                  order.status === 'pending'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>

              <div>
                {order.paymentMethod.charAt(0).toUpperCase() +
                  order.paymentMethod.slice(1)}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  disabled={order.status === 'confirmed'}
                  variant="ghost"
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center gap-1 text-yellow-500 hover:text-yellow-700"
                >
                  <LucideEdit size={20} />
                </Button>

                <Button
                  variant="destructive"
                  className="text-white  bg-red-500 hover:bg-white hover:text-red-500"
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
        </div>
      </div>

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
