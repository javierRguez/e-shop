'use client';

import { useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <>
      <Heading title='Sign up for E-Shop' />
      <Button
        outline
        label='Sign up with Google'
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className='h-px w-full bg-slate-300' />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        type='password'
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? 'Loading' : 'Sign Up'}
        onClick={handleSubmit(onSubmit)}
      />
      <p className='text-sm'>
        Already have an account?{' '}
        <Link className='underline' href='/login'>
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
