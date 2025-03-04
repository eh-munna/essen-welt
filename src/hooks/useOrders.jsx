import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders?email=${user?.email}`);
      return data?.data;
    },
  });
  return { orders, refetch };
};
export default useOrders;
