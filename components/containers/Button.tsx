'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

type PropTypes = {
  currentPage: number;
  totalPages: number;
};

type ButtonProps = {
  page: number;
  active: boolean;
};

const ButtonContainer = ({ currentPage, totalPages }: PropTypes) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let prevPage = currentPage - 1;
  if (prevPage < 1) prevPage = 1;

  let nextPage = currentPage + 1;
  if (nextPage > totalPages) nextPage = totalPages;

  const pageChangeHandler = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
      page: String(page),
    };

    const params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  const addPageButton = ({ page, active }: ButtonProps) => {
    return (
      <Button
        key={page}
        size='icon'
        variant={active ? 'default' : 'outline'}
        onClick={() => pageChangeHandler(page)}>
        {page}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(addPageButton({ page: 1, active: currentPage === 1 }));

    if (currentPage > 3) {
      pageButtons.push(
        <Button size='icon' variant='outline' key='dot-1'>
          ...
        </Button>
      );
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageButton({ page: currentPage - 1, active: false }));
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(addPageButton({ page: currentPage, active: true }));
    }

    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(addPageButton({ page: currentPage + 1, active: false }));
    }

    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size='icon' variant='outline' key='dot-2'>
          ...
        </Button>
      );
    }

    pageButtons.push(
      addPageButton({ page: totalPages, active: currentPage === totalPages })
    );

    return pageButtons;
  };

  return (
    <div className='flex gap-1'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => pageChangeHandler(prevPage)}>
        <ChevronLeftIcon />
      </Button>
      {renderPageButtons()}
      <Button
        variant='outline'
        size='icon'
        onClick={() => pageChangeHandler(nextPage)}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default ButtonContainer;
