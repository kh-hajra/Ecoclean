import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Select = ({ children, value, onValueChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onValueChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen,
          setIsOpen,
          value,
          onValueChange: handleSelect,
        })
      )}
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Select.defaultProps = {
  className: '',
};

export const SelectTrigger = ({ children, isOpen, setIsOpen, className }) => (
  <button
    type="button"
    className={`w-full px-4 py-2 text-left border rounded-md bg-white focus:outline-none ${className}`}
    onClick={() => setIsOpen((prev) => !prev)}
  >
    {children}
    <span className="absolute right-3 top-1/2 -translate-y-1/2">
      {isOpen ? '▲' : '▼'}
    </span>
  </button>
);

SelectTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SelectTrigger.defaultProps = {
  className: '',
};

export const SelectContent = ({ children, isOpen, className }) => (
  <div
    className={`absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg ${
      isOpen ? '' : 'hidden'
    } ${className}`}
  >
    {children}
  </div>
);

SelectContent.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

SelectContent.defaultProps = {
  className: '',
};

export const SelectItem = ({ children, value, onValueChange, className }) => (
  <div
    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${className}`}
    onClick={() => onValueChange(value)}
  >
    {children}
  </div>
);

SelectItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SelectItem.defaultProps = {
  className: '',
};

export const SelectValue = ({ value, placeholder, className }) => (
  <span className={`block ${className}`}>{value || placeholder}</span>
);

SelectValue.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

SelectValue.defaultProps = {
  value: '',
  placeholder: 'Select...',
  className: '',
};
