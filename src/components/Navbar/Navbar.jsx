import { AuthContext } from '@/context/authentication/AuthProvider';
import useCart from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { Menu, ShoppingBag, X } from 'lucide-react'; // Icon package
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

// TODO: Remove the user logo interface

const navbarLinks = [
  { name: 'Home', path: '/', scrollId: '' },
  { name: 'Menu', path: '/menu', scrollId: '' },
  // { name: 'Book A Table', path: '', scrollId: '' },
  { name: 'Cart', path: '/cart', scrollId: '' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { user, userSignOut } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserSignOut = async () => {
    try {
      await toast.promise(
        userSignOut(),
        {
          loading: 'Loading...',
          success: () => (
            <div className="bg-white px-6 animate-enter">
              User signed out successfully!
            </div>
          ),
          error: (err) => <div className="bg-white px-6">{err.message}</div>,
        },
        {
          style: { paddingLeft: '1.5rem', paddingRight: '1.5rem' },
          loading: { position: 'top-right', duration: 3000 },
          success: { position: 'top-right', duration: 3000 },
          error: { position: 'top-right', duration: 3000 },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      className={cn(
        `w-full items-center px-4 py-3 text-orange-500 transition-all duration-300 ease-in-out text-sm`,
        {
          'bg-white md:bg-white/80 backdrop-blur-none md:backdrop-blur-[20px] shadow-md':
            isScrolled,
          'bg-white shadow': !isScrolled,
        }
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={'/'} className="text-orange-500 text-2xl font-bold">
          EssenWelt
        </Link>

        {/* Navbar Links */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <button
            className="text-orange-500 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-orange-500">
            {navbarLinks.map(({ name, path }) => (
              <li
                key={name}
                className="relative group hover:text-orange-600 transition-all"
              >
                <Link to={path} className="relative group pb-2">
                  {name === 'Cart' ? (
                    cart?.length > 0 ? (
                      <>
                        <ShoppingBag className="relative" />{' '}
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-xs text-white">
                          {cart?.length}
                        </span>
                      </>
                    ) : (
                      <ShoppingBag />
                    )
                  ) : (
                    name
                  )}

                  {/* Underline effect */}
                  <span
                    className={cn(
                      `absolute left-0 bottom-0 w-0 h-[3px] bg-orange-600 group-hover:w-full transition-all`,
                      {
                        'bg-transparent': name === 'Cart',
                      }
                    )}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Links */}
          <ul className="hidden md:flex items-center justify-center gap-5">
            {!user ? (
              <>
                <li className="flex flex-col items-center justify-center">
                  <Link
                    className="bg-orange-500 hover:bg-orange-600 transition-all rounded-full group py-2 px-6 text-white border border-orange-500 hover:border-orange-600"
                    to="/sign-up"
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="flex flex-col items-center justify-center">
                  <Link
                    className="bg-transparent border border-orange-500 hover:border-orange-600 hover:bg-orange-600 hover:text-white transition-all rounded-full group py-2 px-6 text-orange-500"
                    to="/login"
                  >
                    Log in
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* -------------------------------- */}

                <li className="group relative flex flex-col items-center">
                  <Link>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.photoURL}
                      alt="Profile"
                    />
                  </Link>

                  {/* Menu */}
                  <div className=" rounded-lg absolute top-full left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-300 ease-out max-h-0 group-hover:max-h-40">
                    <div
                      className={cn(
                        `w-40 bg-white shadow-lg rounded-b-lg mt-3 p-3 transition-all duration-300 ease-out opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0`,
                        {
                          'bg-white/80 shadow-md': isScrolled,
                        }
                      )}
                    >
                      <div className="flex flex-col gap-2 mt-1">
                        <li className="relative">
                          <Link
                            to="/dashboard/profile"
                            className="text-orange-500 hover:text-orange-600 relative inline-block pb-2 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-orange-600 after:w-0 hover:after:w-full after:transition-all"
                          >
                            Profile
                          </Link>
                        </li>
                        <li className="relative">
                          <Link
                            to="/dashboard"
                            className="text-orange-500 hover:text-orange-600 relative inline-block pb-2 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-orange-600 after:w-0 hover:after:w-full after:transition-all"
                          >
                            Dashboard
                          </Link>
                        </li>
                      </div>
                    </div>
                  </div>
                </li>

                {/* -------------------------------- */}

                <li>
                  <Link
                    className="bg-transparent border border-orange-500 hover:border-orange-600 hover:bg-orange-600 hover:text-white transition-all rounded-full group py-2 px-6 text-orange-500"
                    to="/"
                    onClick={handleUserSignOut}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <AnimatePresence>
            {/* Backdrop with fade animation */}
            <motion.div
              className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            >
              {/* Menu panel with smooth slide-in */}
              <motion.div
                className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 200,
                }}
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 text-orange-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </motion.button>

                {/* Menu Content */}
                <div className="h-full flex flex-col pt-16 px-6">
                  {/* User Info */}
                  {user && (
                    <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-200">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={user?.photoURL}
                        alt="Profile"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.displayName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <ul className="space-y-4">
                    {navbarLinks.map(({ name, path }) => (
                      <li key={name}>
                        <Link
                          to={path}
                          className="block py-3 text-orange-500 hover:text-orange-600 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {name === 'Cart' && cart?.length > 0 ? (
                            <div className="flex items-center justify-between">
                              <span>Cart</span>
                              <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cart.length}
                              </span>
                            </div>
                          ) : (
                            name
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Auth Section */}
                  <div className="mt-auto pb-8 pt-6 border-t border-gray-200">
                    {!user ? (
                      <div className="space-y-3">
                        <Link
                          to="/sign-up"
                          className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded-full transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                        <Link
                          to="/login"
                          className="block w-full border border-orange-500 text-orange-500 hover:bg-orange-50 text-center py-2 px-4 rounded-full transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Log in
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link
                          to="/dashboard"
                          className="block text-orange-500 hover:text-orange-600 py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleUserSignOut();
                          }}
                          className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 text-center py-2 px-4 rounded-full transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </nav>
  );
}
