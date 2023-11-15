'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useCallback } from 'react';
import { type IconType } from 'react-icons';

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  selected = false,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    if (label === 'All') {
      router.push('/');
    } else {
      let currentQuery = {};
      if (params != null) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: '/',
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );
      router.push(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer items-center justify-center gap-1
  border-b-2 p-2 text-center transition hover:text-slate-800
  ${
    selected
      ? 'border-b-slate-800 text-slate-800'
      : 'border-transparent text-slate-500'
  }`}
    >
      <Icon size={20} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  );
};

export default Category;
