'use client';

import { type IconType } from 'react-icons';

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected = false,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        onClick(label);
      }}
      className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2
  p-4 transition hover:border-slate-500
  ${selected ? 'border-slate-500' : 'border-slate-200'}`}
    >
      <Icon size={30} />
      <div className='font-medium'>{label}</div>
    </div>
  );
};

export default CategoryInput;
