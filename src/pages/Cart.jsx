import React from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-[#2D6A4F] mb-6">
          We're Working On It!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Our cart feature is under construction. Stay tuned for the launch!
        </p>
        <div className="animate-pulse flex justify-center items-center space-x-4">
          <div className="w-8 h-8 bg-[#2D6A4F] rounded-full"></div>
          <div className="w-8 h-8 bg-[#2D6A4F] rounded-full"></div>
          <div className="w-8 h-8 bg-[#2D6A4F] rounded-full"></div>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Thank you for your patience!
        </p>
        {/* Navigation to Home */}
        <Link to="/" className="mt-8 inline-block bg-[#2D6A4F] text-white py-2 px-6 rounded-lg hover:bg-[#1F4E34] transition">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Cart;
