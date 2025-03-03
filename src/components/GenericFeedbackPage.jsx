import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackSubmission from '../components/FeedbackSubmission';
import axios from 'axios';
import { toast } from 'react-toastify';

const GenericFeedbackPage = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userId');
        
        if (!token || !userId) {
          toast.error('Please log in to submit feedback');
          navigate('/login');
          return;
        }

        // Fetch user's all bookings using the existing endpoint
        const response = await axios.get(
          `http://localhost:8080/api/bookings/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Filter to only show completed bookings
        const completedBookings = response.data.filter(booking => 
          booking.status === 'Completed'
        );
        
        setRecentBookings(completedBookings || []);
      } catch (error) {
        console.error('Error fetching recent bookings:', error);
        toast.error('Could not load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBookings();
  }, [navigate]);

  const handleFeedbackSuccess = () => {
    toast.success('Feedback submitted successfully!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D28D9] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Share Your Experience</h1>
        
        {recentBookings.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Completed Bookings</h2>
            <p className="text-gray-600 mb-4">Select a booking to leave specific feedback:</p>
            
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div 
                  key={booking._id} 
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#6D28D9] cursor-pointer transition-colors"
                  onClick={() => navigate(`/feedback/${booking._id}`)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{booking.service}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {booking.location?.address || 'Address not specified'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">No Completed Bookings</h2>
            <p className="text-gray-600">You don't have any completed bookings to provide feedback for. Feedback can only be submitted for completed services.</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">General Feedback</h2>
          <p className="text-gray-600 mb-4">Share your overall experience with our services:</p>
          
          <FeedbackSubmission 
            onSuccess={handleFeedbackSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default GenericFeedbackPage;