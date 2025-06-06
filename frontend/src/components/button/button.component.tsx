import React from 'react';

import './button.styles.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  [key: string]: unknown;
}

export const Button = ({
  children,
  onClick,
  className,
  ...otherProps
}: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};
