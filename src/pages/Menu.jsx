import { MenuItem } from '@/components/Menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useMenu from '@/hooks/useMenu';
import { useState } from 'react';

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState('starters');
  // const axiosPublic = useAxiosPublic();

  const { allMenus } = useMenu(activeMenu);

  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //   const fetchMenu = async () => {
  //     const { data } = await axiosPublic.get(`/menus?category=${activeMenu}`);
  //     setMenu(data?.data);
  //   };
  //   fetchMenu();
  // }, [activeMenu, axiosPublic]);
  // const menus = menu?.menus;
  // const categories = menu?.categories;
  const menus = allMenus?.menus;
  const categories = allMenus?.categories;

  const preferredCategory = ['starters', 'mains'];
  const sortedCategories = categories?.slice().sort((a, b) => {
    if (preferredCategory.includes(a) && preferredCategory.includes(b)) {
      return preferredCategory.indexOf(a) - preferredCategory.indexOf(b);
    }
    if (preferredCategory.includes(a)) return -1;
    if (preferredCategory.includes(b)) return 1;
    return a.localeCompare(b);
  });

  return (
    <>
      <Tabs
        value={activeMenu}
        onValueChange={setActiveMenu}
        className="w-full mx-auto bg-[#006A4E]"
      >
        <TabsList className="py-6 flex justify-evenly items-center gap-6 rounded-none bg-[#006A4E]">
          {sortedCategories?.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className={`text-green-500 border border-green-500 p-2 hover:bg-red-500 hover:text-orange-400 transition delay-150 duration-300 ease-in-out`}
            >
              {category.slice(0, 1).toUpperCase() +
                category.slice(1).toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeMenu} className={`min-h-screen`}>
          <div className="grid md:grid-cols-3 gap-3 space-y-3">
            {menus?.map((item) => (
              <MenuItem key={item._id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
