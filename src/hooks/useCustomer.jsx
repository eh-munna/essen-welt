import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCustomer = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: customer = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !loading && !!user?.email,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/?email=${user?.email}`);
      return data?.data;
    },
  });
  return {
    customer,
    refetch,
    isLoading,
  };
};

export default useCustomer;
