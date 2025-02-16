import { createContext, useState } from 'react';
export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevItem) => {
      return [...prevItem, item];
    });
  };

  const cartValue = { addToCart, cartItems };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
