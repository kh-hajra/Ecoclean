import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, MapPin, DollarSign, User, Package, Loader2 } from 'lucide-react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/api/bookings/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      'Pending': 'bg-yellow-500 text-white',
      'Confirmed': 'bg-green-500 text-white',
      'Completed': 'bg-blue-500 text-white',
      'Cancelled': 'bg-red-500 text-white'
    };
    return statusColors[status] || 'bg-gray-500 text-white';
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <div className="mt-4 text-lg font-medium text-gray-600">Loading your bookings...</div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-lg font-medium text-red-600 bg-red-50 px-6 py-4 rounded-lg shadow">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Bookings</h1>
          <Badge className="bg-blue-100 text-blue-800 text-sm px-4 py-1">
            Total Bookings: {bookings.length}
          </Badge>
        </div>
        
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card key={booking._id} className="transform transition-all duration-200 hover:shadow-lg">
              <CardHeader className="bg-white border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-blue-500" />
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {booking.service}
                    </CardTitle>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} px-4 py-1.5 text-sm font-medium rounded-full`}>
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Service Details */}
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Service Details</h3>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Package className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{booking.package.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <User className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{booking.cleaner.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <span className="font-medium">${booking.totalPrice}</span>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">{booking.duration} hours</span>
                    </div>
                  </div>

                  {/* Location and Payment */}
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Location & Payment</h3>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <span className="font-medium">{booking.location.address}</span>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Badge className="bg-purple-100 text-purple-800 mr-2">
                        {booking.paymentMethod}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {bookings.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">No bookings found</h3>
              <p className="mt-2 text-gray-600">You haven't made any bookings yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;