import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, onClick, variant = 'default', size = 'medium', ...props }) {
  const baseStyle = 'rounded-lg font-medium focus:outline-none transition-all';
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-100',
  };

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'outline', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Button;
