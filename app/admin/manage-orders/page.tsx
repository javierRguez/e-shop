import { getCurrentUser } from '@/actions/getCurrentUser';
import Container from '@/app/components/Container';
import NullData from '@/app/components/NullData';
import ManageOrdersClient from './ManageOrdersClient';
import getOrders from '@/actions/getOrders';

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (currentUser == null || currentUser.role !== 'ADMIN') {
    return <NullData title='Oops! Access denied' />;
  }

  return (
    <div className='pt-8'>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
