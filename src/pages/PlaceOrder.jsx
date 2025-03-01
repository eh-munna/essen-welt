import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function PlaceOrder() {
  const [openModal, setOpenModal] = useState(false);
  const form = useForm();
  const navigate = useNavigate();

  const handleOnSubmit = (data) => {
    navigate('/payment');
    setOpenModal(false);
  };

  openModal && {};
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          className="mt-6 w-full bg-[#2D6A4F] text-white py-3 rounded-md hover:bg-[#1B4D38] transition duration-200"
          aria-live="polite"
        >
          Place Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B4D38]">Place Your Order</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-8"
          >
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your name"
                        {...field}
                        value={field.value || ''}
                        className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        value={field.value || ''}
                        className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Phone and Number of People */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+49(0)123456789"
                        {...field}
                        value={field.value || ''}
                        className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Straße 123, 12345 Germany"
                        {...field}
                        value={field.value || ''}
                        className="border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}

            <DialogFooter>
              <Button
                type="submit"
                className="w-full py-3 bg-[#2D6A4F] text-white hover:bg-[#1F4F39] transition duration-200"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
