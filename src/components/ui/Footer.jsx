import React from 'react';
import { Link } from 'react-router-dom';
import { SprayCanIcon as Spray, UtensilsCrossed, Sofa, Bed, Briefcase, ChevronRight, Star, Menu, X } from 'lucide-react';

const Footer = ({ services }) => {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Spray className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold">EcoClean</span>
            </Link>
            <p className="text-green-300">Redefining cleanliness, one space at a time.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.route}
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-green-300 mb-2">123 Clean Street, Green City, 12345</p>
            <p className="text-green-300 mb-2">contact@ecoclean.com</p>
            <p className="text-green-300">(123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-300">
          <p>© 2024 EcoClean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
