import { AuthContext } from '@/context/authentication/AuthProvider';
import { CircleUser, Menu, X } from 'lucide-react'; // Icon package
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// TODO: Remove the user interface

const navbarLinks = [
  { name: 'Home', path: '/', scrollId: '' },
  { name: 'Menu', path: '/menu', scrollId: '' },
  { name: 'Orders', path: '/orders', scrollId: '' },
  { name: 'Cart', path: '/cart', scrollId: '' },
  { name: 'Dashboard', path: '/dashboard', scrollId: '' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userSignOut } = useContext(AuthContext);

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
    <nav className="bg-[#2D6A4F] p-4">
      <div className="flex justify-between items-center">
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

          {!user ? (
            <>
              <li className="hover:text-[#F4A261] transition">
                <Link to="/sign-up">Sign Up</Link>
              </li>
              <li className="hover:text-[#F4A261] transition">
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-[#F4A261] transition">
                <Link
                  className="flex flex-col justify-between items-center"
                  to="/"
                >
                  <CircleUser />
                  {user.displayName}
                </Link>
              </li>
              <li className="hover:text-[#F4A261] transition">
                <Link to="/" onClick={handleUserSignOut}>
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
    </nav>
  );
}

export default Navbar;
