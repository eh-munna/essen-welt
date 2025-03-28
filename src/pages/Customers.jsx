import useUsers from '@/hooks/useUsers';

import ConfirmDialog from '@/components/ConfirmDialog';
import CustomerEditModal from '@/components/Customers/CustomerEditModal';
import CustomerModal from '@/components/Customers/CustomerModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useTitle from '@/hooks/useTitle';
import {
  LucideCalendar,
  LucideEdit,
  LucideEye,
  LucideShoppingCart,
  LucideTrash,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Customers() {
  const [selectUser, setSelectUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);

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

  if (!users) return <p>Loading customers...</p>;
  if (users.length === 0) return <p>No customers found.</p>;

  return (
    <section className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Customers ({users.length})</h2>

      {/* Grid Container for the table-like structure */}
      <div className="grid grid-cols-5 gap-4 p-4 bg-white shadow-md rounded-lg">
        {/* Header Row */}
        <div className="font-semibold">Name</div>
        <div className="font-semibold">Email</div>
        <div className="font-semibold">Phone</div>
        <div className="flex justify-center items-center font-semibold">
          Actions
        </div>
        <div className="flex justify-center items-center font-semibold">
          Manage
        </div>
      </div>

      {/* Data Rows */}
      {users.map((customer) => (
        <div
          className="grid grid-cols-5 gap-4 p-4 bg-white shadow-md rounded-lg items-center"
          key={customer._id}
        >
          <div className="customer-name">{customer.name}</div>
          <div className="customer-email">{customer.email}</div>
          <div className="customer-phone">{customer.phoneNumber}</div>

          {/* Manage Column */}
          <div className="customer-manage flex space-x-4 justify-center items-center">
            <Button
              variant="ghost"
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() =>
                navigate(`/dashboard/customer-orders/${customer.email}`)
              }
            >
              <LucideShoppingCart size={18} className="mr-1" />
              Orders
            </Button>
            <Button
              variant="ghost"
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() =>
                navigate(`/dashboard/customer-bookings/${customer.email}`)
              }
            >
              <LucideCalendar size={18} className="mr-1" />
              Bookings
            </Button>
          </div>

          {/* Actions Column */}
          <div className="customer-actions flex space-x-2 justify-center items-center">
            <Button
              variant="ghost"
              className="text-blue-500 hover:text-blue-700"
              // onClick={() => handleViewDetails(customer?.email)}
              onClick={() => handleView(customer)}
            >
              <LucideEye size={20} />
            </Button>
            <Button
              variant="ghost"
              className="text-yellow-500 hover:text-yellow-700"
              onClick={() => handleEdit(customer)}
            >
              <LucideEdit size={20} />
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
            onConfirm={() => handleDelete(customer._id)}
          />
        </div>
      ))}

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
    </section>
  );
}
