import { CartContext } from '@/context/cart/CartProvider';
import { cn } from '@/lib/utils';
import { ShoppingBag, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Button } from '../ui/button';

export default function MenuItem({ item, activeId, handleToggle }) {
  const { name, price, recipe, _id } = item;

  const { addToCart } = useContext(CartContext);

  const isActive = activeId === _id;

  return (
    <div className="overflow-hidden pb-6 relative">
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="2000"
        data-aos-delay="100"
        data-aos-once="true"
        className="max-w-sm mx-auto bg-white rounded-lg shadow-md"
      >
        <div
          className={cn(
            `absolute bg-[url(https://i.ibb.co/99j4k1g/class-7.jpg)] bg-cover bg-center w-full h-full max-w-sm rounded-lg text-white transition-all duration-300 ease-in-out`,
            {
              'opacity-100 scale-100': isActive,
              'opacity-0 scale-95 pointer-events-none': !isActive,
            }
          )}
        >
          <div className="flex justify-center items-center min-h-full relative z-10 flex-col space-y-6 backdrop-blur-md p-6 rounded-lg">
            <p> {recipe}</p>
            <Button
              className={'absolute top-3 right-3 cursor-pointer'}
              onClick={() => handleToggle(_id)}
            >
              <X />
            </Button>
          </div>
        </div>
        <img
          src="https://i.ibb.co/99j4k1g/class-7.jpg"
          alt="food"
          className="rounded-t-lg"
        />

        <div className="p-4 space-y-3">
          <div className="flex justify-between font-semibold text-[#131313]">
            <h3 className="text-xl">{name}</h3>
            <p className="text-lg">€{price.toFixed(2)}</p>
          </div>
          <Button
            variant={'ghost'}
            onClick={() => handleToggle(_id)}
            className="underline cursor-pointer bg-transparent hover:bg-transparent p-0"
          >
            Recipe
          </Button>

          <div className="flex flex-col justify-between items-center ">
            <Button
              onClick={() => addToCart(item)}
              className="w-full p-5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Add To Bag
              <span>
                <ShoppingBag />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Props Validation

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
  }),
  activeId: PropTypes.string,
  handleToggle: PropTypes.func.isRequired,
};
