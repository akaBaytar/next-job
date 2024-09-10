import { Skeleton } from '@/components/ui/skeleton';

const EditJobLoading = () => {
  return (
    <div className='p-8 border rounded-lg'>
      <Skeleton className='h-8 w-56 rounded-lg' />
      <div className='grid gap-4 mt-5'>
        <div>
          <Skeleton className='h-5 w-40 rounded-lg' />
          <Skeleton className='h-9 mt-3 rounded-lg' />
        </div>
        <div>
          <Skeleton className='h-5 w-40 rounded-lg' />
          <Skeleton className='h-9 mt-3 rounded-lg' />
        </div>
        <div>
          <Skeleton className='h-5 w-40 rounded-lg' />
          <Skeleton className='h-9 mt-3 rounded-lg' />
        </div>
        <div>
          <Skeleton className='h-5 w-40 rounded-lg' />
          <Skeleton className='h-9 mt-3 rounded-lg' />
        </div>
        <div>
          <Skeleton className='h-5 w-40 rounded-lg' />
          <Skeleton className='h-9 mt-3 rounded-lg' />
        </div>
      </div>
      <Skeleton className='h-8 mt-5 rounded-lg' />
    </div>
  );
};

export default EditJobLoading;
