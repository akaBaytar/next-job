import { Skeleton } from '@/components/ui/skeleton';
import { JobSkeleton, SearchSkeleton } from '@/components/layout/skeleton';

const JobsPageLoading = () => {
  return (
    <>
      <SearchSkeleton />
      <Skeleton className='my-16 h-[62px] border rounded-lg'/>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8'>
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
