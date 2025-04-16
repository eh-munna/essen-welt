import ConfirmDialog from '@/components/ConfirmDialog';
import OrderModal from '@/components/Customers/OrderModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomerOrders from '@/hooks/useCustomerOrders';
import useTitle from '@/hooks/useTitle';
import { Edit, Loader2, Trash2, XCircle } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function Orders() {
  const { customerOrders: allOrders, refetch } = useCustomerOrders();
  useTitle('Orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const axiosSecure = useAxiosSecure();

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

  if (!allOrders) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <p className="mt-2 text-lg">Loading orders...</p>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
        <XCircle className="w-10 h-10 text-red-500" />
        <p className="mt-2 text-lg">No orders found</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Manage Orders</h2>

        {/* Desktop Grid View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-t-lg text-center">
            <div className="col-span-2 font-medium text-gray-500">Order ID</div>
            <div className="col-span-2 font-medium text-gray-500">Customer</div>
            <div className="col-span-2 font-medium text-gray-500">Total</div>
            <div className="col-span-2 font-medium text-gray-500">Status</div>
            <div className="col-span-1 font-medium text-gray-500">Payment</div>
            <div className="col-span-3 font-medium text-gray-500">Actions</div>
          </div>
          <div className="space-y-2">
            {allOrders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <div className="col-span-2 font-medium truncate">
                  {order._id}
                </div>
                <div className="col-span-2 text-gray-500 truncate">
                  {order.customer.firstName} {order?.customer.lastName}
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
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
                <div className="col-span-1 text-gray-500">
                  {order.paymentMethod.charAt(0).toUpperCase() +
                    order.paymentMethod.slice(1)}
                </div>
                <div className="col-span-3 flex justify-center space-x-2">
                  <Button
                    onClick={() => {
                      setSelectedOrder(order);
                    }}
                    size="icon"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                    disabled={order.status === 'confirmed'}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedOrder(order);
                      setDeleteConfirm(true);
                    }}
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {allOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="truncate">
                  <h3 className="font-medium"># Order {order._id}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Customer: {order.customer.firstName}{' '}
                    {order.customer.lastName}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Total: €{order.totalPrice}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-3">
                <Button
                  onClick={() => {
                    setSelectedOrder(order);
                  }}
                  size="sm"
                  variant="ghost"
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  disabled={order.status === 'confirmed'}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setSelectedOrder(order);
                    setDeleteConfirm(true);
                  }}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Modal */}
      {selectedOrder && !deleteConfirm && (
        <OrderModal
          order={selectedOrder}
          open={!!selectedOrder}
          setOpen={() => setSelectedOrder(null)}
          refetch={refetch}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        onConfirm={() => {
          handleDelete(selectedOrder?._id);
          setDeleteConfirm(false);
          setSelectedOrder(null);
        }}
        onCancel={() => setSelectedOrder(null)}
        title="Delete Order"
        description={`Are you sure you want to delete order #${selectedOrder?._id.slice(
          -6
        )}? This action cannot be undone.`}
      />
    </div>
  );
}
