import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function useCustomerOrders(email) {
  const axiosSecure = useAxiosSecure();
  const {
    data: customerOrders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['customerOrders', email || 'all'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/admin`, {
        params: email ? { email } : undefined,
      });
      return data.data || [];
    },
  });

  return { customerOrders, isLoading, refetch };
}
