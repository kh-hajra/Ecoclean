import React from 'react';
import BookingScreen from './BookingScreen';

const GarbageBooking = () => {
  return (
    <BookingScreen
      serviceTitle="Garbage Collection"
      defaultLocation="456 Neighborhood Rd, San Francisco, CA 94102"
      addonsOptions={[
        'Trash Can Sanitizing',
        'Recycling Pickup',
        'Large Item Disposal',
        'Yard Waste Collection'
      ]}
    />
  );
};

export default GarbageBooking;
