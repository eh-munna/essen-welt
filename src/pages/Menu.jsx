import { MenuItem } from '@/components/Menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useMenu from '@/hooks/useMenu';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState('starters');
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 pt-28 pb-16">
      {/* Enhanced Heading */}
      <div className="mb-10 md:mb-14 lg:mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Discover <span className="text-orange-500"> Our Menu</span>
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our carefully crafted selection of culinary delights
        </p>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeMenu} onValueChange={setActiveMenu} className="w-full">
        <TabsList className="flex pb-2 gap-4 sm:gap-6 justify-start sm:justify-center bg-transparent">
          {sortedCategories?.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className={`
                px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap
                text-gray-700 hover:text-orange-500 transition-colors
                border-b-2 border-transparent
                data-[state=active]:text-orange-600
                data-[state=active]:border-orange-600
                focus-visible:ring-2 focus-visible:ring-orange-300
              `}
            >
              {category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Menu Content with Animation */}
        <TabsContent value={activeMenu} className="mt-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {menus?.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                transition={{ duration: 0.3 }}
              >
                <MenuItem
                  item={item}
                  activeId={activeId}
                  handleToggle={handleToggle}
                />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
