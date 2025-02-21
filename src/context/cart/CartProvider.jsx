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

  const addToCart = async (item) => {
    addToStorage(item);
    const storageCart = getCart();
    const cartIds = storageCart?.map((item) => {
      return item?._id;
    });

    const { data } = await axiosPublic.post(`/menus/cart`, { cartIds });

    const updatedCart = data?.data?.map((item) => {
      return {
        ...item,
        quantity: storageCart.find((cartItem) => cartItem?._id === item._id)
          ?.quantity,
      };
    });
    setCartItems(updatedCart);
  };

  const removeFromCart = (itemId) => {
    removeFromStorage(itemId);
    const updatedCart = getCart();
    setCartItems(updatedCart);
  };

  const cartValue = { addToCart, removeFromCart, cartItems };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
