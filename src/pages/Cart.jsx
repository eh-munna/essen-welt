import { CartContext } from '@/context/cart/CartProvider';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomer from '@/hooks/useCustomer';
import { useContext, useMemo } from 'react';
import { PlaceOrder } from './PlaceOrder';

export default function Cart() {
  const axiosSecure = useAxiosSecure();
  const { cart, removeFromCart } = useContext(CartContext);
  const { customer } = useCustomer();

  const totalAmount = useMemo(
    () =>
      cart?.reduce((total, item) => total + item?.price * item?.quantity, 0),
    [cart]
  );

  const handleDeleteItem = (id) => {
    removeFromCart(id);
  };

  if (!cart || cart?.length === 0) {
    return (
      <section className="px-6 py-10">
        <h2 className="text-3xl font-semibold text-[#2D6A4F] mb-6">
          Your cart is empty
        </h2>
        <p className="text-lg text-[#3D5A6E]">
          Start adding items to your cart.
        </p>
      </section>
    );
  }

  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-semibold text-[#2D6A4F] mb-6">
        Shopping Cart
      </h2>

      {/* Cart List */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          {/* For Desktop View (full data) */}
          <div className="hidden md:block">
            <div className="w-full bg-white shadow-lg rounded-b-none rounded-lg overflow-hidden">
              <div className="bg-[#2D6A4F] text-white">
                <div className="flex p-4">
                  <div className="w-1/4 font-medium">Item</div>
                  <div className="w-1/4 font-medium">Quantity</div>
                  <div className="w-1/4 font-medium">Price</div>
                  <div className="w-1/4 font-medium">Action</div>
                </div>
              </div>
              <div>
                {/* {(user ? newCart?.data : cart)?.map((item) => ( */}
                {cart?.map((item) => (
                  <div
                    key={item?.itemId}
                    className="flex border-b hover:bg-gray-100 p-4 transition duration-200"
                  >
                    <div className="w-1/4 font-semibold">{item?.name}</div>
                    <div className="w-1/4">{item?.quantity}</div>
                    <div className="w-1/4 font-semibold text-[#E63946]">
                      €{item?.price?.toFixed(2)}
                    </div>
                    <div className="w-1/4">
                      <button
                        onClick={() => handleDeleteItem(item?.itemId)}
                        className="text-[#E63946] font-semibold hover:text-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Total and Checkout Button */}
          <div className="bg-white p-6 rounded-lg rounded-t-none shadow-lg">
            <div className="flex justify-around items-center">
              <span className="text-lg font-semibold text-[#3D5A6E]">
                Total
              </span>
              <span className="text-lg font-semibold text-[#E63946]">
                €{totalAmount?.toFixed(2)}
              </span>
            </div>
            <PlaceOrder />
          </div>

          {/* For Mobile View (card style with less data) */}
          <div className="sm:hidden">
            {cart?.map((item) => (
              <div
                key={item?.itemId}
                className="flex border-b rounded-lg shadow-lg hover:shadow-xl transition hover:bg-gray-100 p-4 mb-6"
              >
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-lg font-semibold text-[#2D6A4F]">
                    {item?.name}
                  </h3>
                  <span className="text-[#E63946] font-bold text-lg">
                    ${item?.price?.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-[#3D5A6E]">
                    Quantity: {item?.quantity}
                  </span>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => handleDeleteItem(item?.itemId)}
                    className="text-[#E63946] font-semibold hover:text-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
