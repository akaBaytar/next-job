import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getChartData, getStats } from '@/actions';

import ChartsContainer from '@/components/containers/Charts';
import StatsContainer from '@/components/containers/Stats';

const StatsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStats(),
  });

  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartData(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
};

export default StatsPage;
