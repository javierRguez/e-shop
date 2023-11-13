'use client';

import { type FieldValues, type UseFormRegister } from 'react-hook-form';

interface CustomCheckBoxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  id,
  label,
  register,
  disabled,
}) => {
  return (
    <div className='flex w-full flex-row items-center gap-2'>
      <input
        type='checkbox'
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=''
        className='cursor-pointer'
      />
      <label htmlFor={id} className='cursor-pointer font-medium'>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckBox;
