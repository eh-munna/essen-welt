import axios from 'axios';
import { useEffect, useState } from 'react';
import FoodCard from '../FoodCard';

export default function PopularMenu() {
  const [popularItems, setPopularItems] = useState([]);

  // Fetch popular items from API or local state

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await axios.get(
          `https://essen-welt-server.vercel.app/api/v1/menus`
        );
        setPopularItems(data.data);
      } catch (error) {
        console.error('Error fetching popular items:', error.message);
      }
    };
    fetchMenu();
  }, []);

  return (
    <section className="mx-auto p-8 bg-[#2D6A4F] rounded-xl shadow-lg mb-2">
      <h2 className="text-3xl font-semibold text-[#E9CBA7] mb-8">
        Our Popular Item
      </h2>{' '}
      {/* Updated title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularItems?.map((menuItem) => (
          <FoodCard key={menuItem.id} item={menuItem} />
        ))}
      </div>
    </section>
  );
}
