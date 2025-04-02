import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://essen-welt-server.vercel.app/api/v1',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
