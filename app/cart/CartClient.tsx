'use client';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Heading from '../components/Heading';
import Button from '../components/Button';
import ItemContent from './ItemContent';

const CartClient = () => {
  const { cartProducts } = useCart();

  if (cartProducts == null || cartProducts.length === 0) {
    return (
      <div className='flex flex-col items-center'>
        <div className='text-2xl'>Your cart is empty</div>
        <div>
          <Link
            href={'/'}
            className='mt-2 flex items-center gap-1 text-slate-500'
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title='Shopping Cart' center />
      <div className='mt-8 grid grid-cols-5 items-center gap-4 pb-2 text-xs'>
        <div className='col-span-2 justify-self-start'>PRODUCT</div>
        <div className='justify-self-center'>PRICE</div>
        <div className='justify-self-center'>QUANTITY</div>
        <div className='justify-self-end'>TOTAL</div>
      </div>
      <div>
        {cartProducts?.map((item) => {
          return <ItemContent key={item.id} item={item} />;
        })}
      </div>
      <div className='flex justify-between gap-4 border-t-[1.5px] border-slate-200 py-4'>
        <div className='w-[90px]'>
          <Button label='Clear Cart' onClick={() => {}} small outline />
        </div>
        <div className='flex flex-col items-start gap-1 text-sm'>
          <div className='flex w-full justify-between text-base font-semibold'>
            <span>Subtotal</span>
            <span>$1,000</span>
          </div>
          <p className='text-slate-500'>
            Taxes and shipping calculate at sheckout
          </p>
          <Button label='Checkout' onClick={() => {}} />
          <Link
            href={'/'}
            className='mt-2 flex items-center gap-1 text-slate-500'
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
