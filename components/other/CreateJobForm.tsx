'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { ReloadIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JobStatus, JobType } from '@/types';
import { createAndEditJobSchema, CreateAndEditJobType } from '@/schemas';

import { createJob } from '@/actions';

import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { JobFormField, JobFormSelect } from '../layout/form';

const CreateJobForm = () => {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      type: JobType.FullTime,
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJob(values),
    onSuccess: (data) => {
      if (!data) return toast({ description: 'An error occurred.' });

      toast({ description: 'Job created successfully.' });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      form.reset();

      router.push('/jobs');
    },
  });

  const submitHandler = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className='p-8 rounded-lg border'>
        <h2 className='font-semibold text-2xl mb-4'>Add Job</h2>
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
            {isPending ? (
              <ReloadIcon className='animate-spin' />
            ) : (
              'Create a Job'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
