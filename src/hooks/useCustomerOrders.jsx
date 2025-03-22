import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function useCustomerOrders(email) {
  const axiosSecure = useAxiosSecure();

  const { data: customerOrders = [], isLoading } = useQuery({
    queryKey: ['customerOrders', email],
    enabled: !!email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/admin/${email}`);
      return data.data;
    },
    // refetchInterval: 60000, // refetch every minute
  });

  return { customerOrders, isLoading };
}
