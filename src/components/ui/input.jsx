import React from 'react';
import PropTypes from 'prop-types';

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-500 px-4 py-2 ${className}`}
    {...props}
  />
));

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
