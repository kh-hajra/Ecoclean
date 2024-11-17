import React, { useState } from 'react';
import { Star, Edit2, Plus, X, Calendar, Clock, MapPin, Award, ArrowLeft } from 'lucide-react';

const CleanerProfile = () => {
  const [availabilities, setAvailabilities] = useState([
    { id: 1, day: 'Monday', start: '09:00', end: '17:00' },
    { id: 2, day: 'Wednesday', start: '10:00', end: '18:00' },
  ]);
  const [newAvailability, setNewAvailability] = useState({ day: 'Monday', start: '', end: '' });

  const addAvailability = () => {
    if (newAvailability.start && newAvailability.end) {
      setAvailabilities([...availabilities, { ...newAvailability, id: Date.now() }]);
      setNewAvailability({ day: 'Monday', start: '', end: '' });
    }
  };

  const removeAvailability = (id) => {
    setAvailabilities(availabilities.filter(a => a.id !== id));
  };

  const reviews = [
    { id: 1, name: 'John Doe', rating: 4.5, comment: 'Great service, very thorough!', date: '2023-05-15' },
    { id: 2, name: 'Jane Smith', rating: 5, comment: 'Excellent work, highly recommended!', date: '2023-05-10' },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button className="text-green-600 hover:text-green-700 transition-colors flex items-center" aria-label="Go back">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button className="text-green-600 hover:text-green-700 transition-colors" aria-label="Edit profile">
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center mb-8">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Sarah Johnson"
                className="w-32 h-32 rounded-full border-4 border-green-100 shadow-lg mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Sarah Johnson</h1>
                <p className="text-gray-600 mb-2">Experienced eco-friendly cleaner</p>
                <div className="flex items-center justify-center sm:justify-start mb-2">
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-600">San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600">4.8 out of 5 (24 reviews)</span>
                </div>
              </div>
            </div>

            <section className="mb-8" aria-labelledby="expertise-heading">
              <h2 id="expertise-heading" className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="w-6 h-6 text-green-600 mr-2" />
                Expertise
              </h2>
              <ul className="flex flex-wrap gap-4">
                <li className="bg-green-100 rounded-full px-4 py-2 text-green-800">Eco-friendly cleaning</li>
                <li className="bg-blue-100 rounded-full px-4 py-2 text-blue-800">Deep cleaning</li>
                <li className="bg-yellow-100 rounded-full px-4 py-2 text-yellow-800">Organizing</li>
                <li className="bg-purple-100 rounded-full px-4 py-2 text-purple-800">Pet-friendly</li>
              </ul>
            </section>

            <section className="mb-8" aria-labelledby="availability-heading">
              <h2 id="availability-heading" className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-6 h-6 text-green-600 mr-2" />
                Availability
              </h2>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex flex-wrap gap-4 mb-4">
                  <select
                    className="bg-white border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newAvailability.day}
                    onChange={(e) => setNewAvailability({ ...newAvailability, day: e.target.value })}
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <input
                    type="time"
                    className="bg-white border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newAvailability.start}
                    onChange={(e) => setNewAvailability({ ...newAvailability, start: e.target.value })}
                  />
                  <input
                    type="time"
                    className="bg-white border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newAvailability.end}
                    onChange={(e) => setNewAvailability({ ...newAvailability, end: e.target.value })}
                  />
                  <button
                    onClick={addAvailability}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-1" /> Add
                  </button>
                </div>
                <ul className="space-y-2">
                  {availabilities.map((availability) => (
                    <li key={availability.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-green-600 mr-2" />
                        <span>{availability.day}</span>
                        <Clock className="w-5 h-5 text-green-600 mx-2" />
                        <span>{availability.start} - {availability.end}</span>
                      </div>
                      <button
                        onClick={() => removeAvailability(availability.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                        aria-label={`Remove availability for ${availability.day}`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="reviews-heading">
              <h2 id="reviews-heading" className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                Reviews
              </h2>
              <ul className="space-y-6">
                {reviews.map((review) => (
                  <li key={review.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">{review.name}</span>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CleanerProfile;

