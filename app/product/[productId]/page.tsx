import Container from '@/app/components/Container';
import ProductDetails from './ProductDetails';
import { product } from '@/utils/product';
import ListRating from './ListRating';

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product} />
        <div className='mt-20 flex flex-col gap-4'>
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
