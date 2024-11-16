import React from 'react';
import BookingScreen from './BookingScreen';

const MoveinMoveoutBooking = () => {
  return (
    <BookingScreen
      serviceTitle="MoveinMoveout Cleaning"
      defaultLocation="123 Main St, San Francisco, CA 94102"
      addonsOptions={[
        'Oven Cleaning',
        'Refrigerator Cleaning',
        'Cabinet Wipe-down',
        'Countertop Sanitizing'
      ]}
    />
  );
};

export default MoveinMoveoutBooking;
