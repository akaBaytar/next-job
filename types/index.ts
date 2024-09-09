export type Job = {
  id: string;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
  position: string;
  company: string;
  location: string;
  status: string;
  type: string;
};

export enum JobStatus {
  Pending = 'Pending',
  Interview = 'Interview',
  Accepted = 'Accepted',
  Declined = 'Declined',
}

export enum JobType {
  FullTime = 'Full time',
  PartTime = 'Part time',
  Internship = 'Internship',
  Freelance = 'Freelance',
  Contract = 'Contract',
}

export type GetAllJobsActionType = {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
};
