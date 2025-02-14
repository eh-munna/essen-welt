import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#f3f4f6] to-[#e2e8f0]">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-lg w-full">
        <h1 className="text-7xl font-extrabold text-[#E63946] mb-4 animate__animated animate__fadeIn animate__delay-1s">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-[#2D6A4F] mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          We can't find the page you're looking for. It may have been moved or
          deleted.
        </p>
        <a
          href="/"
          className="flex items-center justify-center gap-4 px-6 py-3 text-lg font-semibold text-white bg-[#2D6A4F] rounded-full hover:bg-[#1F4E34] transition duration-300 transform hover:scale-105"
        >
          <FaArrowLeft className="text-xl" />
          <span>Go Back Home</span>
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
