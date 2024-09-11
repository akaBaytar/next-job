'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { JobStatus } from '@/types';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'All';

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const search = formData.get('search') as string;
    const status = formData.get('status') as string;

    const params = new URLSearchParams();

    params.set('search', search);
    params.set('status', status);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submitHandler}
      className='border mb-16 p-8 gap-4 grid md:grid-cols-3 rounded-lg'>
      <Input
        type='text'
        placeholder='Job Information'
        name='search'
        defaultValue={search}
      />
      <Select name='status' defaultValue={status}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['All', ...Object.values(JobStatus)].map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type='submit'>
        <span className='flex items-center gap-1'>
          <MagnifyingGlassIcon />
          Search
        </span>
      </Button>
    </form>
  );
};

export default SearchForm;
