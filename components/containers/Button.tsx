'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '../ui/button';

type PropTypes = {
  currentPage: number;
  totalPages: number;
};

const ButtonContainer = ({ currentPage, totalPages }: PropTypes) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pageChangeHandler = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
      page: String(page),
    };

    const params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex gap-2'>
      {pageButtons.map((page) => (
        <Button
          key={page}
          size='icon'
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => pageChangeHandler(page)}>
          {page}
        </Button>
      ))}
    </div>
  );
};

export default ButtonContainer;
