import MenuModal from '@/components/Menu/MenuModal';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useMenu from '@/hooks/useMenu';
import { useCallback, useState } from 'react';

export default function ModifyMenu() {
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
          console.log('Menu deleted:', menuId);
        }
        refetch(); // Assuming refetch updates the menu list
      } catch (error) {
        console.log(error);
      }
    },
    [axiosSecure, refetch]
  );

  if (!menus?.length) {
    return (
      <section className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col text-center py-4">
          <p>No menus available</p>

          <Button
            onClick={() => setOpen(true)}
            className="mt-8 px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-700"
          >
            Add Menu
          </Button>
        </div>
        <MenuModal open={open} setOpen={setOpen} />
      </section>
    );
  }

  return (
    <div className="bg-[#075E54] min-h-screen text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Modify Menu</h2>
      <div className="overflow-x-auto">
        <div className="bg-[#075E54] text-white shadow-md rounded-lg">
          <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-600 font-semibold">
            <div>Menu Name</div>
            <div>Category</div>
            <div>Actions</div>
          </div>
          {menus?.length > 0 &&
            menus.map((menu) => (
              <div
                key={menu._id}
                className="grid grid-cols-3 gap-4 items-center p-4 border-b border-gray-700"
              >
                <div>{menu.name}</div>
                <div>{menu.category}</div>
                <div className="flex gap-2">
                  {/* EDIT BUTTON */}
                  <Button onClick={() => handleEditClick(menu)}>Edit</Button>
                  {/* DELETE BUTTON */}
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(menu._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <MenuModal menu={selectedMenu} open={open} setOpen={setOpen} />
    </div>
  );
}
