import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useTitleContext } from '@/context/Title/TitleProvider';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const { title } = useTitleContext();

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className={'bg-[#075E54] '}>
          <header className="flex h-14 items-center px-4">
            {/* <SidebarTrigger /> */}
            <SidebarTrigger
              toggle={toggle}
              onClick={() => setToggle(!toggle)}
            />

            <nav className="text-sm text-gray-500">
              <Link to="/dashboard" className="hover:text-gray-700">
                Dashboard
              </Link>
              <span className="mx-2">/</span>
              <span className="font-semibold text-gray-900">{title}</span>
            </nav>
          </header>
          <main className="container mx-auto px-4">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
