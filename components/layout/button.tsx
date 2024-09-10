import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '../ui/button';
import { TrashIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';

import { deleteJob } from '@/actions';

export const DeleteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: (data) => {
      if (!data) return toast({ description: 'An error occurred.' });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      toast({ description: 'Job removed successfully.' });
    },
  });

  return (
    <Button
      size='icon'
      variant='outline'
      disabled={isPending}
      onClick={() => mutate(id)}>
      {isPending ? <ReloadIcon className='animate-spin' /> : <TrashIcon />}
    </Button>
  );
};
