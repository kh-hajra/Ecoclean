import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedbackSubmission from '../components/FeedbackSubmission';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';

const FeedbackPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          toast.error('Please log in to submit feedback');
          navigate('/login');
          return;
        }

        if (!bookingId) {
          setError('No booking ID provided');
          setLoading(false);
          return;
        }

        // Try to fetch booking details
        try {
          const response = await axios.get(`http://localhost:8080/api/bookings/details/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          setBookingData(response.data);
        } catch (err) {
          console.warn('Error fetching booking details:', err.message);
          setError('Could not find booking details. The booking may have been deleted.');
          setLoading(false);
          return;
        }
        
        // Check if feedback already submitted for this booking
        try {
          const feedbackCheck = await axios.get(`http://localhost:8080/api/feedback/booking/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (feedbackCheck.data.exists) {
            setSubmitted(true);
            toast.info('You have already submitted feedback for this booking');
          }
        } catch (err) {
          console.warn('Error checking existing feedback:', err.message);
          // Continue even if check fails
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in feedback page initialization:', error);
        setError('Failed to initialize feedback page. Please try again.');
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, navigate]);

  const handleFeedbackSuccess = () => {
    setSubmitted(true);
    toast.success('Feedback submitted successfully!');
    // Redirect after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D28D9] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-[#6D28D9] text-white rounded-lg hover:bg-[#5b21b6] transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">Your feedback has been submitted successfully.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-[#6D28D9] text-white rounded-lg hover:bg-[#5b21b6] transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Share Your Experience</h1>
        
        {bookingData ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600"><span className="font-medium">Service:</span> {bookingData.service}</p>
                <p className="text-gray-600"><span className="font-medium">Date:</span> {new Date(bookingData.date).toLocaleDateString()}</p>
                <p className="text-gray-600"><span className="font-medium">Time:</span> {bookingData.time}</p>
              </div>
              <div>
                <p className="text-gray-600"><span className="font-medium">Package:</span> {bookingData.packageDetails?.name || 'Standard'}</p>
                <p className="text-gray-600"><span className="font-medium">Location:</span> {bookingData.location?.address || 'Not specified'}</p>
                <p className="text-gray-600"><span className="font-medium">Duration:</span> {bookingData.duration || 1} hours</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Booking Not Found</h2>
            <p className="text-gray-600">We couldn't find details for this booking. You can still submit general feedback below.</p>
          </div>
        )}
        
        <FeedbackSubmission 
          bookingId={bookingId}
          cleanerId={bookingData?.cleanerId || null}
          serviceId={bookingData?.serviceId || null}
          onSuccess={handleFeedbackSuccess}
        />
      </div>
    </div>
  );
};

export default FeedbackPage;