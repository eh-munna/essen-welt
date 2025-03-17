import useUsers from '@/hooks/useUsers';

export default function Customers() {
  const { users } = useUsers();
  return <>{users?.length}</>;
}
