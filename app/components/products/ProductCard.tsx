'use client';

import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import { Rating } from '@mui/material';
import Image from 'next/image';

interface ProductCardProps {
  data: any;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  return (
    <div
      className='
      col-span-1
      cursor-pointer 
      rounded-sm
      border-[1.2px] border-slate-200 
      bg-slate-50 
      p-2
      text-center 
      text-sm 
      transition
      hover:scale-105
      '
    >
      <div className='flex w-full flex-col items-center gap-1'>
        <div className='relative aspect-square w-full overflow-hidden'>
          <Image
            fill
            alt={data.name}
            className='h-full w-full object-contain'
            sizes='100%'
            src={data.images[0].image}
          />
        </div>
        <div className='mt-4'>{truncateText(data.name)}</div>
        <div>
          <Rating value={5} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className='font-semibold'>{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
