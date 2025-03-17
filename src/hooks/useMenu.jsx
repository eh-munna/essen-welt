import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

export default function useMenu(activeMenu) {
  const axiosPublic = useAxiosPublic();

  const { data: allMenus = [], refetch } = useQuery({
    queryKey: ['allMenus', activeMenu],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/menus`, {
        params: activeMenu ? { category: activeMenu } : {},
      });
      return data.data;
    },
  });

  return { allMenus, refetch };
}
