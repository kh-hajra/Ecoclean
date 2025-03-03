import React, { useState, useEffect } from 'react';
import { 
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Loader2, CreditCard, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/card';
import Button from '../components/ui/button';

const PaymentForm = ({ bookingId, totalPrice, onPaymentComplete, isPaymentConfirmed, bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  const customStripeStyles = {
    base: {
      fontSize: '16px',
      color: '#374151',
      fontFamily: 'system-ui, sans-serif',
      '::placeholder': {
        color: '#9CA3AF',
      },
      padding: '12px',
    },
    invalid: {
      color: '#EF4444',
      iconColor: '#EF4444',
    },
  };
  
  useEffect(() => {
    if (isPaymentConfirmed && bookingData?._id) {
      // Redirect to feedback page after 3 seconds
      const timer = setTimeout(() => {
        navigate(`/feedback/${bookingData._id}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPaymentConfirmed, navigate, bookingData]);
  
  const handleCancel = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(postalCode) && !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode)) {
      errors.postalCode = 'Please enter a valid postal code';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!validateForm()) {
      return;
    }
    
    if (!stripe || !elements) {
      toast.error('Stripe has not been properly initialized');
      return;
    }
  
    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem('userToken');
      // Use the prop value first, then fallback to localStorage
      const paymentBookingId = bookingId || localStorage.getItem('bookingId');
  
      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }
      
      if (!paymentBookingId) {
        throw new Error("No booking ID found. Please try booking again.");
      }
      
      console.log(`Processing payment for booking ID: ${paymentBookingId}`);
  
      // Create payment intent
      const response = await fetch('http://localhost:8080/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          bookingId: paymentBookingId, 
          postalCode,
          amount: totalPrice // Add amount to ensure correct pricing
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Payment intent error:', response.status, errorData);
        throw new Error(errorData.message || `Payment initialization failed (${response.status})`);
      }
  
      const { clientSecret } = await response.json();
      console.log('Payment intent created successfully');
  
      // Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { 
            address: { postal_code: postalCode },
          },
        },
      });
  
      if (error) {
        console.error('Stripe error:', error);
        throw error;
      }
  
      if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent.id);
        
        // Update payment status in backend
        const updateResponse = await fetch('http://localhost:8080/api/payments/update-payment-status', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            bookingId: paymentBookingId, 
            paymentIntentId: paymentIntent.id 
          }),
        });
        
        if (!updateResponse.ok) {
          console.warn('Payment status update warning:', updateResponse.status);
          // Continue even if this fails, as payment was successful
        }
  
        // Fetch updated booking details
        const bookingResponse = await fetch(`http://localhost:8080/api/bookings/${paymentBookingId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        
        if (!bookingResponse.ok) {
          console.warn('Booking fetch warning:', bookingResponse.status);
          // Continue with basic success even if this fails
        } else {
          const bookingData = await bookingResponse.json();
          setSuccessBooking(bookingData);
        }
  
        toast.success('Payment successful!');
        setShowSuccess(true);
        
        if (onPaymentComplete) {
          onPaymentComplete(paymentBookingId);
        }
      } else {
        throw new Error(`Payment not completed. Status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      
      // Show more helpful error messages based on common Stripe errors
      if (error.type === 'card_error') {
        toast.error(`Card error: ${error.message}`);
      } else if (error.type === 'validation_error') {
        toast.error(`Validation error: ${error.message}`);
      } else {
        toast.error(error.message || 'Payment failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleViewBookings = () => {
    navigate('/bookings');
  };

  const handleClose = () => {
    setShowSuccess(false);
    if (onPaymentComplete) {
      onPaymentComplete(bookingId);
    }
      
      navigate('/');
    
  
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Card Number
          </Label>
          <div className="p-3 border rounded-lg bg-white">
            <CardNumberElement options={{ style: customStripeStyles }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Expiration Date
            </Label>
            <div className="p-3 border rounded-lg bg-white">
              <CardExpiryElement options={{ style: customStripeStyles }} />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              CVC
            </Label>
            <div className="p-3 border rounded-lg bg-white">
              <CardCvcElement options={{ style: customStripeStyles }} />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            ZIP/Postal Code
          </Label>
          <Input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter ZIP code"
            className="w-full p-3 rounded-lg"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-6 py-3 bg-[#6D28D9] hover:bg-[#5b21b6] text-white rounded-lg transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2 w-5 h-5" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Pay ${totalPrice}
            </span>
          )}
        </button>
        
      </div>
    </form>
     {showSuccess && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            {/* Success Animation and Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
              <p className="text-gray-600 mt-2">Your booking has been confirmed</p>
            </div>

            {/* Booking Details */}
            {successBooking && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>
                    {new Date(successBooking.date).toLocaleDateString()} at{' '}
                    {new Date(`1970-01-01T${successBooking.time}`).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{successBooking.location.address}</span>
                </div>
              </div>
            )}

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
  </>
  );
};

export default PaymentForm;