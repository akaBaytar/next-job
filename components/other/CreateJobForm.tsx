'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { JobStatus, JobType } from '@/types';
import { createAndEditJobSchema, CreateAndEditJobType } from '@/schemas';

import { Form } from '../ui/form';
import { Button } from '../ui/button';
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

  const submitHandler = (values: CreateAndEditJobType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className='p-8 rounded-lg border'>
        <h2 className='font-semibold text-2xl mb-4'>Add Job</h2>
        <div className='grid gap-4'>
          <JobFormField name='position' control={form.control}/>
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
          <Button type='submit'>Create a Job</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
