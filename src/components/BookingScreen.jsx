import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Download } from 'lucide-react';
import { Card } from '../components/ui/card';
import  Button  from '../components/ui/button';
import { toast } from 'react-toastify';

const BookingSuccessPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const bookingId = localStorage.getItem('completedBookingId');
      
      if (!bookingId) {
        toast.error('Booking information not found');
        navigate('/services');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const data = await response.json();
        setBookingDetails(data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        toast.error('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">No booking information found</p>
          <Button
            onClick={() => navigate('/services')}
            className="mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Return to Services
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(bookingDetails.date).toLocaleDateString();
  const startTime = bookingDetails.time;
  const duration = bookingDetails.duration || 3;
  
  // Calculate end time
  const [hours, minutes] = startTime.split(':');
  const startDate = new Date();
  startDate.setHours(parseInt(hours), parseInt(minutes));
  const endDate = new Date(startDate.getTime() + duration * 60 * 60 * 1000);
  const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">Your booking has been successfully confirmed.</p>
        </div>

        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Service Details */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="text-lg font-medium text-gray-900">{bookingDetails.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Package</p>
                  <p className="text-lg font-medium text-gray-900">{bookingDetails.package.name}</p>
                </div>
              </div>
            </div>

            {/* Schedule Details */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-lg font-medium text-gray-900">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-lg font-medium text-gray-900">
                      {startTime} - {endTime} ({duration} hours)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-medium text-gray-900">{bookingDetails.location.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ${bookingDetails.totalPrice}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {bookingDetails.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={() => {/* Add download functionality */}}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingSuccessPage;