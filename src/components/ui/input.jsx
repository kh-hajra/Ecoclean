import React from 'react';
import PropTypes from 'prop-types';

export const Input = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
      } ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  error: false,
};
