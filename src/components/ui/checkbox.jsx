import React from 'react';

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = 'Checkbox';
