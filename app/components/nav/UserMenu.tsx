'use client';

import { Avatar } from '@mui/material';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { AiFillCaretDown } from 'react-icons/ai';
import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className='relative z-30'>
        <div
          onClick={toggleOpen}
          className='flex
        cursor-pointer
        flex-row
        items-center
        gap-1
        rounded-full
        border-[1px]
        border-slate-400
        p-2
        text-slate-700
        transition
        hover:shadow-md
        '
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className='absolute
        right-0
        top-12
        flex
        w-[170px]
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-md
        bg-white
        text-sm
        shadow-md'
          >
            <div>
              <Link href='/orders'>
                <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
              </Link>
              <Link href='/admin'>
                <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  toggleOpen();
                  void signOut();
                }}
              >
                Logout
              </MenuItem>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
