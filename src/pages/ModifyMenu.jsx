import ConfirmDialog from '@/components/ConfirmDialog';
import MenuModal from '@/components/Menu/MenuModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useMenu from '@/hooks/useMenu';
import useTitle from '@/hooks/useTitle';
import { motion } from 'framer-motion';
import { Edit, Pen, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function ModifyMenu() {
  useTitle('Modify Menu');

  const {
    allMenus: { menus },
    refetch,
  } = useMenu();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [open, setOpen] = useState(false); // Controls dialog visibility
  const axiosSecure = useAxiosSecure();
  // Handle edit button click
  const handleEditClick = (menu) => {
    setSelectedMenu(menu);
    setOpen(true);
  };

  const handleDelete = useCallback(
    async (menuId) => {
      try {
        const { data } = await axiosSecure.delete(`/menus/admin/${menuId}`);
        if (data?.success) {
          console.info('Menu deleted:', menuId);
        }
        refetch(); // Assuming refetch updates the menu list
      } catch (error) {
        console.error(error);
      }
    },
    [axiosSecure, refetch]
  );

  if (!menus?.length) {
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
            Add Menu Item
          </Button>
        </motion.div>
        <MenuModal open={open} setOpen={setOpen} />
      </section>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold">Modify Menu</h2>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                setSelectedMenu(null);
                setOpen(true);
              }}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg "
            >
              Add New Menu
            </Button>
          </motion.div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-t-lg">
            <div className="col-span-5 font-medium text-gray-500">
              Menu Name
            </div>
            <div className="col-span-5 font-medium text-gray-500">Category</div>
            <div className="col-span-2 font-medium text-gray-500">Actions</div>
          </div>
          <div className="space-y-2">
            {menus.map((menu) => (
              <div
                key={menu._id}
                className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="col-span-5 font-medium text-gray-900">
                  {menu.name}
                </div>
                <div className="col-span-5 text-gray-500">{menu.category}</div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <Button
                    onClick={() => handleEditClick(menu)}
                    size="icon"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>

                  <ConfirmDialog
                    open={open}
                    setOpen={setOpen}
                    onConfirm={() => handleDelete(menu._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{menu.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{menu.category}</p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    onClick={() => handleEditClick(menu)}
                    size="icon"
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Pen className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                  <ConfirmDialog
                    open={open}
                    setOpen={setOpen}
                    onConfirm={() => handleDelete(menu._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMenu && (
        <MenuModal
          menu={selectedMenu}
          open={!!selectedMenu}
          setOpen={() => setSelectedMenu(null)}
        />
      )}
    </div>
  );
}
