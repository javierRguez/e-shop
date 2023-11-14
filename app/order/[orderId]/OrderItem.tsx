'use client';

import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import { type CartProductType } from '@prisma/client';
import Image from 'next/image';

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div
      className='border-top-[1.5px] grid grid-cols-5 items-center gap-4
  border-slate-200 py-4 text-xs md:text-sm'
    >
      <div className='col-span-2 flex gap-2 justify-self-start md:gap-4'>
        <div className='relative aspect-square w-[70px]'>
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            fill
            className='object-contain'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className='justify-self-center'>{formatPrice(item.price)}</div>
      <div className='justify-self-center'>{item.quantity}</div>
      <div className='justify-self-end font-semibold'>
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
