import Heading from '@/components/Heading';
import { MenuItem } from '@/components/Menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useMenu from '@/hooks/useMenu';
import { useState } from 'react';

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState('starters');
  // const axiosPublic = useAxiosPublic();

  const [activeId, setActiveId] = useState(null);

  const { allMenus } = useMenu(activeMenu);
  const menus = allMenus?.menus;
  const categories = allMenus?.categories;

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

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
      <section className="p-8">
        <Heading headingText={'Discover Our Menu'} />
        <Tabs
          value={activeMenu}
          onValueChange={setActiveMenu}
          className="w-full mx-auto"
        >
          <TabsList className="py-6 flex justify-evenly items-center gap-6 bg-transparent">
            {sortedCategories?.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className={`text-green-500 border-transparent rounded-none bg-transparent p-2  hover:text-orange-400 transition-all duration-300 ease-in-out data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-b-amber-400 data-[state=active]:shadow-none hover:bg-transparent cursor-pointer`}
              >
                {category.slice(0, 1).toUpperCase() +
                  category.slice(1).toLowerCase()}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeMenu} className={`min-h-screen mt-8`}>
            <div className="grid md:grid-cols-3 gap-3 space-y-3">
              {menus?.map((item) => (
                <MenuItem
                  key={item._id}
                  item={item}
                  activeId={activeId}
                  handleToggle={handleToggle}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
