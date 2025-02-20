import useAxiosPublic from '@/hooks/useAxiosPublic';

const axiosPublic = useAxiosPublic();
export const loadMenuItem = async ({ params }) => {
  const { id } = params;
  const { data } = await axiosPublic.get(`/menus/${id}`);

  return data;
};

export const loadPopularItems = async () => {
  const { data } = await axiosPublic.get(`/menus/popular`);
  return data;
};
