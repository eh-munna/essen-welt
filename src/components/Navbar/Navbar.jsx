import { AuthContext } from '@/context/authentication/AuthProvider';
import useCart from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { Menu, ShoppingBag, User2, X } from 'lucide-react'; // Icon package
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

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

  const [isHovered, setIsHovered] = useState(false);

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
          'bg-white/80 backdrop-blur-[20px] shadow-md': isScrolled,
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
          <ul className="flex items-center justify-center gap-5">
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
                <li
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.photoURL || <User2 />}
                      alt="User profile picture"
                    />
                  </Link>

                  {/* Floating Menu */}
                  <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 w-40 overflow-hidden z-50 rounded-b-lg">
                    <ul
                      className={cn(
                        `relative flex flex-col gap-2 w-full bg-white shadow-lg rounded-b-lg p-3 opacity-0 translate-y-[-10px] transition-all duration-300 ease-in-out pointer-events-none`,
                        {
                          'opacity-100 translate-y-0 pointer-events-auto':
                            isHovered,
                          'bg-white/80': isScrolled,
                        }
                      )}
                    >
                      <li className="relative text-orange-500 hover:text-orange-600 transition-all">
                        <Link
                          className="relative inline-block pb-2 group"
                          to={`/dashboard/profile`}
                        >
                          Profile
                          <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-orange-600 group-hover:w-full transition-all"></span>
                        </Link>
                      </li>

                      <li className="relative text-orange-500 hover:text-orange-600 transition-all">
                        <Link
                          className="relative inline-block pb-2 group"
                          to={`/dashboard`}
                        >
                          Dashboard
                          <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-orange-600 group-hover:w-full transition-all"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
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
      </div>
    </nav>
  );
}
