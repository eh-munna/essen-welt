import React from 'react';
import FoodCard from '../components/FoodCard';

const mockFoods = [
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

const Menu = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-[#2D6A4F] mb-6">Our Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
