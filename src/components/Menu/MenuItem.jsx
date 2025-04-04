import { CartContext } from '@/context/cart/CartProvider';
import { cn } from '@/lib/utils';
import { ShoppingBag, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Button } from '../ui/button';

export default function MenuItem({ item, activeId, handleToggle }) {
  const { name, price, recipe, _id, image } = item;
  const { addToCart } = useContext(CartContext);
  const isActive = activeId === _id;

  return (
    <div className="w-full pb-6 relative">
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="1500"
        data-aos-delay="100"
        data-aos-once="true"
        className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        {/* Recipe Overlay */}
        <div
          className={cn(
            `absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full max-w-sm rounded-lg text-white transition-all duration-300 ease-in-out z-20`,
            {
              'opacity-100 translate-y-0': isActive,
              'opacity-0 translate-y-full pointer-events-none': !isActive,
            }
          )}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center p-6 space-y-4">
            <p className="text-sm md:text-base text-center text-white/90">
              {recipe}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={() => handleToggle(_id)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Food Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 space-y-3 md:space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-1">
              {name}
            </h3>
            <p className="text-lg font-medium text-orange-600">
              €{price.toFixed(2)}
            </p>
          </div>

          <Button
            variant="link"
            onClick={() => handleToggle(_id)}
            className="p-0 h-auto text-orange-500 hover:text-orange-600 hover:no-underline"
          >
            View Recipe
          </Button>

          <Button
            onClick={() => addToCart(item)}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
          >
            Add To Bag
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
  activeId: PropTypes.string,
  handleToggle: PropTypes.func.isRequired,
};
