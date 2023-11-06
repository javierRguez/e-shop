'use client';

import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { type SafeUser } from '@/types';

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' },
  });
  const router = useRouter();

  useEffect(() => {
    if (currentUser != null) {
      router.push('/cart');
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);
        if (callback?.ok != null) {
          router.push('/cart');
          router.refresh();
          toast.success('Logged In');
        }

        if (callback?.error != null) {
          toast.error(callback.error);
        }
      })
      .catch(() => toast.error('Something went wrong'));
  };

  if (currentUser != null) {
    return <p className='text-center'>Logged in. Redirecting...</p>;
  }

  return (
    <>
      <Heading title='Sign in to E-Shop' />
      <Button
        outline
        label='Continue with Google'
        icon={AiOutlineGoogle}
        onClick={() => {
          void signIn('google');
        }}
      />
      <hr className='h-px w-full bg-slate-300' />
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
        label={isLoading ? 'Loading' : 'Login'}
        onClick={handleSubmit(onSubmit)}
      />
      <p className='text-sm'>
        Do not have an account?{' '}
        <Link className='underline' href='/register'>
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
