import TableModal from '@/components/Table/TableModal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AddTable() {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <Button
        onClick={() => setOpen(true)}
        className="mt-8 px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-700"
      >
        Add Table
      </Button>
      <TableModal open={open} setOpen={setOpen} />
    </section>
  );
}
