import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default function useAxiosSecure() {
  const { setUser, userSignOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          (error?.response && error?.response?.status === 403) ||
          error?.response?.status === 401
        ) {
          userSignOut();
          setUser(null);
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [userSignOut, setUser]);
  return axiosSecure;
}
