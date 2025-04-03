import AdminDashboardHome from '@/components/Dashboard/AdminHome';
import UserDashboardHome from '@/components/Dashboard/UserHome';
import useAdmin from '@/hooks/useAdmin';
import useAuth from '@/hooks/useAuth';

export default function DashboardHome() {
  const { isAdmin } = useAdmin();
  const { user } = useAuth();

  return (
    <>
      <section className="px-6 py-10 min-h-[75vh] md:min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-semibold text-orange-500 mb-6">
          Welcome back, {user?.displayName}
        </h2>
        {isAdmin ? <AdminDashboardHome /> : <UserDashboardHome />}
      </section>
    </>
  );
}
