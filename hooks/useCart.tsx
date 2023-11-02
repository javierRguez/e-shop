import { type CartProductType } from '@/app/product/[productId]/ProductDetails';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

interface CartContextType {
  cartTotalQuantity: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

type Props = Record<string, any>;

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [isLocalDataLoad, setIsLocalDataLoad] = useState(false);

  useEffect(() => {
    if (!isLocalDataLoad) {
      const items: any = localStorage.getItem('eShopCartItems');
      const cProducts: CartProductType[] = JSON.parse(items);

      setCartProducts(cProducts);
    }

    return () => {
      setIsLocalDataLoad(false);
    };
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev != null) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });

    toast.success('Product added to cart');
  }, []);

  const value = { cartTotalQuantity, cartProducts, handleAddProductToCart };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartContextProvider');
  }

  return context;
};
