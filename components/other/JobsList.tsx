'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getAllJobs } from '@/actions';

import JobCard from './JobCard';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { JobsSkeleton } from '../layout/skeleton';
import ButtonContainer from '../containers/Button';
import { Separator } from '@radix-ui/react-dropdown-menu';

const JobsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const status = searchParams.get('status') ?? 'All';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', search, status, page],
    queryFn: () => getAllJobs({ search, status, page }),
  });

  const jobs = data?.jobs || [];

  const _count = data?.count || 0;
  const _page = data?.page || 0;
  const _pages = data?.pages || 0;

  if (isLoading)
    return (
      <>
        <Skeleton className='my-16 h-[62px] border rounded-lg' />
        <JobsSkeleton />
      </>
    );

  if (isError) {
    return (
      <div className='border p-4 rounded-lg flex justify-between items-center'>
        <h2>Failed to load jobs.</h2>
        <Button asChild variant='outline'>
          <Link href='/jobs'>Reset Filters</Link>
        </Button>
      </div>
    );
  }

  if (jobs.length < 1)
    return (
      <div className='border p-4 rounded-lg flex justify-between items-center'>
        <h2>No jobs found.</h2>
        <Button asChild variant='outline'>
          <Link href='/jobs'>Reset Filters</Link>
        </Button>
      </div>
    );

  return (
    <Fragment>
      <div className='flex flex-col sm:flex-row gap-4 justify-between items-center border rounded-lg mb-16 p-4'>
        <h2 className='text-xl font-semibold'>
          Total {_count} {_count <= 1 ? 'Job' : 'Jobs'}
        </h2>
        <Separator className='border-b w-full max-w-[356px] sm:hidden' />
        {_pages > 1 && (
          <ButtonContainer currentPage={_page} totalPages={_pages} />
        )}
      </div>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </Fragment>
  );
};

export default JobsList;
