import DevelopmentBanner from '@/components/DevelopmentBanner';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header>
        <DevelopmentBanner />
        <Navbar />
      </header>
      <main>
        {/* Content will be rendered here based on the route */}
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
