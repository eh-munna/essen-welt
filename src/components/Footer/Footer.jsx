import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-white text-[#131313] mt-[104px] mb-4 border-t border-gray-200 ">
      {/* <div className="border-t border-gray-200 w-full"></div> */}
      <div className="mt-16 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">Essen Welt</h2>
          <p className="text-sm mt-2 text-orange-400">
            Fresh, delicious, and delivered to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div className="">
          <h3 className="text-lg font-semibold text-amber-600">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/menu" className="hover:text-[#F4A261] transition">
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className="hover:text-[#F4A261] transition"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-[#F4A261] transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-amber-600">Follow Us</h3>
          <div className="flex justify-center items-center mt-3 text-xl gap-5">
            <Link
              to="/"
              className="text-orange-500 hover:text-orange-600 transition"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="text-orange-500 hover:text-orange-600 transition"
            >
              <FaInstagram />
            </Link>
            <Link
              to="/"
              className="text-orange-500 hover:text-orange-600 transition"
            >
              <FaTwitter />
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="sm:col-span-2 md:col-span-1 space-y-3">
          <h3 className="text-lg font-semibold text-amber-600">Newsletter</h3>
          <p className="text-sm text-orange-400 mt-2">
            Sign up to receive the latest updates and offers!
          </p>
          <div className="flex items-center gap-3 relative rounded-full border p-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="border-0 w-full sm:w-2/3 rounded-full text-orange-500 px-0.5 outline-none focus:ring-0"
            />
            <button className="border-[1px] border-transparent absolute right-0 w-full sm:w-auto p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 pt-6 mt-[104px] text-center text-sm text-orange-500">
        &copy; {new Date().getFullYear()} Essen Welt. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
