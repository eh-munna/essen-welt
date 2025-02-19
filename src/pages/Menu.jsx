import { MenuItem } from '@/components/Menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useEffect, useState } from 'react';

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState('starters');
  const axiosPublic = useAxiosPublic();

  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const fetchMenu = async () => {
      const { data } = await axiosPublic.get(`/menus?category=${activeMenu}`);
      setMenu(data?.data);
    };
    fetchMenu();
  }, [activeMenu]);
  const menus = menu?.menus;
  const categories = menu?.categories;

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
        className="w-2/3 mx-auto"
      >
        <TabsList className="mt-5 flex justify-around">
          {sortedCategories?.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeMenu}>
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
