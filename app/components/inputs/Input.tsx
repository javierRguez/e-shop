'use client';

import {
  type UseFormRegister,
  type FieldValues,
  type FieldErrors,
} from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className='relative w-full'>
      <input
        autoComplete='off'
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=''
        type={type}
        className={`
      disabled
      peer
      w-full
      rounded-md
      border-2
      bg-white
      p-4
      pt-6
      font-light
      outline-none
      transition
      disabled:cursor-not-allowed
      disabled:opacity-70
      ${errors[id] != null ? 'border-rose-400' : 'border-slate-300'}
      ${errors[id] != null ? 'focus:border-rose-400' : 'focus:border-slate-300'}
      `}
      />
      <label
        htmlFor={id}
        className={`
        text-md
        absolute
        left-4
        top-5
        z-10
        origin-[0]
        -translate-y-3
        transform
        cursor-text
        duration-150
        peer-placeholder-shown:translate-y-0
        peer-placeholder-shown:scale-100
        peer-focus:-translate-y-4
        peer-focus:scale-75
        ${errors[id] != null ? 'text-rose-500' : 'text-slate-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
