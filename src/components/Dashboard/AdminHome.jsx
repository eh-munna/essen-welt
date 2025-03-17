import useMenu from '@/hooks/useMenu';

export default function AdminHome() {
  const { allMenus } = useMenu();
  console.log(allMenus);
  return <></>;
}
