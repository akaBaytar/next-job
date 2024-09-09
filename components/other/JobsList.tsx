'use client';

import { Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getAllJobs } from '@/actions';

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

  if (jobs.length < 1) return <h2 className='text-xl'>No jobs found.</h2>;

  return (
    <Fragment>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </Fragment>
  );
};

export default JobsList;
