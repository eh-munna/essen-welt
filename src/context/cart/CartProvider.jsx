import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { addToStorage, getCart, removeFromStorage } from '@/utils/cartUtils';
import { createContext, useEffect, useState } from 'react';
export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const storageCart = getCart();
    setCart(storageCart);
  }, []);

  const addToCart = async (item) => {
    addToStorage(item);
    const storageCart = getCart();
    const cartIds = storageCart?.map((item) => {
      return item?._id;
    });

    const { data } = await axiosPublic.post(`/menus/cart`, { ids: cartIds });

    const lookupQuantity = storageCart.reduce((acc, item) => {
      acc[item?._id] = item?.quantity;
      return acc;
    }, {});

    const updatedCart = data?.data?.map((item) => {
      return {
        ...item,
        quantity: lookupQuantity[item?._id],
      };
    });
    setCart(updatedCart);
  };

  const removeFromCart = (itemId) => {
    removeFromStorage(itemId);
    const updatedCart = getCart();
    setCart(updatedCart);
  };

  const cartValue = { addToCart, removeFromCart, cart };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
