import { MenuItem } from '@/components/Menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useEffect, useState } from 'react';

export const menuItems = [
  // Starters
  { id: 1, name: 'Bruschetta', price: 5.99, category: 'starters' },
  { id: 2, name: 'Caesar Salad', price: 6.99, category: 'starters' },
  { id: 3, name: 'Garlic Bread', price: 4.99, category: 'starters' },
  { id: 4, name: 'Stuffed Mushrooms', price: 7.49, category: 'starters' },
  { id: 5, name: 'Tomato Soup', price: 5.49, category: 'starters' },
  { id: 6, name: 'Chicken Wings', price: 8.99, category: 'starters' },

  // Mains
  { id: 7, name: 'Grilled Salmon', price: 15.99, category: 'mains' },
  { id: 8, name: 'Steak', price: 19.99, category: 'mains' },
  { id: 9, name: 'Margherita Pizza', price: 12.99, category: 'mains' },
  { id: 10, name: 'Pasta Carbonara', price: 13.99, category: 'mains' },
  { id: 11, name: 'Vegetable Stir Fry', price: 11.49, category: 'mains' },
  { id: 12, name: 'BBQ Ribs', price: 18.99, category: 'mains' },
  { id: 13, name: 'Chicken Alfredo', price: 14.99, category: 'mains' },
  { id: 14, name: 'Lamb Chops', price: 22.99, category: 'mains' },

  // Desserts
  { id: 15, name: 'Cheesecake', price: 4.99, category: 'desserts' },
  { id: 16, name: 'Chocolate Cake', price: 5.99, category: 'desserts' },
  { id: 17, name: 'Apple Pie', price: 6.49, category: 'desserts' },
  { id: 18, name: 'Tiramisu', price: 7.49, category: 'desserts' },
  { id: 19, name: 'Ice Cream Sundae', price: 5.99, category: 'desserts' },
  { id: 20, name: 'Panna Cotta', price: 6.99, category: 'desserts' },

  // Beverages
  { id: 21, name: 'Cappuccino', price: 3.99, category: 'beverages' },
  { id: 22, name: 'Espresso', price: 2.99, category: 'beverages' },
  { id: 23, name: 'Lemonade', price: 3.49, category: 'beverages' },
  { id: 24, name: 'Iced Tea', price: 3.99, category: 'beverages' },
  { id: 25, name: 'Smoothie', price: 4.99, category: 'beverages' },
  { id: 26, name: 'Milkshake', price: 5.49, category: 'beverages' },
  { id: 27, name: 'Mojito', price: 6.99, category: 'beverages' },
  { id: 28, name: 'Orange Juice', price: 3.99, category: 'beverages' },
];

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState('starters');
  const axiosPublic = useAxiosPublic();

  const [menu, setMenu] = useState([]);

  // http://localhost:3000/api/v1/menus?category=mains
  //  http://localhost:3000/api/v1/menus?category=mains

  useEffect(() => {
    const fetchMenu = async () => {
      const { data } = await axiosPublic.get(`/menus?category=${activeMenu}`);
      setMenu(data);
    };
    fetchMenu();
  }, [activeMenu]);

  // Extract unique categories from menuItems
  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <>
      <Tabs
        value={activeMenu}
        onValueChange={setActiveMenu}
        className="w-2/3 mx-auto"
      >
        <TabsList className="mt-5 flex justify-around">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeMenu}>
          <div className="grid md:grid-cols-3 gap-3 space-y-3">
            {menu.map((item) => (
              <MenuItem key={item._id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
