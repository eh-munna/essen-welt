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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useAdmin from '@/hooks/useAdmin';
import useAuth from '@/hooks/useAuth';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const userRoutes = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Bookings', path: '/orders' },
  { name: 'My Orders', path: '/my-orders' },
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
  { name: 'Add Table', path: '/dashboard/add-table' },
  { name: 'Customers', path: '/dashboard/customers' },
  { name: 'Orders', path: '/dashboard/all-orders' },
  { name: 'Bookings', path: '/dashboard/all-bookings' },
];

export default function DashboardSidebar() {
  const { isAdmin } = useAdmin();

  const { userSignOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    userSignOut();
    navigate('/');
  };

  return (
    <>
      <Sidebar>
        <SidebarContent className="bg-amber-800 ">
          <SidebarGroup>
            <SidebarGroupLabel>Essen Welt</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isAdmin ? (
                  <>
                    {(adminRoutes ?? []).map(({ name, path, children }) => (
                      <SidebarMenuItem key={name}>
                        {children ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <SidebarMenuButton className={'cursor-pointer'}>
                                {name}
                                <ChevronDown className="ml-auto" />
                              </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                              {(children ?? []).map(({ name, path }) => (
                                <DropdownMenuItem key={name}>
                                  <Link to={path}>
                                    <span>{name}</span>
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <SidebarMenuButton asChild>
                            <Link to={path}>
                              <span>{name}</span>
                            </Link>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </>
                ) : (
                  (userRoutes ?? []).map(({ name, path }) => (
                    <SidebarMenuItem key={name}>
                      <SidebarMenuButton asChild>
                        <Link to={path}>
                          <span>{name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-amber-800 text-white">
          <Button onClick={handleSignOut}>Logout</Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
