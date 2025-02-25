import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { getCart } from '@/utils/cartUtils';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data = [], refetch } = useQuery({
    queryKey: ['cart', user],
    // enabled: !loading && !!user,
    enabled: !loading,
    queryFn: async () => {
      if (!user) return getCart();

      try {
        const { data } = await axiosPublic.get(`/carts`);
        return data?.data;
      } catch (error) {
        if (error?.response?.status === 404) return [];
        throw error;
      }
    },
  });

  return { cart: data, refetch };
};

export default useCart;
