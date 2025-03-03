import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function BackButton({ to }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // console.log('Back button clicked');
    // console.log('Current location:', location.pathname);
    // console.log('Destination:', to);
    
    try {
      if (to) {
        console.log('Navigating to specified route:', to);
        navigate(to);
      } else {
        console.log('Navigating back in history');
        navigate(-1);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition z-50"
      aria-label="Go back"
      type="button"
    >
      <ArrowLeft className="h-6 w-6 text-gray-700" aria-hidden="true" />
    </button>
  );
}

export default BackButton;