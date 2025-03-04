import useAuth from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
