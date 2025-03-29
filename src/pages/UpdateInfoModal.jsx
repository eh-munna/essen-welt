import PropTypes from 'prop-types';

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
import { useNavigate } from 'react-router-dom';

export default function UpdateInfoModal({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`sm:max-w-md bg-[#075E54] text-white rounded-xl shadow-lg transition-all duration-300 transform ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Complete Your Profile
          </DialogTitle>

          <DialogDescription className={'sr-only'}></DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button
              onClick={() => {
                navigate(`/dashboard/edit-profile`);
                setOpen(false);
              }}
              variant="secondary"
              className="bg-gray-600 hover:bg-gray-700 text-white transition-colors"
            >
              Edit Profile
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Props Validation
UpdateInfoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
