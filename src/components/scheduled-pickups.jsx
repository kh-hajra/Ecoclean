import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, CheckCircle } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const ScheduledPickups = () => {
  const benefits = [
    "Customizable collection frequency",
    "Consistent pickup times",
    "Automated reminders",
    "Flexible rescheduling options",
    "Holiday schedule adjustments",
    "24/7 online scheduling portal"
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
         <BackButton to="/garbage-collection" /> 
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Calendar className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Scheduled Pickups
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Reliable and convenient waste collection on your schedule.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900">Benefits of Our Scheduled Pickups:</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                </div>
                <p className="ml-3 text-lg text-gray-500">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900">How It Works</h2>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <ol>
              <li>Choose your preferred pickup frequency (weekly, bi-weekly, or monthly)</li>
              <li>Select your desired pickup day and time slot</li>
              <li>Receive confirmation and automated reminders</li>
              <li>Place your waste bins out at the scheduled time</li>
              <li>Our team arrives to collect your waste promptly</li>
            </ol>
            <p>
              With our scheduled pickup service, you can enjoy peace of mind knowing that your waste management needs are taken care of consistently and efficiently.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="./BookingScreen"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowLeft className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
           Schedule a service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScheduledPickups;

