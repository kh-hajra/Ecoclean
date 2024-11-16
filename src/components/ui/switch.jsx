import React from 'react';
import PropTypes from 'prop-types';

export const Switch = ({ id, checked, onCheckedChange, className, ...props }) => (
  <div className={`relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in ${className}`}>
    {/* Input */}
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="absolute w-0 h-0 opacity-0 peer"
      {...props}
    />
    {/* Label (Background) */}
    <label
      htmlFor={id}
      className={`block w-10 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors peer-checked:bg-blue-500`}
    ></label>
    {/* Circle */}
    <span
      className={`absolute left-0 top-0 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-4`}
    ></span>
  </div>
);

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Switch.defaultProps = {
  className: '',
};

export default Switch;
