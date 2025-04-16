import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export default function CustomerEditModal({
  customer,
  open,
  setOpen,
  refetch,
}) {
  const axiosSecure = useAxiosSecure();

  const form = useForm({
    defaultValues: {
      ...customer,
      isActive: customer?.isActive || 'active',
    },
  });

  const handleSubmit = useCallback(
    async (data) => {
      try {
        const response = await axiosSecure.put(
          `/users/admin/${customer?._id}`,
          data
        );
        if (response.status === 200) {
          setOpen(false);
          refetch();
        }
      } catch (error) {
        console.error('Error updating customer status:', error);
      }
    },
    [axiosSecure, customer?._id, setOpen, refetch]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white text-gray-800 rounded-lg shadow-xl transition-all duration-300 sm:max-w-md w-[95vw] max-w-[95vw] sm:w-full">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-emerald-700">
            Customer Status
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Update customer account status
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              name="isActive"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <SelectItem
                        value="active"
                        className="hover:bg-emerald-50 focus:bg-emerald-50 transition-colors"
                      >
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                          Active
                        </span>
                      </SelectItem>
                      <SelectItem
                        value="blocked"
                        className="hover:bg-red-50 focus:bg-red-50 transition-colors"
                      >
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Blocked
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-sm"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

CustomerEditModal.propTypes = {
  customer: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
