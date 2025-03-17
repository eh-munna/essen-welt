import useAdmin from '@/hooks/useAdmin';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { isAdmin, isAdminLoading } = useAdmin();

  if (isAdminLoading) return <div> Loading...</div>;

  return isAdmin ? children : <Navigate to="/login" replace />;
}
