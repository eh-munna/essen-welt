import toast from 'react-hot-toast';

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToStorage = (item) => {
  const cart = getCart();

  const existingItem = cart.find((i) => i?._id === item?._id);

  if (existingItem) {
    existingItem.quantity = existingItem.quantity + 1;
    toast.success(`${item.name} quantity increased`, {
      position: 'top-right',
    });
  } else {
    cart.push({
      _id: item?._id,
      name: item?.name,
      price: item?.price,
      quantity: 1,
    });
    toast.success(`${item.name} is added to cart`, {
      position: 'top-right',
    });
  }
  setCart(cart);
};

export const removeFromStorage = (itemId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item?._id !== itemId);

  if (updatedCart.length > 0) {
    setCart(updatedCart);
  } else {
    localStorage.removeItem('cart');
  }
};
