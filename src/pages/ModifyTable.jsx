import ConfirmDialog from '@/components/ConfirmDialog';
import TableModal from '@/components/Table/TableModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useTable from '@/hooks/useTable';
import useTitle from '@/hooks/useTitle';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function ModifyTable() {
  useTitle('Modify Table');
  const { tables, refetch } = useTable();
  const [selectedTable, setSelectedTable] = useState(null);
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleEditClick = (table) => {
    setSelectedTable(table);
    setOpen(true);
  };

  const handleDelete = useCallback(
    async (tableId) => {
      try {
        const { data } = await axiosSecure.delete(`/tables/admin/${tableId}`);
        
        refetch();
      } catch (error) {
        console.error(error);
      }
    },
    [axiosSecure, refetch]
  );

  if (!tables?.length) {
    return (
      <section className="bg-white min-h-screen p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-gray-900 mb-6">No tables available</p>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setOpen(true)}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Add Table
            </Button>
          </motion.div>
        </div>
        <TableModal open={open} setOpen={setOpen} />
      </section>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold">Modify Tables</h2>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                setSelectedTable(null);
                setOpen(true);
              }}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Add New Table
            </Button>
          </motion.div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-t-lg">
            <div className="col-span-4 font-medium text-gray-500">
              Table Number
            </div>
            <div className="col-span-4 font-medium text-gray-500">Capacity</div>
            <div className="col-span-4 font-medium text-gray-500">Actions</div>
          </div>
          <div className="space-y-2">
            {tables.map((table) => (
              <div
                key={table._id}
                className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="col-span-4 font-medium text-gray-900">
                  {table.tableNumber}
                </div>
                <div className="col-span-4 text-gray-500">
                  {table.capacity} seats
                </div>
                <div className="col-span-4 flex justify-end space-x-2">
                  <Button
                    onClick={() => handleEditClick(table)}
                    size="icon"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                  <ConfirmDialog
                    open={open}
                    setOpen={setOpen}
                    onConfirm={() => handleDelete(table._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {tables.map((table) => (
            <div
              key={table._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    Table #{table.tableNumber}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {table.capacity} seats
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    onClick={() => handleEditClick(table)}
                    size="icon"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                  <ConfirmDialog
                    open={open}
                    setOpen={setOpen}
                    onConfirm={() => handleDelete(table._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTable && (
        <TableModal
          table={selectedTable}
          open={!!selectedTable}
          setOpen={() => setSelectedTable(null)}
        />
      )}
    </div>
  );
}
