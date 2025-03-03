import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  Users,
  FileText,
  Calendar as CalendarIcon
} from 'lucide-react';

const UserDashboard = () => {
  console.log('UserDashboard component rendered');
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Fetching user data...'); 
    const fetchUserData = async () => {
      try {
        
        const token = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');
             
        console.log('Token:', token);
        console.log('User ID:', userId);
        console.log('User Role:', userRole);
        // Check if the user is logged in and has the correct role
        if (!token || !userId || userRole !== 'user') {
          toast.error('Please log in to view dashboard');
          navigate('/login');
          return;
        }
        
        // Fetch user's bookings
        const bookingsResponse = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setBookings(bookingsResponse.data || []);
        
        // Fetch user's submitted feedbacks
        const feedbacksResponse = await axios.get(`http://localhost:8080/api/feedback/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Feedback response:', feedbacksResponse.data);
        setFeedbacks(feedbacksResponse.data.feedbacks || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard information');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);
  // In your UserDashboard.jsx, add a cancelBooking function:
const cancelBooking = async (bookingId) => {
  if (window.confirm('Are you sure you want to cancel this booking?')) {
    try {
      const token = localStorage.getItem('userToken');
      
      const response = await axios.post(
        `http://localhost:8080/api/bookings/cancel/${bookingId}`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        toast.success('Booking cancelled successfully');
        
        // Update the bookings state locally
        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'Cancelled' } 
            : booking
        ));
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  }
};
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D28D9] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your bookings and feedback</p>
        
        {/* Dashboard Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'bookings'
                ? 'text-[#6D28D9] border-b-2 border-[#6D28D9]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'feedback'
                ? 'text-[#6D28D9] border-b-2 border-[#6D28D9]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('feedback')}
          >
            My Feedback
          </button>
        </div>
        
        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Bookings</h2>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-[#6D28D9] text-white rounded-lg hover:bg-[#5b21b6] transition-colors"
              >
                Book New Service
              </button>
            </div>
            
            {bookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-[#6D28D9] text-white rounded-lg hover:bg-[#5b21b6] transition-colors"
                >
                  Book a Service
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-[#6D28D9] bg-opacity-10 px-4 py-3 border-l-4 border-[#6D28D9]">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{booking.service}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : booking.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-700">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                          <p className="text-xs text-gray-500">
                            Duration: {booking.duration || 1} hours
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          {booking.location?.address || 'Address not specified'}
                        </p>
                      </div>
                      
                      {booking.cleanerName && (
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                          <p className="text-sm text-gray-700">
                            Assigned to: {booking.cleanerName}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          {booking.notes || 'No special instructions'}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                        <span className="font-medium">
                          {booking.price !== undefined ? `$${booking.price.toFixed(2)}` : 'Price not available'}
                        </span>
                        
                        <div className="space-x-2">
                          {booking.status === 'Confirmed' && new Date(booking.date) > new Date() && (
                            <button 
                              onClick={() => navigate(`/booking/reschedule/${booking._id}`)}
                              className="text-sm text-[#6D28D9] hover:underline"
                            >
                              Reschedule
                            </button>
                          )}
                          
                          {booking.status !== 'Cancelled' && new Date(booking.date) > new Date() && (
  <button 
    onClick={() => cancelBooking(booking._id)}
    className="text-sm text-red-600 hover:underline"
  >
    Cancel
  </button>
)}
                          
                          {booking.status === 'Completed' && (
                            <button 
                              onClick={() => navigate(`/feedback/${booking._id}`)}
                              className="text-sm text-[#6D28D9] hover:underline"
                            >
                              Leave Feedback
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">My Submitted Feedback</h2>
            
            {feedbacks.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No feedback submitted</h3>
                <p className="text-gray-600 mb-6">You haven't submitted any feedback for your bookings yet.</p>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="px-6 py-2 bg-[#6D28D9] text-white rounded-lg hover:bg-[#5b21b6] transition-colors"
                >
                  View My Bookings
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedbacks.map((feedback) => (
                  <div key={feedback._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{feedback.serviceType || 'Service'}</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-5 w-5 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{feedback.comment}</p>
                      
                      <div className="flex items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Submitted on {new Date(feedback.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;