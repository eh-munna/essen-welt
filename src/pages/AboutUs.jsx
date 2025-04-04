import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl">
        {/* Header Section */}
        <div className="bg-orange-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">About Us</h2>
          <p className="text-orange-100 mt-2">Our story is coming soon</p>
        </div>

        {/* Content Section */}
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <svg
              className="w-24 h-24 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Under Construction
          </h3>
          <p className="text-gray-600 mb-6">
            We're working hard to bring you our company story. Please check back
            later!
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
