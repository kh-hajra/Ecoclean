import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';
import Button from '../components/ui/button';

const FeedbackSubmission = ({ bookingId, cleanerId, serviceId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        toast.error('Please log in to submit feedback');
        navigate('/login');
        return;
      }
      
      // If no specific cleaner or service ID is provided (general feedback)
      const payload = {
        userId,
        rating,
        comment
      };
      
      // Add booking specific details if available
      if (bookingId) payload.bookingId = bookingId;
      if (cleanerId) payload.cleanerId = cleanerId;
      if (serviceId) payload.serviceId = serviceId;
      
      const response = await axios.post(
        'http://localhost:8080/api/feedback',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onSuccess) {
        onSuccess();
      } else {
        toast.success('Feedback submitted successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      
      // More detailed error message
      const errorMessage = error.response?.data?.message || 'Failed to submit feedback. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Leave Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-2 rounded-full transition-colors ${
                  rating >= star ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-500`}
              >
                <Star className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#6D28D9] hover:bg-[#5b21b6] text-white py-3 rounded-lg transition-colors duration-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </div>
  );
};

export default FeedbackSubmission;