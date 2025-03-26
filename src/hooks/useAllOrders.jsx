import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function useAllOrders() {
  // const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allOrders = [], refetch } = useQuery({
    queryKey: ['allOrders'],
    // enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/admin`);
      return data?.data;
    },
  });

  return { allOrders, refetch };
}
