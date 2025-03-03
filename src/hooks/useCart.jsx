import useAuth from '@/hooks/useAuth';
import { getCart } from '@/utils/cartUtils';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useCustomer from './useCustomer';

const useCart = () => {
  const { user, loading } = useAuth();
  const { customer } = useCustomer();
  const axiosSecure = useAxiosSecure();

  const customerAvailable = !!customer?.email && !!customer?._id;

  const { data = [], refetch } = useQuery({
    queryKey: ['cart', user?.email || 'guest'],
    enabled: !loading && customerAvailable,
    queryFn: async () => {
      if (customerAvailable) {
        try {
          const { data } = await axiosSecure.get(
            `/carts?email=${customer?.email}&id=${customer?._id}`
          );
          return data?.data;
        } catch (error) {
          if (error?.response?.status === 404) return [];
          throw error;
        }
      } else {
        return getCart();
      }
    },
    refetchOnWindowFocus: true,
  });

  if (!customerAvailable) {
    return { cart: getCart(), refetch };
  }

  return { cart: data, refetch };
};

export default useCart;
