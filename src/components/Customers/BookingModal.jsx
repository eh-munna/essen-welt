// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import convertToDayDate from '@/utils/BookingUtils';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';

// export default function BookingModal({
//   error,
//   selectedBooking,
//   open,
//   setOpen,
//   onUpdate,
// }) {
//   const form = useForm({
//     defaultValues: {
//       ...selectedBooking,
//       date: convertToDayDate(selectedBooking?.date).date,
//       startTime: convertToDayDate(selectedBooking?.startTime).time,
//       endTime: convertToDayDate(selectedBooking?.endTime).time,
//       numberOfPeople: selectedBooking?.numberOfPeople || 1,
//     },
//   });

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-md bg-white text-gray-800 p-8 rounded-xl shadow-lg">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold text-[#075E54]">
//             Edit Booking
//           </DialogTitle>
//           {error && <h3 className="text-red-500">{error}</h3>}
//         </DialogHeader>

//         <div className="space-y-6">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-6">
//               {/* Date Field */}
//               <FormField
//                 name="date"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Booking Date</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="date"
//                         placeholder="Booking Date"
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Time Field */}
//               <FormField
//                 name="startTime"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Start Time</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="time"
//                         placeholder="Booking Start Time"
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               {/* Time Field */}
//               <FormField
//                 name="endTime"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>End Time</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="time"
//                         placeholder="Booking End Time"
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Number of Guests */}
//               <FormField
//                 name="numberOfPeople"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Number of People</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="number"
//                         placeholder="Number of Guests"
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Submit & Close Buttons */}
//               <DialogFooter className="sm:justify-end mt-6 flex w-full">
//                 <Button
//                   type="submit"
//                   className="bg-[#075E54] text-white hover:bg-[#128C7E]"
//                 >
//                   Save Changes
//                 </Button>
//                 <DialogClose asChild>
//                   <Button
//                     type="button"
//                     variant="secondary"
//                     className="bg-gray-200 text-gray-800 hover:bg-gray-300"
//                   >
//                     Close
//                   </Button>
//                 </DialogClose>
//               </DialogFooter>
//             </form>
//           </Form>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // Prop validations
// BookingModal.propTypes = {
//   selectedBooking: PropTypes.object.isRequired,
//   error: PropTypes.string,
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import convertToDayDate from '@/utils/BookingUtils';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

export default function BookingModal({
  error,
  selectedBooking,
  open,
  setOpen,
  onUpdate,
}) {
  const form = useForm({
    defaultValues: {
      ...selectedBooking,
      date: convertToDayDate(selectedBooking?.date).date,
      startTime: convertToDayDate(selectedBooking?.startTime).time,
      endTime: convertToDayDate(selectedBooking?.endTime).time,
      numberOfPeople: selectedBooking?.numberOfPeople || 1,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white text-[#131313] rounded-lg shadow-xl transition-all duration-200 sm:max-w-md w-[95vw] max-w-[95vw] sm:w-full p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-[#131313]">
            Edit Booking Details
          </DialogTitle>
          {error && (
            <DialogDescription className="text-red-500">
              {error}
            </DialogDescription>
          )}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-4">
            {/* Date Field */}
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#131313]">Booking Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                name="startTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#131313]">Start Time</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="endTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#131313]">End Time</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Number of Guests */}
            <FormField
              name="numberOfPeople"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#131313]">
                    Number of People
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 text-[#131313] hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-sm"
              >
                Update Booking
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

BookingModal.propTypes = {
  selectedBooking: PropTypes.object.isRequired,
  error: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
