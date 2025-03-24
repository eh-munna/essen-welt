import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function useBookings(email) {
  const axiosSecure = useAxiosSecure();

  const { data: bookings, refetch } = useQuery({
    queryKey: ['bookings', email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/bookings', {
        params: email ? { email: email } : {},
      });
      return data.data || [];
    },
  });
  return { bookings, refetch };
}
