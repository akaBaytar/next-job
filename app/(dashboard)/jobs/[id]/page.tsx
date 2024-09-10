import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getJob } from '@/actions';
import EditForm from '@/components/other/EditForm';

const JobPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['jobs', params.id],
    queryFn: () => getJob(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditForm id={params.id} />
    </HydrationBoundary>
  );
};

export default JobPage;
