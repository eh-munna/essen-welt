import { Link } from 'react-router-dom';

export default function Careers() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl">
        {/* Header Section */}
        <div className="bg-orange-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Careers</h2>
          <p className="text-orange-100 mt-2">Join our team</p>
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Career Opportunities Coming Soon
          </h3>
          <p className="text-gray-600 mb-6">
            We're not currently hiring, but check back later for exciting career
            opportunities!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-300 text-center"
            >
              Home Page
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition duration-300 text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
