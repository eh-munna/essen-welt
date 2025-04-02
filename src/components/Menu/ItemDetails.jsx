import { CartContext } from '@/context/cart/CartProvider';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Button } from '../ui/button';

export default function ItemDetails() {
  const { data: item } = useLoaderData();

  console.log(item);

  const { addToCart } = useContext(CartContext);

  const handleAddClick = (item) => {
    addToCart(item);
  };

  return (
    <>
      <section className="max-w-lg mx-auto pb-6">
        <div className="flex justify-center items-center min-h-[90vh]">
          <div className="p-4 flex flex-col bg-[#F1F1F1] rounded-2xl shadow-lg hover:shadow-xl transition space-y-3">
            <img
              src="https://i.ibb.co/99j4k1g/class-7.jpg"
              alt={item?.name}
              className="w-full object-cover rounded-lg"
            />

            <div className="flex justify-between mt-4">
              <h2 className="text-2xl font-semibold text-[#2D6A4F]">
                {item?.name}
              </h2>
              <span className="text-[#E63946] font-bold text-lg">
                €{item?.price}
              </span>
            </div>
            <p className="text-md text-[#3D5A6E] mt-2">{item?.recipe}</p>
            <Button
              onClick={() => handleAddClick(item)}
              className="cursor-pointer bg-[#028643] text-[white] px-6 py-3 rounded-md hover:bg-[#1B4D38] transition mt-auto"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
