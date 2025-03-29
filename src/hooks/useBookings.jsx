import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

export default function useBookings() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings, refetch } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/?email=${user?.email}`);
      return data.data || [];
    },
  });

  return { bookings, refetch };
}
