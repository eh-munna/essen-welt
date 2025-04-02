import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Heading from '../Heading';
import { MenuItem } from '../Menu';

export default function PopularMenu() {
  const { data: popularItems } = useLoaderData();
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="container mx-auto pt-[72px] text-[#333333] mb-2 overflow-hidden">
      <Heading headingText={'Our Popular Items'} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {popularItems?.map((menuItem) => (
          // <FoodCard key={menuItem?._id} item={menuItem} />
          <MenuItem
            key={menuItem?._id}
            item={menuItem}
            activeId={activeId}
            handleToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
}
