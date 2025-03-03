import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './Payment';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import Button from '../components/ui/button';
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  CalendarDays, 
  Clock, 
  CheckCircle, 
  Calendar, 
  MapPin,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_51QiAhuJryT1TvQzxw2Ayb2MRzIedFYkMm1kMqX18LCq3cxN0jgPuLlIeo16bMBOOH1QrsL2z5RuCX0icOeQynP7600IGUSIcqn');

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const bookingId = localStorage.getItem('bookingId');
      const token = localStorage.getItem('userToken');
      const storedTotalPrice = localStorage.getItem('totalPrice');
    
      if (storedTotalPrice) {
        setTotalPrice(parseFloat(storedTotalPrice));
      }
    
      if (!bookingId || bookingId === 'undefined') {
        console.error('Invalid booking ID:', bookingId);
        toast.error('Booking information not found');
        navigate('/booking');
        return;
      }
    
      if (!token) {
        console.error('Authentication token missing');
        toast.error('Please log in to continue with payment');
        navigate('/login');
        return;
      }
    
      console.log(`Fetching booking details for ID: ${bookingId}`);
    
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/details/${bookingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          const statusCode = response.status;
          let errorMessage = `Failed to fetch booking details (Status: ${statusCode})`;
    
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            // Response wasn't JSON, use the default error message
          }
    
          console.error(`API Error ${statusCode}:`, errorMessage);
          throw new Error(errorMessage);
        }
    
        const data = await response.json();
        console.log("Booking data retrieved:", data);
        setBookingData(data);
        setIsPaymentConfirmed(data.status === 'Confirmed');
    
        if (!storedTotalPrice && data.totalPrice) {
          setTotalPrice(data.totalPrice);
        }
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError(err.message);
        toast.error('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [navigate]);

  useEffect(() => {
    if (isPaymentConfirmed && bookingData?._id) {
      toast.success('Payment confirmed successfully!');
      
      // Redirect to feedback page after 3 seconds
      const timer = setTimeout(() => {
        navigate(`/feedback/${bookingData._id}`);
      }, 3000); // Changed from 80000 to 3000 for better UX
      
      return () => clearTimeout(timer);
    }
  }, [isPaymentConfirmed, navigate, bookingData]);

  // In PaymentPage.js
const handlePaymentComplete = (bookingId) => {
  if (!bookingId) {
    console.error('No booking ID provided to handlePaymentComplete');
    return;
  }
  
  console.log(`Payment completed for booking: ${bookingId}`);
  localStorage.setItem('completedBookingId', bookingId);
  setIsPaymentConfirmed(true);
  navigate(`/feedback/${bookingId}`); // Redirect to feedback page
};

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/');
  };

  const handleCashPayment = async () => {
    if (isPaymentConfirmed) {
      toast.error('Payment already confirmed');
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const bookingId = localStorage.getItem('bookingId');
      
      if (!token) {
        toast.error("Authentication required. Please log in again.");
        navigate('/login');
        return;
      }
      
      if (!bookingId) {
        toast.error("No booking information found. Please try booking again.");
        navigate('/booking');
        return;
      }

      console.log(`Processing cash payment for booking ID: ${bookingId}`);

      // Update booking status for cash payment
      const response = await fetch('http://localhost:8080/api/bookings/update-cash-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update booking status');
      }

      const data = await response.json();
      console.log('Cash payment confirmation response:', data);

      toast.success('Booking confirmed successfully!');
      localStorage.setItem('completedBookingId', bookingId);
      setShowSuccess(true);
      setIsPaymentConfirmed(true);
    } catch (error) {
      console.error('Error confirming booking:', error);
      toast.error(error.message || 'Failed to confirm booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D28D9] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">Error Loading Booking</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => navigate('/booking')}
              className="w-full bg-[#6D28D9] hover:bg-[#5b21b6]"
            >
              Return to Booking
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">Booking Not Found</h2>
          <p className="text-gray-600 text-center mb-6">The booking information could not be found or has expired.</p>
          <Button
            onClick={() => navigate('/booking')}
            className="w-full bg-[#6D28D9] hover:bg-[#5b21b6]"
          >
            Create New Booking
          </Button>
        </div>
      </div>
    );
  }

  // Extract booking details from data
  const {
    service,
    packageDetails,
    location,
    date,
    time,
    duration,
  } = bookingData;

  const packageName = packageDetails?.name || 'Standard Package';
  const address = location?.address || 'Location not specified';
  const formattedDate = new Date(date).toLocaleDateString();
  
  const startTime = time ? new Date(`1970-01-01T${time}`).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  }) : 'Time not specified';
  
  const endTimeDate = time ? 
    new Date(new Date(`1970-01-01T${time}`).getTime() + (duration || 1) * 60 * 60 * 1000) : 
    new Date();
  
  const endTime = endTimeDate.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Booking Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-[#6D28D9]" />
              <h3 className="font-semibold">Booking Details</h3>
            </div>
            <p className="text-gray-600">Service Type: {service || 'Not specified'}</p>
            <p className="text-gray-600">Package: {packageName}</p>
            <p className="text-gray-600">Location: {address}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="w-5 h-5 text-[#6D28D9]" />
              <h3 className="font-semibold">Date & Time</h3>
            </div>
            <p className="text-gray-600">Date: {formattedDate}</p>
            <p className="text-gray-600">Duration: {duration || 1} hours</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-[#6D28D9]" />
              <h3 className="font-semibold">Schedule</h3>
            </div>
            <p className="text-gray-600">Start Time: {startTime}</p>
            <p className="text-gray-600">End Time: {endTime}</p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <button
              onClick={() => setSelectedMethod('card')}
              disabled={isPaymentConfirmed}
              className={`p-6 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                selectedMethod === 'card' 
                ? 'bg-[#6D28D9] bg-opacity-10 border-2 border-[#6D28D9]' 
                : 'border-2 border-gray-200 hover:border-[#6D28D9]'
              } ${isPaymentConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <CreditCard className={`w-6 h-6 ${selectedMethod === 'card' ? 'text-[#6D28D9]' : 'text-gray-500'}`} />
              <span className={`font-medium ${selectedMethod === 'card' ? 'text-[#6D28D9]' : 'text-gray-700'}`}>
                Credit Card
              </span>
            </button>

            <button
              onClick={() => setSelectedMethod('cash')}
              disabled={isPaymentConfirmed}
              className={`p-6 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                selectedMethod === 'cash' 
                ? 'bg-[#6D28D9] bg-opacity-10 border-2 border-[#6D28D9]' 
                : 'border-2 border-gray-200 hover:border-[#6D28D9]'
              } ${isPaymentConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Wallet className={`w-6 h-6 ${selectedMethod === 'cash' ? 'text-[#6D28D9]' : 'text-gray-500'}`} />
              <span className={`font-medium ${selectedMethod === 'cash' ? 'text-[#6D28D9]' : 'text-gray-700'}`}>
                Cash on Service
              </span>
            </button>
          </div>

          {/* Payment Form or Cash Confirmation */}
          {selectedMethod === 'card' ? (
            <Elements stripe={stripePromise}>
              <PaymentForm
                bookingId={bookingData._id}
                totalPrice={totalPrice}
                onPaymentComplete={handlePaymentComplete}
                isPaymentConfirmed={isPaymentConfirmed}
                bookingData={bookingData}
              />
            </Elements>
          ) : (
            <div className="text-center py-8">
              <Button
                onClick={handleCashPayment}
                disabled={isPaymentConfirmed}
                className="px-8 py-3 bg-[#6D28D9] hover:bg-[#5b21b6] text-white rounded-lg transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </Button>
            </div>
          )}

          {/* Total Amount */}
          <div className="border-t mt-8 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-[#6D28D9]">${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Success Animation and Message */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
                <p className="text-gray-600 mt-2">Your booking has been confirmed with cash payment</p>
              </div>

              {/* Booking Details */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>
                    {formattedDate} at {startTime}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{address}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleViewBookings}
                  className="group relative flex-1 overflow-hidden rounded-2xl bg-purple-600 py-4 text-lg font-semibold text-white shadow-[0_4px_0px_0px] shadow-purple-800 active:translate-y-1 active:shadow-[0_2px_0px_0px] active:shadow-purple-800"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="flex items-center justify-center gap-2">
                    View My Bookings
                    <ArrowRight className="w-5 h-5 transform transition-all duration-200 group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;