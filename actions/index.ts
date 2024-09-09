'use server';

import prisma from '@/database';

import { authenticateAndRedirect } from '@/helpers';

import { Prisma } from '@prisma/client';

import { Job, GetAllJobsActionType } from '@/types';
import { CreateAndEditJobType, createAndEditJobSchema } from '@/schemas';

export const createJob = async (
  values: CreateAndEditJobType
): Promise<Job | null> => {
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

export const getAllJobs = async ({
  search,
  status,
  page = 1,
  limit = 12,
}: GetAllJobsActionType): Promise<{
  jobs: Job[];
  count: number;
  page: number;
  pages: number;
}> => {
  const clerkId = authenticateAndRedirect();

  try {
    let where: Prisma.JobWhereInput = { clerkId };

    if (search) {
      where = {
        ...where,
        OR: [{ position: { contains: search }, company: { contains: search } }],
      };
    }

    if (status && status !== 'All') where = { ...where, status };

    const jobs: Job[] = await prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return { jobs, count: 0, page, pages: Math.floor(jobs.length / limit + 1) };
  } catch (error) {
    return { jobs: [], count: 0, page: 1, pages: 0 };
  }
};
