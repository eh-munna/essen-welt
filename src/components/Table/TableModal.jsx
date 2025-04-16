import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useTable from '@/hooks/useTable';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function TableModal({ table, open, setOpen }) {
  const axiosSecure = useAxiosSecure();
  const { refetch } = useTable();

  // Initialize the form
  const form = useForm({
    defaultValues: {
      tableNumber: table?.tableNumber || 1,
      capacity: table?.capacity || 2,
    },
  });

  // Reset form when switching between Add/Edit modes
  useEffect(() => {
    if (table) {
      form.reset(table);
    }
  }, [table, open, form]);

  // Handle Form Submission
  const handleSubmit = useCallback(
    async (data) => {
      const tableData = {
        tableNumber: Number(data.tableNumber),
        capacity: Number(data.capacity),
      };

      try {
        if (table) {
          // Update Table API Call
          await axiosSecure.put(`/tables/admin/${table?._id}`, tableData);
        
        } else {
          // Add Table API Call
          await axiosSecure.post('/tables/admin', tableData);
          
        }
        setOpen(false); // Close modal after successful operation
        refetch();
      } catch ({ response }) {
        console.error('Error:', response?.data?.message);
      }
    },
    [axiosSecure, refetch, setOpen, table]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B4D38]">
            {table ? 'Edit Table' : 'Add A New Table'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Table Number */}
            <FormField
              name="tableNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Number</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} min={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Capacity */}
            <FormField
              name="capacity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} min={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit">
              {table ? 'Save Changes' : 'Add Table'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Props Validations

import PropTypes from 'prop-types';

TableModal.propTypes = {
  table: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
