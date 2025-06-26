import React from 'react';
import clsx from 'clsx';

import './button.styles.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?:
    | 'join'
    | 'cancel'
    | 'accept'
    | 'decline'
    | 'complete'
    | 'disabled'
    | string;
  [key: string]: unknown;
}

const variantMap: Record<NonNullable<ButtonProps['variant']>, string> = {
  join: 'bg-[#46c34c] text-[#111] border border-[#33ff77] hover:shadow-[inset_0_1px_0_#7eff00,0_0_8px_#7eff00,0_0_16px_#7eff00]',
  cancel:
    'bg-[#e20000] border border-[#ff4d6d] hover:shadow-[inset_0_1px_0_#ff5b5b,0_0_8px_#ff5b5b,0_0_16px_#ff5b5b]',
  accept:
    'bg-[#339999] border border-[#33ccff] hover:shadow-[inset_0_1px_0_#33cc99,0_0_8px_#33cc99,0_0_16px_#33cc99]',
  decline:
    'bg-[#ff9d44] border border-[#ff9933] hover:shadow-[inset_0_1px_0_#ffb36e,0_0_8px_#ffb36e,0_0_16px_#ffb36e]',
  complete:
    'bg-[#9518e0] border border-[#cc66ff] hover:shadow-[inset_0_1px_0_#a117f4,0_0_8px_#a117f4,0_0_16px_#a117f4]',
  disabled:
    'bg-[#2d5f2f] text-[#ccc] border border-[#3a6d3d] cursor-not-allowed',
};

export const Button = ({
  children,
  onClick,
  className,
  variant,
  ...otherProps
}: ButtonProps) => {
  const variantClasses = variant ? variantMap[variant] : '';

  return (
    <button
      onClick={onClick}
      className={clsx('neon-button', className, variantClasses)}
      {...otherProps}
    >
      {children}
    </button>
  );
};
