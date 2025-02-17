import { AuthContext } from '@/context/authentication/AuthProvider';
import { useContext } from 'react';

export default function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}
