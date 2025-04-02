import { CartContext } from '@/context/cart/CartProvider';
import { useContext } from 'react';
import { Button } from './ui/button';

const FoodCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const handleAddClick = (item) => addToCart(item);

  return (
    <>
      <div className="relative overflow-hidden group animate-rotate-border transition-all bg-conic/[from_var(--border-angle)] from-black via-green-500 to-black from-80% via-90% to-100% rounded-lg">
        {/* Card Content */}
        <div className="relative transition-all duration-300 p-[4px] group-hover:p-0 ease-in-out">
          <div className="relative w-full">
            {/* Image */}
            <img
              src="https://i.ibb.co/99j4k1g/class-7.jpg"
              alt={item.name}
              className="w-full h-full object-cover rounded-lg transform-gpu will-change-transform transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* Image Overlay */}
            {/* <div className="absolute inset-0 bg-transparent hover:bg-black opacity-60 group-hover:opacity-80 transition-opacity duration-300 rounded-lg"></div> */}
          </div>

          {/* Content with Background */}
          <div className="absolute bottom-0 w-full p-3 transition-all duration-300 h-[60px] group-hover:h-[100px] overflow-hidden">
            {/* Background Overlay for Content */}
            <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-80 rounded-b-lg backdrop-blur-sm"></div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-white relative z-10">
              {item.name}
            </h3>

            {/* Price and Button (hidden initially, appears on hover) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 relative z-10">
              <div className="flex justify-between items-center">
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
        </div>
      </div>
    </>
  );
};

export default FoodCard;
