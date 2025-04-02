import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header className="relative">
        <div className="fixed top-0 left-0 z-20 w-full transition-all duration-300">
          <Navbar />
        </div>
      </header>

      <main className="">
        <Outlet />
      </main>

      <footer className="container mx-auto">
        <Footer />
      </footer>
    </>
  );
}
