import { JobSkeleton, SearchSkeleton } from '@/components/layout/skeleton';

const JobsPageLoading = () => {
  return (
    <>
      <SearchSkeleton />
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 mt-16'>
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
      </div>
    </>
  );
};

export default JobsPageLoading;
