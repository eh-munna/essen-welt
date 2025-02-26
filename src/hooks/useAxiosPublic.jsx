import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
