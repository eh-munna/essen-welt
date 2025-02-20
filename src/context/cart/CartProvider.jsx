import useAxiosPublic from '@/hooks/useAxiosPublic';
import { addToStorage, getCart, removeFromStorage } from '@/utils/cartUtils';
import { createContext, useEffect, useState } from 'react';
export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const cart = getCart();
    setCartItems(cart);
  }, []);

  const addToCart = (item) => {
    addToStorage(item);
    const cartIds = cartItems?.map((item) => {
      return item._id;
    });

    (async () => {
      const { data } = await axiosPublic.post(`/menus/cart`, { ids: cartIds });
      // console.log(data?.data);
      setCartItems(data?.data);
    })();
  };

  const removeFromCart = (itemId) => {
    removeFromStorage(itemId);
  };

  const cartValue = { addToCart, removeFromCart, cartItems };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
