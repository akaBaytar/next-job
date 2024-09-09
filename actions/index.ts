'use server';

import prisma from '@/database';

import { authenticateAndRedirect } from '@/helpers';

import { Job } from '@/types';
import { CreateAndEditJobType, createAndEditJobSchema } from '@/schemas';

export const createJob = async (values: CreateAndEditJobType) => {
  const clerkId = authenticateAndRedirect();

  try {
    createAndEditJobSchema.parse(values);

    const job: Job = await prisma.job.create({
      data: {
        ...values,
        clerkId,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
};