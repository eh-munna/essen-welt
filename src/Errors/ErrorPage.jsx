import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 pt-[80px]">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
        {/* Error Illustration */}
        <div className="mb-6">
          <svg
            className="w-40 h-40 mx-auto text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-orange-500 mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Please
          check the URL or navigate back to our homepage.
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-all duration-300 hover:shadow-md"
        >
          <FaArrowLeft className="text-xl" />
          <span>Return Home</span>
        </Link>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Need help?{' '}
            <Link to="/contact" className="text-orange-500 hover:underline">
              Contact our support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
