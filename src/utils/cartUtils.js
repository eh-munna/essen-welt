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

  let updatedCart;
  const isExist = cart.some((i) => i?.itemId === item?._id);

  if (isExist) {
    updatedCart = cart.map((i) =>
      i?.itemId === item?._id ? { ...i, quantity: i?.quantity + 1 } : i
    );
    toast.success(`${item.name} quantity increased`, {
      position: 'top-right',
    });
  } else {
    updatedCart = [
      ...cart,
      { itemId: item?._id, name: item?.name, price: item?.price, quantity: 1 },
    ];
    toast.success(`${item.name} is added to cart`, {
      position: 'top-right',
    });
  }
  setCart(updatedCart);
};

export const removeFromStorage = (itemId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item?.itemId !== itemId);

  if (updatedCart.length > 0) {
    setCart(updatedCart);
  } else {
    localStorage.removeItem('cart');
  }
};
