'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import LOGO from '@/assets/logo.png';

import { Button } from '../ui/button';
import { links } from '@/utils/links';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='py-4 px-8 border-r h-full'>
      <Image
        src={LOGO}
        alt='Next Job Logo'
        width={36}
        className='mx-auto rounded-lg'
      />
      <div className='flex flex-col mt-16 gap-4'>
        {links.map(({ href, icon, label }) => (
          <Button
            asChild
            key={href}
            variant={pathname === href ? 'default' : 'link'}
            className='hover:no-underline'>
            <Link href={href} className='flex gap-2 items-center'>
              <span>{icon}</span> {label}
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
