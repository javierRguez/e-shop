import { getCurrentUser } from '@/actions/getCurrentUser';
import Container from '@/app/components/Container';
import NullData from '@/app/components/NullData';
import getOrdersByUserId from '@/actions/getOrdersByUserId';
import OrdersClient from './OrdersClient';

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return <NullData title='Oops! Access denied' />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (orders == null) {
    return <NullData title='No orders yet...' />;
  }

  return (
    <div className='pt-8'>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
