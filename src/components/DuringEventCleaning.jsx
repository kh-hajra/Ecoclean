import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock, Shield, Users, Sparkles } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
function DuringEventCleaning() {
  const services = [
    "Continuous monitoring and cleaning of high-traffic areas",
    "Prompt spill cleanup and stain removal",
    "Regular restroom checks and restocking",
    "Discreet trash collection and removal",
    "Maintenance of food service areas",
    "Cleaning and resetting of event spaces between sessions",
    "Ongoing floor care (sweeping, mopping, vacuuming)",
    "Air quality management and odor control",
  ];

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-orange-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
       <BackButton to="/event" /> 
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          During-Event <span className="text-yellow-600">Cleaning</span> Services
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Maintain cleanliness and hygiene throughout your event with our discreet and efficient cleaning services.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Seamless cleanliness</span>
                <span className="block text-yellow-600">throughout your event</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our during-event cleaning services ensure that your venue remains spotless and hygienic from start to finish. We work discreetly to maintain a clean environment without disrupting your guests or activities.
              </p>
              <Link
                to="./DuringEventBooking"
                className="mt-8 bg-yellow-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-yellow-700 transition-colors duration-150"
              >
                Schedule During-Event Cleaning
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{service}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-yellow-100 rounded-2xl p-8 text-center">
            <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Continuous Care</h3>
            <p className="text-gray-700">
              We provide ongoing cleaning throughout your event to maintain a pristine environment.
            </p>
          </div>
          <div className="bg-green-100 rounded-2xl p-8 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Discreet Service</h3>
            <p className="text-gray-700">
              Our team works unobtrusively to minimize disruption to your event and guests.
            </p>
          </div>
          <div className="bg-blue-100 rounded-2xl p-8 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Experienced Staff</h3>
            <p className="text-gray-700">
              Our trained professionals know how to handle cleaning during live events efficiently.
            </p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-8 text-center">
            <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Rapid Response</h3>
            <p className="text-gray-700">
              We quickly address spills, messes, and other cleaning needs as they arise.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our During-Event Cleaning Approach</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-yellow-800 mb-2">1. Strategic Positioning</h4>
              <p className="text-gray-700">We position our staff strategically to monitor and maintain cleanliness efficiently.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-800 mb-2">2. Proactive Cleaning</h4>
              <p className="text-gray-700">We anticipate cleaning needs and address them before they become noticeable.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-800 mb-2">3. Rapid Response</h4>
              <p className="text-gray-700">We quickly respond to any cleaning emergencies or unexpected messes.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-800 mb-2">4. Continuous Communication</h4>
              <p className="text-gray-700">We maintain open communication with event organizers to address any specific needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DuringEventCleaning;