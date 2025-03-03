import { CartContext } from '@/context/cart/CartProvider';
import { useContext } from 'react';
import { Button } from './ui/button';

const FoodCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const handleAddClick = (item) => addToCart(item);

  return (
    <>
      <div className="relative p-6 bg-gray-900 text-white rounded-xl border-4 border-transparent overflow-hidden">
        <div className="absolute inset-0 border border-purple-500 rounded-xl animate-pulse"></div>
        <div className="bg-[#F1F1F1] p-4 rounded-2xl shadow-lg hover:shadow-xl transition max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold text-[#2D6A4F] mt-3">
            {item.name}
          </h3>
          <p className="text-sm text-[#3D5A6E]">{item.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#E63946] font-bold">€{item.price}</span>
            <Button
              onClick={() => handleAddClick(item)}
              className="cursor-pointer bg-[#2D6A4F] text-white px-4 py-2 rounded-md hover:bg-[#1B4D38] transition"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;
