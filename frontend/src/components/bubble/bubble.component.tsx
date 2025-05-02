import React from 'react';

interface BubbleProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

export const Bubble = ({ children, ...otherProps }: BubbleProps) => {
  return (
    // <>
    //   <div {...otherProps}>
    //     <span>{children}</span>
    //   </div>
    // </>
    <span {...otherProps}>{children}</span>
  );
};
