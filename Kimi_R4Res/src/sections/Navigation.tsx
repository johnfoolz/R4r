import { useState, useEffect } from 'react';
import { Video, Menu, X, ShoppingCart, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  label: string;
  to?: string;
  action?: () => void;
  type: 'link' | 'scroll';
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks: NavLink[] = isHomePage
    ? [
        { label: 'Our Work', action: () => scrollToSection('work'), type: 'scroll' },
        { label: 'Packages', action: () => scrollToSection('packages'), type: 'scroll' },
        { label: 'How It Works', action: () => scrollToSection('process'), type: 'scroll' },
        { label: 'FAQ', action: () => scrollToSection('faq'), type: 'scroll' },
      ]
    : [
        { label: 'Home', to: '/', type: 'link' },
        { label: 'Portfolio', to: '/portfolio', type: 'link' },
        { label: 'Packages', to: '/checkout?package=growth', type: 'link' },
        { label: 'Custom', to: '/custom-package', type: 'link' },
      ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-brand-dark">
                Reels 4 Restaurants
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, index) =>
                link.type === 'scroll' && link.action ? (
                  <button
                    key={index}
                    onClick={link.action}
                    className="text-gray-600 hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </button>
                ) : link.to ? (
                  <Link
                    key={index}
                    to={link.to}
                    className="text-gray-600 hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : null
              )}
              
              {/* Portfolio Link - Always visible */}
              <Link
                to="/portfolio"
                className="text-gray-600 hover:text-brand-orange transition-colors"
              >
                Portfolio
              </Link>

              {/* Custom Package Link */}
              <Link
                to="/custom-package"
                className="flex items-center gap-1 text-gray-600 hover:text-brand-orange transition-colors"
              >
                <Package className="w-4 h-4" />
                Custom
              </Link>

              {/* Book Now Button */}
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary px-6 py-3 rounded-full font-semibold"
                >
                  Book Free Consultation
                </button>
              ) : (
                <Link
                  to="/checkout?package=growth"
                  className="btn-primary px-6 py-3 rounded-full font-semibold flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Book Now
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-24">
          <div className="flex flex-col space-y-6 text-lg">
            {/* Home Link */}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-800"
            >
              Home
            </Link>

            {/* Portfolio Link */}
            <Link
              to="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-800"
            >
              Portfolio
            </Link>

            {/* Packages Link */}
            <Link
              to="/checkout?package=growth"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-800"
            >
              Packages
            </Link>

            {/* Custom Package Link */}
            <Link
              to="/custom-package"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-800 flex items-center gap-2"
            >
              <Package className="w-5 h-5" />
              Custom Package
            </Link>

            {/* Book Now Button */}
            <Link
              to="/checkout?package=growth"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary text-white px-6 py-3 rounded-full font-semibold text-center mt-4 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
