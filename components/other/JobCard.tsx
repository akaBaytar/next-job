import Link from 'next/link';

import {
  CalendarIcon,
  BackpackIcon,
  GlobeIcon,
  Pencil2Icon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';

import JobInfo from './JobInfo';
import { DeleteButton } from '../layout/button';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { Job } from '@/types';

const JobCard = ({ job }: { job: Job }) => {
  const { id, company, position, createdAt, location, status, type } = job;

  const date = new Date(createdAt).toLocaleDateString();

  return (
    <Card className='border'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div>
            <CardTitle>{position}</CardTitle>
            <CardDescription>{company}</CardDescription>
          </div>
          <div className='flex gap-2 items-center'>
            <Button asChild size='icon' variant='outline'>
              <Link href={`/jobs/${id}`}>
                <Pencil2Icon />
              </Link>
            </Button>
            <DeleteButton />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='grid grid-cols-2 gap-4 mt-4'>
        <JobInfo icon={<BackpackIcon />} text={type} />
        <JobInfo icon={<GlobeIcon />} text={location} />
        <JobInfo icon={<CalendarIcon />} text={date} />
        <JobInfo icon={<InfoCircledIcon />} text={status} />
      </CardContent>
    </Card>
  );
};

export default JobCard;
