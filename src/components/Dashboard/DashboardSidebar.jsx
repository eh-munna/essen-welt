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
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
                    {(adminRoutes || []).map(({ name, path, children }) => (
                      <SidebarMenuItem key={name}>
                        {children ? (
                          <Collapsible className="group/collapsible">
                            <CollapsibleTrigger
                              className="cursor-pointer"
                              asChild
                            >
                              <SidebarMenuButton>
                                <span>{name}</span>
                                <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              {children.map(({ name, path }) => (
                                <SidebarMenuButton
                                  key={name}
                                  className={'pl-4'}
                                  asChild
                                >
                                  <Link to={path}>
                                    <span>{name}</span>
                                  </Link>
                                </SidebarMenuButton>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
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

      {/* <Sidebar>
        <SidebarHeader></SidebarHeader>
        <SidebarContent className="gap-0">
 
          {data.navMain.map((item) => (
            <Collapsible
              key={item.title}
              title={item.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    {item.title}{' '}
                    <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                    <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={item.isActive}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar> */}
    </>
  );
}
