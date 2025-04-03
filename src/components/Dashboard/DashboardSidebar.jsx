import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import useAdmin from '@/hooks/useAdmin';
import useAuth from '@/hooks/useAuth';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const userRoutes = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Bookings', path: '/dashboard/my-bookings' },
  { name: 'My Orders', path: '/dashboard/my-orders' },
  { name: 'Cart', path: '/cart' },
];

const adminRoutes = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Dashboard', path: '/dashboard' },
  {
    name: 'Manage Menu',
    children: [
      { name: 'Add Menu', path: '/dashboard/add-menu' },
      { name: 'Modify Menu', path: '/dashboard/modify-menu' },
    ],
  },
  {
    name: 'Manage Table',
    children: [
      { name: 'Add Table', path: '/dashboard/add-table' },
      { name: 'Modify Table', path: '/dashboard/modify-table' },
    ],
  },
  { name: 'Customers', path: '/dashboard/customers' },
  { name: 'Orders', path: '/dashboard/all-orders' },
  { name: 'Bookings', path: '/dashboard/all-bookings' },
];

export default function DashboardSidebar() {
  const { isAdmin } = useAdmin();
  const { user, userSignOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    userSignOut();
    navigate('/');
  };

  return (
    <Sidebar
      style={{ '--sidebar': '#ffffff' }}
      className={cn('text-gray-800 min-h-screen shadow-lg', 'bg-white')}
    >
      {/* Profile Section */}
      <div className="p-8 flex flex-col items-center border-b border-gray-200 space-y-4 bg-gray-100">
        <UserCircle size={60} className="text-orange-500" />
        <h3 className="text-xl font-semibold text-[#131313]">
          {user?.displayName || 'User'}
        </h3>
        <p className="text-sm text-[#2D6A4F]">
          {user?.email || 'email@example.com'}
        </p>
        <Link
          className="mt-4 rounded-full text-white bg-orange-500 border-orange-500 border 
             py-2 px-6 shadow-sm 
             hover:bg-orange-600 transition"
          to={`/dashboard/profile`}
        >
          Profile
        </Link>
      </div>

      {/* Navigation Links */}
      <SidebarContent className="py-6 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-gray-900 mb-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(isAdmin ? adminRoutes : userRoutes).map(
                ({ name, path, children }) => (
                  <SidebarMenuItem key={name}>
                    {children ? (
                      <Collapsible className="group/collapsible">
                        <CollapsibleTrigger className="cursor-pointer" asChild>
                          <SidebarMenuButton className="text-gray-900 hover:bg-orange-500 hover:text-white transition p-3 rounded-md">
                            <span>{name}</span>
                            <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                            <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-6 space-y-3">
                          {children.map(({ name, path }) => (
                            <SidebarMenuButton
                              key={name}
                              asChild
                              className="text-gray-800 hover:text-orange-500 transition py-2"
                            >
                              <Link to={path}>{name}</Link>
                            </SidebarMenuButton>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className="text-gray-900 hover:bg-orange-500 hover:text-white transition duration-300 p-3 rounded-md"
                      >
                        <Link to={path}>{name}</Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Button */}
      <SidebarFooter className="p-6 border-t border-gray-200 bg-gray-100">
        <Button
          onClick={handleSignOut}
          className="bg-transparent border border-orange-500 hover:border-orange-600 hover:bg-orange-600 hover:text-white transition-all rounded-full group py-2 px-6 text-orange-500"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
