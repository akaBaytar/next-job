import { UserButton } from '@clerk/nextjs';

import ThemeToggle from './toggle';
import DropdownMenu from './dropdown';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between gap-4 p-4 sm:px-8 lg:px-16 border-b '>
      <DropdownMenu />
      <h1 className='text-primary font-semibold tracking-wider text-2xl'>
        Next Job
      </h1>
      <div className='flex items-center gap-4 lg:ml-auto'>
        <div className='grid place-items-center rounded-lg w-8 h-8'>
          <UserButton />
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
