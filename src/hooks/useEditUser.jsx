import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function useEditUser(userEmail) {
  const axiosSecure = useAxiosSecure();
  const {
    data: loadedUser,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['editUser', userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/?email=${userEmail}`);
      return data.data;
    },
  });

  return { loadedUser, refetch, isLoading };
}
