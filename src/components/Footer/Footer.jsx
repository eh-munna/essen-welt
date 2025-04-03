import { FaFacebook, FaInstagram, FaTwitter, FaYelp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-bold text-orange-500 hover:text-orange-600 transition-colors">
                Essen Welt
              </h2>
            </Link>
            <p className="text-gray-600 text-base leading-relaxed">
              Fresh, delicious meals crafted with passion and delivered to your
              door.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <FaYelp className="text-2xl text-gray-500 hover:text-orange-500 transition-colors" />
              <span className="text-sm text-gray-500">
                4.9/5 (200+ reviews)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/menu"
                  className="text-gray-600 hover:text-orange-500 transition-colors text-base"
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-orange-500 transition-colors text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-orange-500 transition-colors text-base"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-600 hover:text-orange-500 transition-colors text-base"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <address className="not-italic text-gray-600 space-y-3 text-base">
              <p>123 Restaurant Row</p>
              <p>Berlin, Germany 10115</p>
              <p>
                <a
                  href="tel:+49123456789"
                  className="hover:text-orange-500 transition-colors"
                >
                  +49 123 456 789
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@essenwelt.com"
                  className="hover:text-orange-500 transition-colors"
                >
                  info@essenwelt.com
                </a>
              </p>
            </address>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Newsletter
              </h3>
              <p className="text-gray-600 text-base">
                Subscribe for updates and special offers
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition-colors text-xl"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition-colors text-xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition-colors text-xl"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Essen Welt. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
