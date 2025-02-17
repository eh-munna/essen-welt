import ErrorPage from '@/Errors/ErrorPage';
import Layout from '@/Layouts/Layout';
import Cart from '@/pages/Cart';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Menu from '@/pages/Menu';
import Orders from '@/pages/Orders';
import SignUp from '@/pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// Your custom error page component

function App() {
  return (
    <>
      <Routes>
        {/* Layout route for the main structure */}
        <Route path="/" element={<Layout />}>
          {/* Define all your main routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
export default App;
