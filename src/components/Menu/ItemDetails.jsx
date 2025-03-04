import { CartContext } from '@/context/cart/CartProvider';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Button } from '../ui/button';

export default function ItemDetails() {
  const { data: item } = useLoaderData();

  const { addToCart } = useContext(CartContext);

  const handleAddClick = (item) => {
    addToCart(item);
  };

  return (
    <>
      <section className="bg-[#F1F1F1] p-6 rounded-2xl shadow-lg hover:shadow-xl transition max-w-lg mx-auto">
        <img
          src={item?.image}
          alt={item?.name}
          className="w-full h-60 object-cover rounded-lg"
        />
        <h2 className="text-2xl font-semibold text-[#2D6A4F] mt-4">
          {item?.name}
        </h2>
        <p className="text-md text-[#3D5A6E] mt-2">{item?.description}</p>
        <div className="flex justify-between items-center mt-6">
          <span className="text-[#E63946] font-bold text-lg">
            €{item?.price}
          </span>
          <Button
            onClick={() => handleAddClick(item)}
            className="cursor-pointer bg-[#028643] text-[white] px-6 py-3 rounded-md hover:bg-[#1B4D38] transition"
          >
            Add to Cart
          </Button>
        </div>
      </section>
    </>
  );
}
