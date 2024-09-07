import Link from 'next/link';

import { AlignLeft } from 'lucide-react';
import { links } from '@/utils/links';
import { Button } from '../ui/button';

import {
  DropdownMenu as Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DropdownMenu = () => {
  return (
    <Dropdown>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button  variant='outline' size='icon'>
          <AlignLeft />
          <span className="sr-only">Toggle Links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='lg:hidden' align='start' sideOffset={25}>
        {links.map(({ href, icon, label }) => (
          <DropdownMenuItem key={href}>
            <Link href={href} className='flex items-center gap-2'>
              <span>{icon}</span>
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </Dropdown>
  );
};

export default DropdownMenu;
