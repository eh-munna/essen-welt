import useAllOrders from '@/hooks/useAllOrders';

export default function Orders() {
  const { allOrders } = useAllOrders();

  return <>{allOrders?.length}</>;
}
