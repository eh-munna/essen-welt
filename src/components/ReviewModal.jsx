import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import PropTypes from 'prop-types';

export default function ReviewModal({ open, setOpen, review }) {
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{review?.name}</DialogTitle>
            <DialogDescription>
              {review?.message || 'No review content available.'}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

ReviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};
