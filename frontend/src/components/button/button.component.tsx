import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [key: string]: unknown;
}

export const Button = ({ children, onClick, ...otherProps }: ButtonProps) => {
  return (
    <button className="button-container" onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};
