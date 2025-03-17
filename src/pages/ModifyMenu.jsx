import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useMenu from '@/hooks/useMenu';

export default function ModifyMenu() {
  const {
    allMenus: { menus },
  } = useMenu();

  // Function to handle edit or delete actions
  const handleEditMenu = (menu) => {
    // Handle the edit action
    console.log('Edit Menu:', menu);
  };

  const handleDeleteMenu = (menuId) => {
    // Handle delete action
    console.log('Delete Menu:', menuId);
  };

  return (
    <div className="bg-[#075E54] min-h-screen text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Modify Menu</h2>
      <div className="overflow-x-auto">
        <div className="bg-[#075E54] text-white shadow-md rounded-lg">
          <div className="grid grid-cols-5 gap-4 p-4">
            <div className="font-semibold">Menu Name</div>
            <div className="font-semibold">Category</div>
            <div className="font-semibold">Actions</div>
          </div>
          {menus?.length > 0 ? (
            menus.map((menu) => (
              <div
                key={menu._id}
                className="grid grid-cols-5 gap-4 items-center p-4 border-b border-gray-700"
              >
                <div>{menu.name}</div>
                <div>{menu.category}</div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{menu?.name}</DialogTitle>
                        <DialogDescription>
                          Edit the menu details. Click save when you are done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue={menu?.name}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => handleEditMenu(menu)}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <button
                    onClick={() => handleDeleteMenu(menu._id)}
                    className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-5 text-center py-4">
              No menus available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
