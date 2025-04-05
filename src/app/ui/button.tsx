
'use client';
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, color = '#082e21', children }) => {
  return (
    <button
      className={`bg-[${color}] text-white px-8 py-3 mt-2 rounded-full`}
      onClick={onClick}
    >
      {children || label}
    </button>
  );
};

export default Button;
