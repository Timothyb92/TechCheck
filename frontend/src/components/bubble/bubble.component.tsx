import React from 'react';

interface BubbleProps {
  children: React.ReactNode;
}

export const Bubble = ({ children }: BubbleProps) => {
  return (
    <>
      <div className="bubble">
        <p>{children}</p>
      </div>
    </>
  );
};
