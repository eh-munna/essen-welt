import App from '@/App';
import ErrorPage from '@/Errors/ErrorPage';
import { ItemDetails } from '@/components/Menu';
import Cart from '@/pages/Cart';
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </>
  )
);

export default Routes;
