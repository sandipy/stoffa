import React from 'react';

interface BasketCartIconProps {
  className?: string;
  size?: number;
}

export const BasketCartIcon: React.FC<BasketCartIconProps> = ({
  className = 'w-5 h-5',
  size = 20,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top vertical center handle */}
      <line x1="12" y1="4" x2="12" y2="9.5" />
      {/* Basket trapezoid */}
      <polygon points="4.5 9.5, 19.5 9.5, 16.8 18.5, 7.2 18.5" />
    </svg>
  );
};
