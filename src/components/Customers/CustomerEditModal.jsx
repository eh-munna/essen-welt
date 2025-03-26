import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useAxiosSecure from '@/hooks/useAxiosSecure';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
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
      const response = await axiosSecure.put(
        `/users/admin/${customer?._id}`,
        data
      );
      if (response.status === 200) {
        setOpen(false);
        refetch();
      }
      console.log(response);
    },
    [axiosSecure, customer?._id, setOpen, refetch]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-[#ffffff] text-[#333333] p-8 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#075E54]">
            Change Customer Status
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
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
                        <SelectTrigger className="w-full py-2 px-4 rounded-md border-gray-300 focus:ring-2 focus:ring-[#075E54]">
                          Change Status
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="blocked">Block</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <DialogFooter className="sm:justify-end mt-6 flex w-full">
                <Button
                  type="submit"
                  className=" bg-[#075E54] text-white hover:bg-[#128C7E]"
                >
                  Save Changes
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className=" bg-[#F0F0F0] text-[#333333] hover:bg-[#DDDDDD]"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
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
