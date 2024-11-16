import React from 'react';
import PropTypes from 'prop-types';

export function Avatar({ className, children, ...props }) {
  return (
    <div
      className={`inline-block rounded-full overflow-hidden bg-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, className, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ children, className, ...props }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gray-400 text-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

AvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

AvatarFallback.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
