import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      {/* Only show Menu on the home page */}
      <main>
        {/* Content will be rendered here based on the route */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
