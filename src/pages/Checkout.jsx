import React, { useState } from 'react';

const mockCart = [
  { id: 1, name: 'Grilled Salmon', price: 15.99, quantity: 1 },
  { id: 2, name: 'Veggie Pizza', price: 12.49, quantity: 2 },
];

const Checkout = () => {
  const [cart, setCart] = useState(mockCart);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-[#2D6A4F] mb-6">Checkout</h2>
      <div className="bg-[#F1F1F1] p-6 rounded-2xl shadow-lg">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-4">
            <span className="text-[#3D5A6E] font-semibold">{item.name}</span>
            <span className="text-[#E63946]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-[#B4B4B4] mt-4 pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-[#E63946]">${calculateTotal().toFixed(2)}</span>
        </div>
        <button className="mt-6 w-full bg-[#2D6A4F] text-white py-3 rounded-md hover:bg-[#1B4D38] transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
