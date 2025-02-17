import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems((prevItem) =>
        prevItem.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
      toast.success(`${item.name} quantity increased`, {
        position: 'top-right',
      });
    } else {
      setCartItems((prevItem) => [...prevItem, { ...item, quantity: 1 }]);
      toast.success(`${item.name} is added to cart`, {
        position: 'top-right',
      });
    }
  };

  const removeFromCart = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    setCartItems((prevItem) => prevItem.filter((item) => item.id !== itemId));
    toast.success(`${item.name} is removed from cart`, {
      position: 'top-right',
    });
  };

  const cartValue = { addToCart, removeFromCart, cartItems };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
