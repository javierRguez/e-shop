/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { MdCheckCircle } from 'react-icons/md';
import Button from '@/app/components/Button';
import ProductImage from '@/app/components/products/ProductImage';
import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import { useCart } from '@/hooks/useCart';
import { Rating } from '@mui/material';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/utils/formatPrice';

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
  const { handleAddProductToCart, cartProducts } = useCart();
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

  const router = useRouter();

  const canAddToCart = () => {
    return !isProductInCart();
  };

  const isProductInCart = () => {
    const existingIndex = cartProducts?.findIndex(
      (item) => item.id === product.id
    );

    return existingIndex !== undefined && existingIndex > -1;
  };

  const onClickAddToCart = () => {
    if (canAddToCart()) {
      handleAddProductToCart(cartProduct);
    }
  };

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
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSet={handleColorSelect}
      />
      <div className='flex flex-col gap-1 text-sm text-slate-500'>
        <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
        <div className='text-3xl font-semibold text-slate-700'>{`${formatPrice(
          product.price
        )}`}</div>
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
        {canAddToCart() ? (
          <>
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
              <Button label='Add To Cart' onClick={onClickAddToCart} />
            </div>
          </>
        ) : (
          <>
            <p className='mb-2 flex items-center gap-1 text-slate-500'>
              <MdCheckCircle className='text-teal-400' size={20} />
              <span>Product added to cart</span>
            </p>
            <div className='max-w-[300px]'>
              <Button
                label='View Cart'
                outline
                onClick={() => {
                  router.push('/cart');
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
