import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function useTable() {
  const axiosSecure = useAxiosSecure();
  const { data: tables = [], refetch } = useQuery({
    queryKey: ['tables'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tables/admin`);
      return data.data;
    },
  });
  return { tables, refetch };
}
