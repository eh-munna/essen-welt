import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, MapPin, Phone } from 'lucide-react';
import { PropTypes } from 'prop-types';

export default function CustomerModal({ selectUser, open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-[#075E54] text-white p-6 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {selectUser?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-[#25D366]" />
            <span className="text-sm">{selectUser?.email || 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-[#25D366]" />
            <span className="text-sm">{selectUser?.phoneNumber || 'N/A'}</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-[#25D366]" />
            <span className="text-sm">
              {selectUser?.deliveryAddress?.street},{' '}
              {selectUser?.deliveryAddress?.city},{' '}
              {selectUser?.deliveryAddress?.country} -{' '}
              {selectUser?.deliveryAddress?.postalCode}
            </span>
          </div>
        </div>
        <DialogFooter className="sm:justify-end mt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-[#25D366] text-white hover:bg-[#128C7E]"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

CustomerModal.propTypes = {
  selectUser: PropTypes.object,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
