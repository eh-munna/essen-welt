import ConfirmDialog from '@/components/ConfirmDialog';
import OrderModal from '@/components/Customers/OrderModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomerOrders from '@/hooks/useCustomerOrders';
import useTitle from '@/hooks/useTitle';
import { Edit, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerOrders() {
  useTitle('Orders');
  const { customerEmail } = useParams();
  const { customerOrders, refetch } = useCustomerOrders(customerEmail);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const axiosSecure = useAxiosSecure();
  console.log(customerOrders);
  const handleDelete = useCallback(
    async (orderId) => {
      try {
        const response = await axiosSecure.delete(`/orders/admin/${orderId}`);
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    },
    [axiosSecure, refetch]
  );

  if (!customerOrders)
    return <p className="p-6 text-gray-900">Loading orders...</p>;
  if (customerOrders.length === 0) {
    return (
      <section className="bg-white min-h-screen p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-gray-900 mb-6">
            No orders found for this customer
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold">Orders for {customerEmail}</h2>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-t-lg text-center">
            <div className="col-span-2 font-medium text-gray-500">Order ID</div>
            <div className="col-span-3 font-medium text-gray-500">Items</div>
            <div className="col-span-2 font-medium text-gray-500">Total</div>
            <div className="col-span-2 font-medium text-gray-500">Status</div>
            <div className="col-span-3 font-medium text-gray-500">Actions</div>
          </div>
          <div className="space-y-2">
            {customerOrders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <div className="col-span-2 font-medium truncate">
                  {order._id}
                </div>
                <div className="col-span-3 text-gray-500">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      {item.name} (x{item.quantity})
                    </div>
                  ))}
                </div>
                <div className="col-span-2 font-semibold">
                  €{order.totalPrice}
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="col-span-3 flex justify-center space-x-2">
                  <Button
                    onClick={() => setSelectedOrder(order)}
                    size="sm"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                    disabled={order.status === 'confirmed'}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                  </Button>
                  <Button
                    onClick={() => {
                      // setSelectedOrder(order);
                      setDeleteConfirm(true);
                    }}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                  </Button>
                </div>
                <ConfirmDialog
                  open={deleteConfirm}
                  setOpen={setDeleteConfirm}
                  onConfirm={() => {
                    handleDelete(order?._id);
                  }}
                  title="Delete Order"
                  description={`Are you sure you want to delete order #${order?._id}?`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {customerOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="truncate">
                  <h3 className="font-medium">#Order {order._id}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.itemName} (x{item.quantity})
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold">€{order.totalPrice}</span>
                  <span
                    className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 mt-3">
                <Button
                  onClick={() => setSelectedOrder(order)}
                  size="sm"
                  variant="ghost"
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  disabled={order.status === 'confirmed'}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  <span>Edit</span>
                </Button>
                <Button
                  onClick={() => {
                    setDeleteConfirm(true);
                  }}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span>Delete</span>
                </Button>
              </div>
              <ConfirmDialog
                open={deleteConfirm}
                setOpen={setDeleteConfirm}
                onConfirm={() => {
                  handleDelete(order?._id);
                }}
                title="Delete Order"
                description={`Are you sure you want to delete order #${order?._id}?`}
              />
            </div>
          ))}
        </div>

        {/* Order Modal */}
        {selectedOrder && (
          <OrderModal
            order={selectedOrder}
            open={!!selectedOrder}
            setOpen={() => setSelectedOrder(null)}
            refetch={refetch}
          />
        )}
      </div>
    </section>
  );
}
