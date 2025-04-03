import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useTitleContext } from '@/context/Title/TitleProvider';
import useTitle from '@/hooks/useTitle';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
  const { title } = useTitleContext();

  const location = useLocation();
  const pageTitle =
    location.pathname.slice(1).toLowerCase() === 'dashboard'
      ? location.pathname.slice(1).charAt(0).toUpperCase() +
        location.pathname.slice(2)
      : '';

  useTitle(pageTitle);

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className={'bg-white'}>
          <header className="flex h-14 items-center px-6 gap-3 border-b border-gray-200 bg-gray-100">
            {/* Sidebar trigger button */}
            <SidebarTrigger
              className={'text-orange-500'}
              toggle={toggle}
              onClick={() => setToggle(!toggle)}
            />

            {/* Breadcrumb navigation */}
            <nav className="text-sm text[#131313]">
              <Link
                to="/dashboard"
                className="hover:text-orange-600 transition-all ease-in-out duration-300"
              >
                Dashboard
              </Link>
              <span className="mx-2">/</span>
              <span className="font-semibold text-orange-600">{title}</span>
            </nav>
          </header>
          <main className="container mx-auto px-6 py-4">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
