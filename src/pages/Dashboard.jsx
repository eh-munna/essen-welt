import DashboardNav from '@/components/Dashboard/DashboardNav';
import useAdmin from '@/hooks/useAdmin';

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  console.log(isAdmin);

  const mainRoutes = [
    { name: 'Home', path: '/', scrollId: '' },
    { name: 'Menu', path: '/menu', scrollId: '' },
    { name: 'Cart', path: '/cart', scrollId: '' },
  ];
  const userRoutes = [
    { name: 'Bookings', path: '/orders' },
    { name: 'Orders', path: '/orders', scrollId: '' },
  ];
  const adminRoutes = [
    { name: 'Customers', path: '/dashboard/customers' },
    { name: 'Orders', path: '/dashboard/orders' },
    { name: 'Add Menu', path: '/dashboard/add-menu' },
    { name: 'Add Table', path: '/dashboard/add-table' },
    { name: 'Bookings', path: '/dashboard/bookings' },
  ];

  return (
    <section className="p-6 bg-[#075E54] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Restaurant Dashboard</h1>

      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <DashboardNav
            mainRoutes={mainRoutes}
            userRoutes={userRoutes}
            adminRoutes={adminRoutes}
          />
        </div>
        <div className="col-span-8">Main</div>
      </div>
    </section>
  );
};

export default Dashboard;
