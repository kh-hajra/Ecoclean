import React from 'react';
import { Calendar, MapPin, MapPinIcon, CheckCircle, ArrowRight } from 'lucide-react';

const BookingForm = ({
  bookingDetails,
  setBookingDetails,
  handleSearchCleaners,
  gettingCurrentLocation,
  locationSuggestions,
  handleLocationInput,
  handleSelectLocation,
  getCurrentLocation,
  services,
}) => {
  console.log('Location suggestions in BookingForm:', locationSuggestions);
  const today = new Date().toISOString().split('T')[0];
  // Handle duration input change
  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setBookingDetails({ ...bookingDetails, duration: value });
    } else {
      setBookingDetails({ ...bookingDetails, duration: 1 }); // Set to 1 if value is less than 1
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Book Your Cleaning Service</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Date & Time Selection */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold">Select Date & Time</h3>
              </div>
              <div className="space-y-4">
                <input
                  type="date"
                  value={bookingDetails.date}
                  min={today}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="time"
                  value={bookingDetails.time}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Duration (in hours)"
                  value={bookingDetails.duration}
                  onChange={handleDurationChange}
                  min="1"
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 relative">
          <div className="flex items-center gap-2 mb-4">
            <MapPinIcon className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold">Select Location</h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a street, area, or landmark..."
              value={bookingDetails.location}
              onChange={handleLocationInput}
              className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500 pr-10"
            />
            <button
              onClick={getCurrentLocation}
              disabled={gettingCurrentLocation}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <MapPin className="w-5 h-5 text-gray-400 hover:text-indigo-600" />
            </button>
          </div>
          {console.log('Rendering suggestions, length:', locationSuggestions?.length)}
          {/* Updated Location Suggestions Display */}
          {locationSuggestions?.length > 0 && (
  <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 max-h-72 overflow-y-auto">
    {locationSuggestions.map((suggestion, index) => (
      <div
        key={index}
        onClick={() => handleSelectLocation(suggestion)}
        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
      >
        <div className="flex items-start">
          <MapPin className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-medium text-sm flex items-center gap-2">
              {suggestion.main_text}
              {suggestion.type && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {suggestion.type}
                </span>
              )}
            </div>
            {suggestion.secondary_text && (
              <div className="text-xs text-gray-500 mt-0.5">
                {suggestion.secondary_text}
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)}
        </div>
          </div>

          {/* Services List */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSearchCleaners}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Look for Cleaners
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;