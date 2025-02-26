import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useCart from '@/hooks/useCart';
import { addToStorage, getCart, removeFromStorage } from '@/utils/cartUtils';
import { createContext, useEffect } from 'react';
import toast from 'react-hot-toast';
export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const { cart, refetch } = useCart();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (user) {
      (async () => {
        const storageCart = getCart();

        if (storageCart.length > 0) {
          const mergedCart = storageCart.map((item) => {
            return {
              ...item,
              customer: user?.email,
            };
          });

          try {
            const response = await axiosPublic.post(`/carts`, mergedCart, {
              withCredentials: true,
            });
            if (response?.status === 201) {
              localStorage.removeItem('cart');
              toast.success(response?.data?.message, {
                position: 'top-right',
                duration: 3000,
              });
              refetch();
            }
          } catch (error) {
            console.error('Error during cart creation:', error.message);
          }
        }
      })();
    }
  }, [user]);

  const addToCart = async (item) => {
    if (!user) {
      addToStorage(item);
      refetch();
    } else {
      const cartItem = {
        itemId: item?._id,
        name: item?.name,
        price: item?.price,
        customer: user?.email,
      };
      try {
        const response = await axiosPublic.post(`/carts`, cartItem);
        if (response?.status === 201) {
          toast.success(response?.data?.message, {
            position: 'top-right',
            duration: 3000,
          });
        }
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromCart = (itemId) => {
    if (!user) {
      removeFromStorage(itemId);
      refetch();
    }
  };

  const cartValue = { addToCart, removeFromCart, cart };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
