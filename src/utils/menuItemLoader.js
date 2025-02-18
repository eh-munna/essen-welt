import { menuItems } from '@/pages/Menu';

export const menuItemLoader = ({ params }) => {
  const itemId = parseInt(params.id);
  const item = menuItems.find((item) => item.id === itemId);
  console.log(item);
  return item;
};
