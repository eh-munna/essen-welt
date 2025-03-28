import DevelopmentBanner from '@/components/DevelopmentBanner';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header className="container mx-auto">
        <DevelopmentBanner />
        <Navbar />
      </header>
      <main className="container mx-auto">
        {/* Content will be rendered here based on the route */}
        <Outlet />
      </main>
      <footer className="container mx-auto">
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
