import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
export default function useCustomerBookings(email) {
  const axiosSecure = useAxiosSecure();

  const {
    data: customerBookings,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['customerBookings', email || 'all'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/admin`, {
        params: email ? { email } : undefined,
      });
      return data.data || [];
    },
  });
  return { customerBookings, refetch, isLoading };
}
