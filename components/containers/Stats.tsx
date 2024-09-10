'use client';

import { useQuery } from '@tanstack/react-query';

import { getStats } from '@/actions';
import StatsCard from '../other/StatsCard';

const StatsContainer = () => {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStats(),
  });

  return (
    <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-4'>
      <StatsCard title='Pending Jobs' value={data?.Pending || 0} />
      <StatsCard title='Interviews Set' value={data?.Interview || 0} />
      <StatsCard title='Job Accepted' value={data?.Accepted || 0} />
      <StatsCard title='Job Declined' value={data?.Declined || 0} />
    </div>
  );
};

export default StatsContainer;
