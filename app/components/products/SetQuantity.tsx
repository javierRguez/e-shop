'use client';

import { type CartProductType } from '@/app/product/[productId]/ProductDetails';

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded';

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter = false,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  return (
    <div className='flex items-center gap-8'>
      {cartCounter ? null : <div className='font-semibold'>QUANTITY:</div>}
      <div className='flex items-center gap-4 text-base'>
        <button className={btnStyles} onClick={handleQuantityDecrease}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={btnStyles} onClick={handleQuantityIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
