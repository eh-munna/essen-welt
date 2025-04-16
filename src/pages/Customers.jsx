import ConfirmDialog from '@/components/ConfirmDialog';
import CustomerEditModal from '@/components/Customers/CustomerEditModal';
import CustomerModal from '@/components/Customers/CustomerModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useTitle from '@/hooks/useTitle';
import useUsers from '@/hooks/useUsers';
import { Calendar, Edit, Eye, ShoppingCart, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Customers() {
  const [selectUser, setSelectUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const navigate = useNavigate();
  const { users, refetch } = useUsers();
  const axiosSecure = useAxiosSecure();
  useTitle('Customers');

  const handleEdit = (customer) => {
    setSelectUser(customer);
    setEdit(true);
  };

  const handleView = (customer) => {
    setSelectUser(customer);
    setView(true);
  };

  const handleDelete = useCallback(
    async (id) => {
      const response = await axiosSecure.delete(`/users/admin/${id}`);
      if (response.status === 200) {
        setSelectUser(null);
        refetch();
      }
    },
    [axiosSecure, refetch]
  );

  if (!users) return <p className="p-6 text-gray-900">Loading customers...</p>;
  if (users.length === 0) {
    return (
      <section className="bg-white min-h-screen p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-gray-900 mb-6">No customers found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold">Customers ({users.length})</h2>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-t-lg text-center">
            <div className="col-span-2 font-medium text-gray-500">Name</div>
            <div className="col-span-2 font-medium text-gray-500">Email</div>
            <div className="col-span-2 font-medium text-gray-500">Phone</div>
            <div className="col-span-3 font-medium text-gray-500">Manage</div>
            <div className="col-span-3 font-medium text-gray-500">Actions</div>
          </div>
          <div className="space-y-2">
            {users.map((customer) => (
              <div
                key={customer._id}
                className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <div className="col-span-2 font-medium text-gray-900 truncate">
                  {customer.firstName} {customer.lastName}
                </div>
                <div className="col-span-2 text-gray-500 truncate">
                  {customer.email}
                </div>
                <div className="col-span-2 text-gray-500 truncate">
                  {customer.phoneNumber}
                </div>
                <div className="col-span-3 flex justify-center space-x-1">
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/customer-orders/${customer.email}`)
                    }
                    size="sm"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/customer-bookings/${customer.email}`)
                    }
                    size="sm"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Calendar className="h-4 w-4" />
                    Bookings
                  </Button>
                </div>
                <div className="col-span-3 flex justify-center space-x-1">
                  <Button
                    onClick={() => handleView(customer)}
                    size="icon"
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button
                    onClick={() => handleEdit(customer)}
                    size="icon"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectUser(customer);
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
          {users.map((customer) => (
            <div
              key={customer._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {customer.phoneNumber}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    onClick={() => handleView(customer)}
                    size="icon"
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button
                    onClick={() => handleEdit(customer)}
                    size="icon"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectUser(customer);
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
              <div className="flex space-x-2 mt-3">
                <Button
                  onClick={() =>
                    navigate(`/dashboard/customer-orders/${customer.email}`)
                  }
                  size="sm"
                  variant="ghost"
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Orders
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/dashboard/customer-bookings/${customer.email}`)
                  }
                  size="sm"
                  variant="ghost"
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Bookings
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {view && selectUser && (
        <CustomerModal selectUser={selectUser} open={view} setOpen={setView} />
      )}
      {edit && selectUser && (
        <CustomerEditModal
          customer={selectUser}
          open={edit}
          setOpen={setEdit}
          refetch={refetch}
        />
      )}
      <ConfirmDialog
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        onConfirm={() => {
          handleDelete(selectUser?._id);
          setDeleteConfirm(false);
        }}
        title="Delete Customer"
        description="Are you sure you want to delete this customer? This action cannot be undone."
      />
    </section>
  );
}
