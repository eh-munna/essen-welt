import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';

import PropTypes from 'prop-types';

export default function ConfirmDialog({
  open,
  setOpen,
  onConfirm,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        as={motion.div} // Make the DialogContent a motion div
        initial={{ opacity: 0, y: -50 }} // Start position (above the screen)
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : -50 }} // Slide down when open
        exit={{ opacity: 0, y: -50 }} // Slide back up when closed
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`sm:max-w-md bg-[#075E54] text-white rounded-xl shadow-lg transition-all duration-300`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <p
            className={cn('', {
              'text-orange-400': description,
              'sr-only': !description,
            })}
          >
            {description}
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="bg-gray-600 hover:bg-gray-700 text-white transition-colors"
            >
              {cancelText}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 text-white transition-colors"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Props Validation
ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};
