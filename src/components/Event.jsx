import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sparkles, Trash2, Clock, Users, ArrowRight } from 'lucide-react';

const eventCleaningServices = [
  {
    id: 'pre-event-cleaning',
    title: 'Pre-Event Cleaning',
    description: 'Ensure your venue is spotless and ready to impress before your event begins.',
    icon: Sparkles,
    color: 'bg-blue-100',
  },
  {
    id: 'post-event-cleaning',
    title: 'Post-Event Cleaning',
    description: 'Swift and thorough cleanup after your event to restore the venue to its original condition.',
    icon: Trash2,
    color: 'bg-green-100',
  },
  {
    id: 'during-event-cleaning',
    title: 'During-Event Cleaning',
    description: 'Maintain cleanliness and hygiene throughout your event with our discreet cleaning services.',
    icon: Clock,
    color: 'bg-yellow-100',
  },
];

function EventCleaningListing() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-pink-50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Event <span className="text-purple-600">Cleaning</span> Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Professional cleaning solutions for events of all sizes, ensuring a pristine environment from start to finish
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {eventCleaningServices.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-2xl ${service.color} p-8 transition-all hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-white shadow-sm">
                  <service.icon className="h-8 w-8 text-purple-500" aria-hidden="true" />
                </div>
                <h2 className="ml-4 text-2xl font-semibold text-gray-900">{service.title}</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">{service.description}</p>
              <Link
                to={`/event-services/${service.id}`}
                className="inline-flex items-center text-lg font-medium text-purple-600 hover:text-purple-500 transition-colors"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn more
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white hover:bg-purple-500 transition-colors shadow-md hover:shadow-lg"
          >
            Request a Quote
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCleaningListing;