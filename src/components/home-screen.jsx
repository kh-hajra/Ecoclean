
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SprayCanIcon as Spray, UtensilsCrossed, Sofa, Bed, Briefcase, ChevronRight, Star, Menu, X } from 'lucide-react';
import placeholderImage from '../assets/images/placeholder.png';
import '../styles/bubbles.css';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import Spline from '@splinetool/react-spline';

const services = [
  { name: 'Outdoor', icon: Bed, description: 'Tidy community areas', route: '/outdoor' },
  { name: 'Commercial', icon: UtensilsCrossed, description: 'Pristine business spaces', route: '/commercial' },
  { name: 'Event', icon: Sofa, description: 'Immaculate event venues', route: '/event' },
  { name: 'Residential', icon: Spray, description: 'Sparkling clean homes', route: '/residential' },
 
];

const topCleaners = [
  { name: 'Alice Johnson', rating: 4.9, image: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Bob Smith', rating: 4.8, image: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Carol Davis', rating: 4.7, image: 'https://i.pravatar.cc/150?img=3' },
];

export default function HomeScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 

  const animateBubbles = () => {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble) => {
      const size = bubble.style.getPropertyValue('--size');
      const left = bubble.style.getPropertyValue('--left');
      bubble.animate(
        [
          { transform: `translate(${left}, 100%) scale(0)`, opacity: 1 },
          { transform: `translate(${left}, -100%) scale(1)`, opacity: 0 }
        ],
        {
          duration: Math.random() * 4000 + 2000,
          iterations: Infinity,
          delay: Math.random() * 2000,
        }
      );
    });
  };

  useEffect(() => {
    animateBubbles();
  }, []);

  return (
    <div className="min-h-screen bg-white">
       <Header scrollY={scrollY} />

      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-200 to-blue-200 py-16 md:py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-green-200 to-blue-200 animate-gradient-x"></div>
            <div className="absolute inset-0 opacity-50">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                
               
                <path fill="url(#grain)" d="M0 0 L100 0 L100 100 L0 100 Z" />
              </svg>
            </div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4"
                >
                  Cleanliness Redefined
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg md:text-xl text-green-700 mb-8"
                >
                  Experience the future of cleaning with EcoClean
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link to="/book" className="px-6 py-3 bg-white text-green-600 text-lg rounded-full hover:bg-green-100 transition-colors inline-block">
                    Book Now
                  </Link>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <svg className="w-full h-auto" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <image href={placeholderImage} width="300" height="300" x="50" y="0" />
                    {/* Bubbles */}
                    <circle cx="350" cy="50" r="20" fill="rgba(255,255,255,0.5)" />
                    <circle cx="380" cy="90" r="15" fill="rgba(255,255,255,0.5)" />
                    <circle cx="330" cy="120" r="25" fill="rgba(255,255,255,0.5)" />
                    <circle cx="360" cy="150" r="10" fill="rgba(255,255,255,0.5)" />
                    <circle cx="390" cy="180" r="18" fill="rgba(255,255,255,0.5)" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <Link to={service.route} className="block p-6">
                  <div className="flex items-center justify-between mb-4">
                    {React.createElement(service.icon, { className: "h-10 w-10 text-green-600" })}
                    <ChevronRight className="h-6 w-6 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-green-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Top Rated Cleaners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topCleaners.map((cleaner, index) => (
                <motion.div
                  key={cleaner.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-green-700 rounded-2xl p-6 text-center"
                >
                  <img src={cleaner.image} alt={cleaner.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" />
                  <h3 className="text-xl font-semibold mb-2">{cleaner.name}</h3>
                  <div className="flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
                    <span className="font-medium">{cleaner.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Ready for a Spotless Space?</h2>
          <p className="text-xl text-gray-600 mb-12">Experience the EcoClean difference today!</p>
          <Link to="/book" className="px-8 py-4 bg-green-600 text-white text-lg rounded-full hover:bg-green-700 transition-colors inline-block">
            Book Your Cleaning
          </Link>
        </section>
      </main>
      <Footer services={services} />
    </div>
  );
}






