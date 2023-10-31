/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import Button from '@/app/components/Button';
import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import { Rating } from '@mui/material';
import { useCallback, useState } from 'react';

interface ProductDetailsProps {
  product: any;
}

export interface CartProductType {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
}

export interface SelectedImgType {
  color: string;
  colorCode: string;
  image: string;
}

const Horizontal = () => {
  return <hr className='my-2 w-[30%]' />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity <= 1) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity >= 99) {
      return;
    }

    setCartProduct((prev) => {
      return { ...cartProduct, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  return (
    <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
      <div>Images</div>
      <div className='flex flex-col gap-1 text-sm text-slate-500'>
        <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
        <div className='flex items-center gap-2'>
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className='text-justify'>{product.description}</div>
        <Horizontal />
        <div>
          <span className='font-semibold'>CATEGORY:</span>
          {product.category}
        </div>
        <div>
          <span className='font-semibold'>BRAND:</span>
          {product.brand}
        </div>
        <div className={product.inStock ? 'text-teal-400' : 'text-rose-400'}>
          {product.inStock ? 'In stock' : 'Out of stock'}
        </div>
        <Horizontal />
        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          handleQuantityIncrease={handleQuantityIncrease}
          handleQuantityDecrease={handleQuantityDecrease}
        />
        <Horizontal />
        <div className='max-w-[300px]'>
          <Button label='Add To Cart' onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
