import React from 'react';
import BookingScreen from './BookingScreen';

const PostEventBooking = () => {
  const serviceDetails = {
    title: 'Post-Event Cleaning',
    addons: [
      { label: 'Floor cleaning', key: 'floorCleaning' },
      { label: 'Trash removal', key: 'trashRemoval' },
      { label: 'Window cleaning', key: 'windowCleaning' },
      { label: 'Disinfection', key: 'disinfection' },
    ],
    recurring: 'One-time service',
  };

  return <BookingScreen {...serviceDetails} />;
};

export default PostEventBooking;
