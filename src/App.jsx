import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorPage from './Errors/ErrorPage';
import Layout from './Layouts/Layout';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
// Your custom error page component

function App() {
  return (
    <>
      <Routes>
        {/* Layout route for the main structure */}
        <Route path="/" element={<Layout />}>
          {/* Define all your main routes here */}
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
export default App;
