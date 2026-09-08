import React from 'react';

interface SeashellLogoProps {
  className?: string;
  size?: number;
}

export const SeashellLogo: React.FC<SeashellLogoProps> = ({ className = 'w-8 h-8', size }) => {
  return (
    <svg
      viewBox="0 0 100 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Accesoire Seashell Logo"
    >
      <defs>
        <linearGradient id="shellGradient" x1="10" y1="10" x2="90" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* Stylized Scallop Seashell Fan */}
      <path
        d="M50 82 C46 80 44 76 43 72 C32 68 18 56 14 44 C10 32 14 18 25 12 C35 6 44 14 50 16 C56 14 65 6 75 12 C86 18 90 32 86 44 C82 56 68 68 57 72 C56 76 54 80 50 82 Z"
        fill="url(#shellGradient)"
        opacity="0.18"
      />
      {/* Scallop Outer Rim */}
      <path
        d="M22 25 C14 36 15 50 25 61 C33 70 42 74 50 78 C58 74 67 70 75 61 C85 50 86 36 78 25 C72 17 63 15 50 18 C37 15 28 17 22 25 Z"
        stroke="#0284C7"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Shell Rib 1 (Center) */}
      <path
        d="M50 18 L50 78"
        stroke="#0284C7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Shell Rib 2 (Left Mid) */}
      <path
        d="M36 21 C41 38 45 58 50 78"
        stroke="#0284C7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Shell Rib 3 (Right Mid) */}
      <path
        d="M64 21 C59 38 55 58 50 78"
        stroke="#0284C7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Shell Rib 4 (Left Outer) */}
      <path
        d="M26 31 C33 46 41 64 50 78"
        stroke="#0284C7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Shell Rib 5 (Right Outer) */}
      <path
        d="M74 31 C67 46 59 64 50 78"
        stroke="#0284C7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Bottom Shell Hinge */}
      <path
        d="M42 78 Q50 83 58 78"
        stroke="#0284C7"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Small accent dot */}
      <circle cx="50" cy="80.5" r="2.5" fill="#0284C7" />
    </svg>
  );
};
