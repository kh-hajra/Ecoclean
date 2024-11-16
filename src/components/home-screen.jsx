import React from 'react';
import Button from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { SprayCanIcon as Spray, UtensilsCrossed, Sofa, Bed, Briefcase, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const pastelColors = [
  { bg: 'bg-pink-100', border: 'border-pink-300' },
  { bg: 'bg-blue-100', border: 'border-blue-300' },
  { bg: 'bg-green-100', border: 'border-green-300' },
  { bg: 'bg-yellow-100', border: 'border-yellow-300' },
  { bg: 'bg-purple-100', border: 'border-purple-300' },
];

const services = [
  { name: 'Residential Cleaning', icon: Spray, description: 'Sparkling clean bathrooms', route: '/residential' },
  { name: 'Commercial Cleaning', icon: UtensilsCrossed, description: 'Spotless kitchen spaces', route: '/commercial' },
  { name: 'Event Cleaning', icon: Sofa, description: 'Fresh and tidy living areas', route: '/event' },
  { name: 'Society Cleaning', icon: Bed, description: 'Cozy and clean bedrooms', route: '/outdoor' },
  { name: 'Office Cleaning', icon: Briefcase, description: 'Professional workspace cleaning', route: '/office-cleaning' },
];

const topCleaners = [
  { name: 'Alice Johnson', rating: 4.9, image: '/placeholder.svg' },
  { name: 'Bob Smith', rating: 4.8, image: '/placeholder.svg' },
  { name: 'Carol Davis', rating: 4.7, image: '/placeholder.svg' },
];

export default function HomeScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Spray className="h-6 w-6 text-green-600" />
            <span className="hidden font-bold sm:inline-block text-xl">EcoClean</span>
          </Link>
          <nav className="flex flex-1 items-center justify-between space-x-6 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-green-600 transition-colors">Services</Link>
            <Link to="/profile" className="text-gray-700 hover:text-green-600 transition-colors">Profile</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 container px-4 md:px-6">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center md:text-left">Welcome to EcoClean</h1>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">Our Services</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-xl border border-green-100 bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="flex w-max space-x-6 p-6">
              {services.map((service, index) => (
                <Card
                  key={service.name}
                  className={`w-[280px] cursor-pointer hover:shadow-md transition-all duration-300 border-2 ${pastelColors[index % pastelColors.length].bg} ${pastelColors[index % pastelColors.length].border}`}
                >
                  <Link to={service.route}>
                    <CardContent className="flex flex-col items-start justify-between p-6 h-[200px]">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-4">
                          {React.createElement(service.icon, { className: "h-10 w-10 text-gray-800" })}
                          <ChevronRight className="h-5 w-5 text-gray-800" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-700">{service.description}</p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-green-100" />
          </ScrollArea>
        </section>

        {/* Top Rated Cleaners Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">Top Rated Cleaners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCleaners.map((cleaner) => (
              <Card key={cleaner.name} className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardContent className="flex items-center p-6">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={cleaner.image} alt={cleaner.name} />
                    <AvatarFallback>{cleaner.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{cleaner.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{cleaner.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center px-4 md:px-6">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2024 EcoClean. All rights reserved.</p>
          <nav className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-green-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-green-600 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-gray-500 hover:text-green-600 transition-colors">Contact Us</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
