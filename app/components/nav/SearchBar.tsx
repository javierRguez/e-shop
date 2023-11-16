'use client';

import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { type FieldValues, useForm, type SubmitHandler } from 'react-hook-form';

const SearchBar = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.searchTerm == null || data.searchTerm.length <= 0) {
      router.push('/');
      return;
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <div className='flex items-center'>
      <input
        {...register('searchTerm')}
        autoComplete='off'
        type='text'
        placeholder='Explore E-Shop'
        className='w-80 rounded-l-md border border-gray-300 p-2
    focus:border-[0.5px] focus:border-slate-500 focus:outline-none'
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className='rounded-r-md bg-slate-700 p-2 text-white hover:opacity-80'
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
