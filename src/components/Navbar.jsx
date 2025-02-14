import { Menu, X } from 'lucide-react'; // Icon package
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navbarLinks = [
  { name: 'Home', path: '/' },
  { name: 'Orders', path: '/orders' },
  { name: 'Cart', path: '/cart' },
  { name: 'Checkout', path: '/checkout' },
  { name: 'Profile', path: '/profile' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#2D6A4F] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={'/'} className="text-white text-2xl font-bold">
          EssenWelt
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-white">
          {navbarLinks.map(({ name, path }) => (
            <li key={name} className="hover:text-[#F4A261] transition">
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-[#2D6A4F] text-white text-center py-2">
          {navbarLinks.map(({ name, path }) => (
            <li key={name} className="py-2 border-b border-gray-600">
              <Link to={path} onClick={() => setIsOpen(false)}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
