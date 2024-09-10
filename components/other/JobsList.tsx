'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getAllJobs } from '@/actions';

import { Button } from '../ui/button';
import JobCard from './JobCard';

const JobsList = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'All';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, status, page],
    queryFn: () => getAllJobs({ search, status, page }),
  });

  const jobs = data?.jobs || [];

  if (isPending) return <p>Loading...</p>;

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
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </Fragment>
  );
};

export default JobsList;
