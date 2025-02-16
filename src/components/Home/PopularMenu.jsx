import FoodCard from '../FoodCard';

const popularItems = [
  {
    id: 1,
    name: 'Grilled Salmon',
    description: 'Delicious grilled salmon with fresh herbs.',
    price: 15.99,
    image: 'https://source.unsplash.com/200x150/?salmon,food',
  },
  {
    id: 2,
    name: 'Veggie Pizza',
    description: 'Thin-crust pizza with fresh vegetables and mozzarella.',
    price: 12.49,
    image: 'https://source.unsplash.com/200x150/?pizza,food',
  },
  {
    id: 3,
    name: 'Avocado Salad',
    description: 'Fresh avocado, tomatoes, and greens with dressing.',
    price: 9.99,
    image: 'https://source.unsplash.com/200x150/?salad,food',
  },
];

export default function PopularMenu() {
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-[#2D6A4F] mb-6">
        Our Popular Item
      </h2>{' '}
      {/* Updated title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularItems.map((menuItem) => (
          <FoodCard key={menuItem.id} item={menuItem} />
        ))}
      </div>
    </section>
  );
}
