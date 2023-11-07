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
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

type Props = Record<string, any>;

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [isLocalDataLoad, setIsLocalDataLoad] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    if (!isLocalDataLoad) {
      const items: any = localStorage.getItem('eShopCartItems');
      const cProducts: CartProductType[] = JSON.parse(items);
      const eShopPaymentIntent: any =
        localStorage.getItem('eShopPaymentIntent');
      const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

      setCartProducts(cProducts);
      setPaymentIntent(paymentIntent);
    }

    return () => {
      setIsLocalDataLoad(false);
    };
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts != null) {
        const { total, quantity } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.quantity += item.quantity;

            return acc;
          },
          { total: 0, quantity: 0 }
        );

        setCartTotalQuantity(quantity);
        setCartTotalAmount(total);
      }
    };

    getTotals();
  }, [cartProducts]);

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

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts != null) {
        const filteredProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filteredProducts);
        toast.success('Product remove');
        localStorage.setItem(
          'eShopCartItems',
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error('Ooop! Maximun reached');
      } else if (cartProducts != null) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts?.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error('Ooop! Minimum reached');
      } else if (cartProducts != null) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts?.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQuantity(0);
    localStorage.setItem('eShopCartItems', JSON.stringify(null));
  }, []);

  const handleSetPaymentIntent = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      localStorage.setItem('eShopPaymentIntent', JSON.stringify(value));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQuantity,
    cartTotalAmount,
    cartProducts,
    paymentIntent,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartContextProvider');
  }

  return context;
};
