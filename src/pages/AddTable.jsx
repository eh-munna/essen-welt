import TableModal from '@/components/Table/TableModal';
import { Button } from '@/components/ui/button';
import useTitle from '@/hooks/useTitle';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AddTable() {
  const [open, setOpen] = useState(false);

  useTitle('Add Table');

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <motion.div
        className="text-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setOpen(true)}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg"
        >
          Add Table
        </Button>
      </motion.div>
      <TableModal open={open} setOpen={setOpen} />
    </section>
  );
}
