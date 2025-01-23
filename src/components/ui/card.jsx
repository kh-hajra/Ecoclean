// import React from 'react';
// import PropTypes from 'prop-types';

// export function Card({ children, className, ...props }) {
//   return (
//     <div
//       className={`bg-white shadow-lg rounded-lg p-4 ${className}`}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// export function CardContent({ children, className, ...props }) {
//   return (
//     <div className={`p-4 ${className}`} {...props}>
//       {children}
//     </div>
//   );
// }

// Card.propTypes = {
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
// };

// CardContent.propTypes = {
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
// };

// components/ui/card.jsx
import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }