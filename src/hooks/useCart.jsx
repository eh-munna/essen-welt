import useAuth from '@/hooks/useAuth';
import { getCart } from '@/utils/cartUtils';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = [], refetch } = useQuery({
    queryKey: ['cart', user?.email || 'guest'],
    enabled: !loading,
    queryFn: async () => {
      if (!user) return getCart();
      else {
        try {
          const { data } = await axiosSecure.get(`/carts?email=${user?.email}`);
          return data?.data;
        } catch (error) {
          if (error?.response?.status === 404) return [];
          throw error;
        }
      }
    },
  });

  return { cart: data, refetch };
};

export default useCart;
