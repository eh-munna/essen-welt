import useMenu from '@/hooks/useMenu';

export default function AdminDashboardHome() {
  const { allMenus } = useMenu();
  console.log(allMenus);
  return <></>;
}
