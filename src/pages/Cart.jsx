import { CartContext } from '@/context/cart/CartProvider';
import { useContext, useMemo } from 'react';

export default function Cart() {
  const { cartItems } = useContext(CartContext);

  const totalAmount = useMemo(
    () => cartItems.reduce((total, item) => total + item.price, 0),
    [cartItems]
  );

  if (cartItems.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#F1F1F1] text-[#2D6A4F]">
        <h2 className="text-3xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-lg text-[#3D5A6E]">
          Start adding items to your cart.
        </p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#2D6A4F] mb-8">Shopping Cart</h2>

      <div className="bg-[#F1F1F1] p-6 rounded-2xl shadow-lg">
        <ul className="divide-y divide-[#B4B4B4]">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between py-4">
              <span className="text-[#3D5A6E] font-medium">{item.name}</span>
              <span className="text-[#E63946] font-semibold">
                ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-[#B4B4B4] mt-6 pt-4 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-[#E63946]">${totalAmount.toFixed(2)}</span>
        </div>

        <button
          className="mt-6 w-full bg-[#2D6A4F] text-white py-3 rounded-md hover:bg-[#1B4D38] transition duration-200"
          aria-live="polite"
        >
          Place Order
        </button>
      </div>
    </section>
  );
}
