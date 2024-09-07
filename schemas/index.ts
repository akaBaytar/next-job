import * as z from 'zod';

import { JobStatus, JobType } from '@/types';

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'Job position must be at least two characters.',
  }),

  company: z.string().min(1, {
    message: 'Company name must be at least one characters.',
  }),

  location: z.string().min(2, {
    message: 'Location name must be at least two characters.',
  }),

  status: z.nativeEnum(JobStatus),

  type: z.nativeEnum(JobType),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
