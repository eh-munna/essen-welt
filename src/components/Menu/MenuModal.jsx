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
import useMenu from '@/hooks/useMenu';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export default function MenuModal({ menu, open, setOpen }) {
  const axiosSecure = useAxiosSecure();
  const { refetch } = useMenu();
  const categories = ['starters', 'mains', 'desserts', 'beverages'];
  // Initialize the form
  const form = useForm({
    defaultValues: {
      name: menu?.name || '',
      category: menu?.category || '',
      price: menu?.price || '',
      recipe: menu?.recipe || '',
      image: menu?.image || '',
      popular: menu?.popular || '',
    },
  });

  // Reset form when switching between Add/Edit modes
  useEffect(() => {
    if (menu) {
      form.reset(menu); // Reset form values
    }
  }, [menu, open, form]);

  // Handle Form Submission
  const handleSubmit = useCallback(
    async (data) => {
      const menuData = {
        ...data,
        price: Number(data.price),
      };

      try {
        if (menu) {
          // Update Menu API Call
          await axiosSecure.put(`/menus/admin/${menu?._id}`, menuData); // Changed URL for menu
          console.log('Menu updated:', menuData);
        } else {
          // Add Menu API Call
          await axiosSecure.post('/menus/admin', menuData); // Changed URL for menu
          console.log('Menu added:', menuData);
        }
        setOpen(false); // Close modal after successful operation
        refetch(); // Refetch menu data
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [axiosSecure, refetch, setOpen, menu]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B4D38]">
            {menu ? 'Edit Menu' : 'Add A New Menu'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)} // Form submission using react-hook-form
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.substring(0, 1).toUpperCase() +
                            category.substring(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={Number(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Recipe */}
            <FormField
              name="recipe"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Popular */}
            <FormField
              name="popular"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Popular</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === 'true')}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select popularity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit">
              {menu ? 'Edit Menu' : 'Add A New Menu'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// props validation

import PropTypes from 'prop-types';

MenuModal.propTypes = {
  menu: PropTypes.object,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
