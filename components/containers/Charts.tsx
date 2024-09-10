'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getChartData } from '@/actions';

import {
  AreaChart,
  BarChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '../ui/button';

const ChartsContainer = () => {
  const [chart, setChart] = useState(true);

  const { data } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getChartData(),
  });

  if (!data || data.length < 1) return null;

  return (
    <section className='mt-16'>
      <div className='flex flex-col items-center gap-8 sm:flex-row sm:justify-between'>
        <h1 className='text-2xl font-semibold text-center'>
          Monthly Applications
        </h1>
        <Button className='w-64' onClick={() => setChart(!chart)}>
          Change Chart Type
        </Button>
      </div>
      {chart ? (
        <ResponsiveContainer width={'100%'} height={400}>
          <BarChart data={data} margin={{ top: 48 }}>
            <CartesianGrid strokeDasharray={'4 4'} />
            <XAxis dataKey={'date'} />
            <YAxis allowDecimals={false} />
            <Bar dataKey={'count'} fill='#facc15' barSize={36} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width={'100%'} height={400}>
          <AreaChart data={data} margin={{ top: 48 }}>
            <CartesianGrid strokeDasharray={'4 4'} />
            <XAxis dataKey={'date'} />
            <YAxis allowDecimals={false} />
            <Area dataKey={'count'} fill='#facc15' stroke='#facc15' />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default ChartsContainer;
