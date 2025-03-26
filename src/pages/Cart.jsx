import Heading from '@/components/Heading';
import { CartContext } from '@/context/cart/CartProvider';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCustomer from '@/hooks/useCustomer';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
    <section className="px-6 py-10 bg-[#FBFBFB]">
      <Heading headingText={'Shopping Cart'} />

      {/* Cart List */}
      <div className="space-y-6">
        <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          {/* For Desktop View (Two-column layout) */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {/* Left Section: Cart Items */}
            <div className="space-y-4">
              <div className="grid grid-cols-5">
                <div>Product</div>
                <div></div>
                <div>Price</div>
                <div>Quantity</div>
                <div></div>
              </div>
              {cart?.map((item) => (
                <div
                  key={item?.itemId}
                  className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
                >
                  {/* Product Section: Image and Name */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold text-[#2D6A4F]">
                        {item?.name}
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex flex-col items-start justify-between ml-4">
                    <div className="text-[#E63946] font-semibold">
                      €{item?.price?.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Section */}
                  <div className="flex flex-col items-start justify-between ml-4">
                    <span className="bg-[#E0E0E0] rounded-full py-2 px-4 text-[#2D6A4F] font-semibold">
                      {item?.quantity}x
                    </span>
                  </div>

                  {/* Delete Button */}
                  <div>
                    <button
                      onClick={() => handleDeleteItem(item?.itemId)}
                      className="text-[#E63946] font-semibold hover:text-red-500 transition"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Total Price for this item */}
                  <div className="font-semibold text-[#2D6A4F]">
                    €{(item?.price * item?.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section: Cart Summary */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#3D5A6E]">
                    Total Items:
                  </span>
                  <span className="text-lg font-semibold text-[#2D6A4F]">
                    {cart?.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#3D5A6E]">
                    Subtotal:
                  </span>
                  <span className="text-lg font-semibold text-[#2D6A4F]">
                    €
                    {cart
                      ?.reduce(
                        (total, item) => total + item?.price * item?.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#3D5A6E]">
                    Total:
                  </span>
                  <span className="text-lg font-semibold text-[#E63946]">
                    €{totalAmount?.toFixed(2)}
                  </span>
                </div>

                <Link
                  className="mt-6 w-full bg-[#2D6A4F] text-white py-3 rounded-md hover:bg-[#1B4D38] transition duration-200"
                  to="/payment"
                >
                  Place Order
                </Link>
              </div>
            </div>
          </div>

          {/* For Mobile View (Card-style) */}
          <div className="sm:hidden">
            {cart?.map((item) => (
              <div
                key={item?.itemId}
                className="flex flex-col bg-white shadow-lg rounded-lg p-4 mb-6"
              >
                {/* Product Section: Name and Price */}
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-lg font-semibold text-[#2D6A4F]">
                    {item?.name}
                  </h3>
                  <span className="text-[#E63946] font-bold text-lg">
                    €{item?.price?.toFixed(2)}
                  </span>
                </div>

                {/* Quantity Section */}
                <div className="mt-2">
                  <span className="bg-[#E0E0E0] rounded-full py-1 px-3 text-[#2D6A4F] font-semibold">
                    {item?.quantity}x
                  </span>
                </div>

                {/* Total Price */}
                <div className="mt-2">
                  <span className="text-sm text-[#3D5A6E]">
                    Total: €{(item?.price * item?.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Delete Button */}
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

            {/* Cart Summary */}
            <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#3D5A6E]">
                  Total Items:
                </span>
                <span className="text-lg font-semibold text-[#2D6A4F]">
                  {cart?.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#3D5A6E]">
                  Subtotal:
                </span>
                <span className="text-lg font-semibold text-[#2D6A4F]">
                  €
                  {cart
                    ?.reduce(
                      (total, item) => total + item?.price * item?.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#3D5A6E]">
                  Total:
                </span>
                <span className="text-lg font-semibold text-[#E63946]">
                  €{totalAmount?.toFixed(2)}
                </span>
              </div>
              <PlaceOrder />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
