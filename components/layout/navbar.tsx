import Image from 'next/image';

import { UserButton } from '@clerk/nextjs';

import ThemeToggle from './toggle';
import DropdownMenu from './dropdown';

import LOGO from '@/assets/logo.png';

const Navbar = () => {
  return (
    <nav className='bg-muted p-4 sm:px-8 lg:px-16 flex items-center justify-between'>
      <DropdownMenu />
      <Image src={LOGO} alt='Next Job Logo' width={36} className='lg:hidden' />
      <div className='flex items-center gap-4 lg:ml-auto'>
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
