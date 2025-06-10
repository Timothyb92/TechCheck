import React from 'react';

interface BubbleProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

export const Bubble = ({ children, ...otherProps }: BubbleProps) => {
  return <span {...otherProps}>{children}</span>;
};
