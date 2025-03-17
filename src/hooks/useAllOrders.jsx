import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function useAllOrders() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allOrders = [], refetch } = useQuery({
    queryKey: ['allOrders', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/orders/admin?email=${user?.email}`
      );
      return data?.data;
    },
  });

  return { allOrders, refetch };
}
