import App from '@/App';
import ErrorPage from '@/Errors/ErrorPage';
import DashboardHome from '@/components/Dashboard/DashboardHome';
import { ItemDetails } from '@/components/Menu';
import AboutUs from '@/pages/AboutUs';
import AddMenu from '@/pages/AddMenu';
import AddTable from '@/pages/AddTable';
import Bookings from '@/pages/Bookings';
import Careers from '@/pages/Careers';
import Cart from '@/pages/Cart';
import ContactForm from '@/pages/ContactForm';
import CustomerBookings from '@/pages/CustomerBookings';
import CustomerOrders from '@/pages/CustomerOrders';
import Customers from '@/pages/Customers';
import Dashboard from '@/pages/Dashboard';
import EditProfile from '@/pages/EditProfile';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Menu from '@/pages/Menu';
import ModifyMenu from '@/pages/ModifyMenu';
import ModifyTable from '@/pages/ModifyTable';
import MyBookings from '@/pages/MyBookings';
import MyOrders from '@/pages/MyOrders';
import Orders from '@/pages/Orders';
import Payment from '@/pages/Payment';
import PaymentSuccess from '@/pages/PaymentSuccess';
import Profile from '@/pages/Profile';
import SignUp from '@/pages/SignUp';
import { loadMenuItem, loadPopularItems } from '@/utils/menuUtils';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} loader={loadPopularItems} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route
          path="/menu/:id"
          element={<ItemDetails />}
          loader={loadMenuItem}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <PrivateRoute>
              <PaymentSuccess />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route
          index
          element={
            <PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/customers"
          element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/add-menu"
          element={
            <AdminRoute>
              <AddMenu />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/modify-menu"
          element={
            <AdminRoute>
              <ModifyMenu />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/add-table"
          element={
            <AdminRoute>
              <AddTable />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/modify-table"
          element={
            <AdminRoute>
              <ModifyTable />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/all-orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/all-bookings"
          element={
            <AdminRoute>
              <Bookings />
            </AdminRoute>
          }
        />

        <Route
          path={`/dashboard/customer-orders/:customerEmail`}
          element={
            <AdminRoute>
              <CustomerOrders />
            </AdminRoute>
          }
        />

        <Route
          path={'/dashboard/customer-bookings/:customerEmail'}
          element={
            <AdminRoute>
              <CustomerBookings />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard/my-orders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/my-bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </>
  )
);

export default Routes;
