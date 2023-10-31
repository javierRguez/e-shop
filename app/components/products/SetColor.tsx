'use client';

import {
  type CartProductType,
  type SelectedImgType,
} from '@/app/product/[productId]/ProductDetails';

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className='flex items-center gap-4'>
        <span className='font-semibold'>COLOR:</span>
        <div className='flex gap-1'>
          {images.map((image) => {
            return (
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border-teal-300 ${
                  cartProduct.selectedImg.color === image.color
                    ? 'border-[1.5px]'
                    : 'border-none'
                }`}
                key={image.color}
                onClick={() => {
                  handleColorSelect(image);
                }}
              >
                <div
                  style={{ background: image.colorCode }}
                  className='h-5 w-5 cursor-pointer rounded-full border-[1.2px] border-slate-300'
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
