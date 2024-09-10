import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const StatsSkeleton = () => {
  return (
    <Card className='w-full h-[96px] border'>
      <CardHeader>
        <div className='flex items-center justify-between w-full'>
          <Skeleton className='h-4 w-[150px]' />
          <Skeleton className='h-12 w-12 rounded-lg' />
        </div>
      </CardHeader>
    </Card>
  );
};

export const JobSkeleton = () => {
  return (
    <Card className='border h-[164px] w-full'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div>
            <CardTitle>
              <Skeleton className='w-48 h-4' />
            </CardTitle>
            <CardDescription>
              <Skeleton className='w-24 h-4 mt-1' />
            </CardDescription>
          </div>
          <div className='flex gap-2 items-center'>
            <Skeleton className='h-9 w-9' />
            <Skeleton className='h-9 w-9' />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='grid grid-cols-2 gap-4 mt-4'>
        <Skeleton className='w-24 h-3' />
        <Skeleton className='w-24 h-3' />
        <Skeleton className='w-24 h-3' />
        <Skeleton className='w-24 h-3' />
      </CardContent>
    </Card>
  );
};

export const JobsSkeleton = () => {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8'>
      <JobSkeleton />
      <JobSkeleton />
      <JobSkeleton />
      <JobSkeleton />
      <JobSkeleton />
      <JobSkeleton />
    </div>
  );
};

export const SearchSkeleton = () => {
  return (
    <div className='border mb-16 p-8 gap-4 grid md:grid-cols-3 rounded-lg'>
      <Skeleton className='w-full h-9' />
      <Skeleton className='w-full h-9' />
      <Skeleton className='w-full h-9' />
    </div>
  );
};
