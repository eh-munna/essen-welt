import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2D6A4F] text-white py-6">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold">Essen Welt</h2>
          <p className="text-sm mt-2 text-[#E9CBA7]">
            Fresh, delicious, and delivered to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#F4A261]">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/menu" className="hover:text-[#F4A261] transition">
                Menu
              </a>
            </li>
            <li>
              <a href="/orders" className="hover:text-[#F4A261] transition">
                Orders
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-[#F4A261] transition">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-[#F4A261]">Follow Us</h3>
          <div className="flex space-x-4 mt-3 justify-center text-xl">
            <Link to="/" className="text-white hover:text-[#F4A261] transition">
              <FaFacebook />
            </Link>
            <Link to="/" className="text-white hover:text-[#F4A261] transition">
              <FaInstagram />
            </Link>
            <Link to="/" className="text-white hover:text-[#F4A261] transition">
              <FaTwitter />
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold text-[#F4A261]">Newsletter</h3>
          <p className="text-sm text-[#E9CBA7] mt-2">
            Sign up to receive the latest updates and offers!
          </p>
          <div className="flex gap-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 p-2 w-full sm:w-2/3 rounded border border-[#B4B4B4] text-[#2D6A4F]"
            />
            <button className="mt-2 w-full sm:w-auto p-2 bg-[#F4A261] text-white rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#B4B4B4] mt-6 pt-4 text-center text-sm text-[#E9CBA7]">
        &copy; {new Date().getFullYear()} Essen Welt. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
