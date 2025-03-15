import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

export default function useAdmin() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: ['admin', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        if (!user?.email) return null;

        const { data } = await axiosSecure.get(`/admins/?email=${user?.email}`);
        return data?.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
  return { isAdmin, isAdminLoading };
}
