import TableModal from '@/components/Table/TableModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useTable from '@/hooks/useTable';
import { useCallback, useState } from 'react';

export default function ModifyTable() {
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
        if (data?.success) {
          console.log('Table deleted:', tableId);
        }
        refetch();
      } catch (error) {
        console.log(error);
      }
    },
    [axiosSecure, refetch]
  );

  if (!tables?.length) {
    return (
      <section className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col text-center py-4">
          <p>No tables available</p>

          <Button
            onClick={() => setOpen(true)}
            className="mt-8 px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-700"
          >
            Add Table
          </Button>
        </div>
        <TableModal open={open} setOpen={setOpen} />
      </section>
    );
  }

  return (
    <div className="bg-[#075E54] min-h-screen text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Modify Tables</h2>
      <div className="overflow-x-auto">
        <div className="bg-[#075E54] text-white shadow-md rounded-lg">
          <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-600 font-semibold">
            <div>Table Number</div>
            <div>Capacity</div>
            <div>Actions</div>
          </div>
          {tables?.length > 0 &&
            tables.map((table) => (
              <div
                key={table._id}
                className="grid grid-cols-3 gap-4 items-center p-4 border-b border-gray-700"
              >
                <div>{table.tableNumber}</div>
                <div>{table.capacity}</div>
                <div className="flex gap-2">
                  {/* EDIT BUTTON */}
                  <Button onClick={() => handleEditClick(table)}>Edit</Button>

                  {/* DELETE BUTTON */}
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(table._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Table Modal for Editing */}
      <TableModal table={selectedTable} open={open} setOpen={setOpen} />
    </div>
  );
}
