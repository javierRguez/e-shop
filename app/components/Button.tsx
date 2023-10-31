'use client';

import { type IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  outline = false,
  small = false,
  custom = '',
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-md border-slate-700 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 
      ${outline ? 'bg-white' : 'bg-slate-700'} 
      ${outline ? 'text-slate-700' : 'text-white'}
      ${small ? 'text-sm font-light' : 'text-md font-semibold'}
      ${small ? 'border-[1px] px-2 py-1' : 'border-2 px-4 py-3'}
      ${custom}
      `}
    >
      {Icon != null && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
