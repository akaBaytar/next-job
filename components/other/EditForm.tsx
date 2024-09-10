'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

import { JobStatus, JobType } from '@/types';
import { CreateAndEditJobType, createAndEditJobSchema } from '@/schemas';

import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { JobFormField, JobFormSelect } from '../layout/form';

import { getJob, updateJob } from '@/actions';

const EditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ['job', id],
    queryFn: () => getJob(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => updateJob(id, values),
    onSuccess: (data) => {
      if (!data) return toast({ description: 'An error occurred.' });

      toast({ description: 'Job updated successfully.' });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });

      router.push('/jobs');
    },
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),

    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      type: (data?.type as JobType) || JobType.FullTime,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        position: data.position || '',
        company: data.company || '',
        location: data.location || '',
        status: (data.status as JobStatus) || JobStatus.Pending,
        type: (data.type as JobType) || JobType.FullTime,
      });
    }
  }, [data, form]);

  const submitHandler = (values: CreateAndEditJobType) => mutate(values);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className='p-8 rounded-lg border'>
        <h2 className='font-semibold text-2xl mb-4'>Edit Job</h2>
        <div className='grid gap-4'>
          <JobFormField name='position' control={form.control} />
          <JobFormField name='company' control={form.control} />
          <JobFormField name='location' control={form.control} />
          <JobFormSelect
            name='status'
            text='Job Status'
            control={form.control}
            items={Object.values(JobStatus)}
          />
          <JobFormSelect
            name='type'
            text='Job Type'
            control={form.control}
            items={Object.values(JobType)}
          />
          <Button type='submit' disabled={isPending}>
            {isPending ? <ReloadIcon className='animate-spin' /> : 'Edit Job'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
