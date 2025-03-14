import App from '@/App';
import ErrorPage from '@/Errors/ErrorPage';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ItemDetails } from '@/components/Menu';
import Cart from '@/pages/Cart';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Menu from '@/pages/Menu';
import Orders from '@/pages/Orders';
import Payment from '@/pages/Payment';
import PaymentSuccess from '@/pages/PaymentSuccess';
import SignUp from '@/pages/SignUp';
import { loadMenuItem, loadPopularItems } from '@/utils/menuUtils';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} loader={loadPopularItems} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/menu/:id"
          element={<ItemDetails />}
          loader={loadMenuItem}
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="/menu" element={<Menu />} />
        <Route
          path="/menu/:id"
          element={<ItemDetails />}
          loader={loadMenuItem}
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </>
  )
);

export default Routes;
