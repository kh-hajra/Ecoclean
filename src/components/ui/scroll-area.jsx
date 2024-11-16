import React from 'react';
import PropTypes from 'prop-types';

export function ScrollArea({ children, className, ...props }) {
  return (
    <div
      className={`overflow-auto whitespace-nowrap ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ScrollBar({ orientation = 'horizontal', className, ...props }) {
  const orientationClass = orientation === 'horizontal' ? 'w-full h-2' : 'h-full w-2';
  return (
    <div
      className={`bg-gray-300 rounded ${orientationClass} ${className}`}
      {...props}
    ></div>
  );
}

ScrollArea.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ScrollBar.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
};
