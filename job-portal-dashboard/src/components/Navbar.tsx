import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/job.jpg'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className='w-16 h-16 object-contain mr-2 ' />
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/jobs" className="nav-link">Browse Jobs</Link>
            <div className="h-6 w-px bg-gray-200"></div>
            <Link to="/login" className="nav-link">Login</Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="mobile-link">
              Browse Jobs
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mobile-link">
              Login
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="mobile-link text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
