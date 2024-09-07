import { UserButton } from '@clerk/nextjs';

import ThemeToggle from './toggle';
import DropdownMenu from './dropdown';

const Navbar = () => {
  return (
    <nav className='bg-muted p-4 sm:px-8 lg:px-16 flex items-center gap-4 justify-between'>
      <DropdownMenu />
      <h1 className='text-primary font-semibold tracking-wider text-2xl'>
        Next Job
      </h1>
      <div className='flex items-center gap-4 lg:ml-auto'>
        <UserButton />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
