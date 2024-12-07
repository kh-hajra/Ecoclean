import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {  Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.svg'; // Correct Import
const Header = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
        <img
                  className="h-8 w-auto sm:h-10"
                  src={logo} // Correct File Reference
                  alt="EcoClean Logo"
                />
          <span className="text-2xl font-bold text-green-800">EcoClean</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          {['Home', 'Services', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg rounded-b-2xl mx-4 mt-2"
        >
          <nav className="flex flex-col p-4 space-y-4">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-green-800 hover:text-green-600 transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link
              to="/login"
              className="px-4 py-2 text-center text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-center bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Sign Up
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
