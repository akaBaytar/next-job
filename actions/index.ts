'use server';

import { redirect } from 'next/navigation';

import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import prisma from '@/database';
import { authenticateAndRedirect } from '@/helpers';

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
  limit = 6,
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
        OR: [
          {
            position: { contains: search, mode: 'insensitive' },
          },
          {
            company: { contains: search, mode: 'insensitive' },
          },
          {
            location: { contains: search, mode: 'insensitive' },
          },
          {
            type: { contains: search, mode: 'insensitive' },
          },
        ],
      };
    }

    if (status && status !== 'All') where = { ...where, status };

    const skip = (page - 1) * limit;

    const jobs: Job[] = await prisma.job.findMany({
      where,
      take: limit,
      skip,
      orderBy: { createdAt: 'desc' },
    });

    const count: number = await prisma.job.count({ where });

    const pages = Math.ceil(count / limit);

    return { jobs, count, page, pages };
  } catch (error) {
    return { jobs: [], count: 0, page: 1, pages: 0 };
  }
};

export const deleteJob = async (id: string): Promise<Job | null> => {
  const clerkId = authenticateAndRedirect();

  try {
    const job: Job = await prisma.job.delete({
      where: {
        id,
        clerkId,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
};

export const getJob = async (id: string): Promise<Job | null> => {
  let job: Job | null = null;

  const clerkId = authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId,
      },
    });
  } catch (error) {
    job = null;
  }

  if (!job) redirect('/jobs');

  return job;
};

export const updateJob = async (id: string, values: CreateAndEditJobType) => {
  const clerkId = authenticateAndRedirect();

  try {
    const job: Job = await prisma.job.update({
      where: {
        id,
        clerkId,
      },

      data: { ...values },
    });

    return job;
  } catch (error) {
    return null;
  }
};

export const getStats = async () => {
  const clerkId = authenticateAndRedirect();

  try {
    const _stats = await prisma.job.groupBy({
      where: { clerkId },

      by: ['status'],

      _count: { status: true },
    });

    const statsObj = _stats.reduce((acc, cur) => {
      acc[cur.status] = cur._count.status;

      return acc;
    }, {} as Record<string, number>);

    const stats = {
      Pending: 0,
      Declined: 0,
      Accepted: 0,
      Interview: 0,
      ...statsObj,
    };

    return stats;
  } catch (error) {
    redirect('/jobs');
  }
};

export const getChartData = async () => {
  const clerkId = authenticateAndRedirect();

  const sixMonths = dayjs().subtract(6, 'month').toDate();

  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId,
        createdAt: {
          gte: sixMonths,
        },
      },

      orderBy: {
        createdAt: 'asc',
      },
    });

    const applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');
      const existing = acc.find((application) => application.date === date);

      existing ? (existing.count += 1) : acc.push({ date, count: 1 });
      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    redirect('/jobs');
  }
};
