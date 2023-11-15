import Link from 'next/link';
import Container from '../Container';
import { Redressed } from 'next/font/google';
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import { getCurrentUser } from '@/actions/getCurrentUser';
import Categories from './Categories';
import SearchBar from './SearchBar';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className='sticky top-0 z-30 w-full bg-slate-200 shadow-sm'>
      <div className='border-b-[1px] py-4'>
        <Container>
          <div className='md-gap-0 flex items-center justify-between gap-3'>
            <Link
              className={`${redressed.className} text-2xl font-bold`}
              href='/'
            >
              E-Shop
            </Link>
            <div className='hidden md:block'>
              <SearchBar />
            </div>
            <div className='flex items-center gap-8 md:gap-12'>
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default NavBar;
