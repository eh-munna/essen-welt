import { useLoaderData } from 'react-router-dom';
import FoodCard from '../FoodCard';
import Heading from '../Heading';

export default function PopularMenu() {
  const { data: popularItems } = useLoaderData();

  return (
    <section className="mx-auto p-8 bg-[primaryBG] text-[#333333] rounded-xl shadow-lg mb-2">
      <Heading headingText={'Our Popular Items'} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularItems?.map((menuItem) => (
          <FoodCard key={menuItem?._id} item={menuItem} />
        ))}
      </div>
    </section>
  );
}
