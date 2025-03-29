import AdminDashboardHome from '@/components/Dashboard/AdminHome';
import UserDashboardHome from '@/components/Dashboard/UserHome';
import useAdmin from '@/hooks/useAdmin';
import useAuth from '@/hooks/useAuth';

export default function DashboardHome() {
  const { isAdmin } = useAdmin();
  const { user } = useAuth();

  return (
    <>
      <section className="px-6 py-10">
        <h2 className="text-3xl font-semibold text-[#2D6A4F] mb-6">
          Welcome back, {user?.displayName}
        </h2>
        {isAdmin ? <AdminDashboardHome /> : <UserDashboardHome />}
      </section>
    </>
  );
}
