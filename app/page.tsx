import Link from 'next/link';
import Image from 'next/image';

import LOGO from '@/assets/logo.png';
import ILLUSTRATION from '@/assets/illustration.svg';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <main>
      <header className='max-w-6xl py-6 px-4 sm:px-8 mx-auto'>
        <Image
          src={LOGO}
          alt='Next Job Logo'
          width={40}
          className='mx-auto rounded-lg lg:ml-0'
        />
      </header>
      <section className='max-w-6xl mx-auto h-full py-24 gap-24 sm:px-8 grid lg:grid-cols-[1fr,400px] items-center justify-center lg:justify-start'>
        <div className='text-center lg:text-start'>
          <h1 className='text-5xl md:text-7xl font-bold'>Next Job</h1>
          <h2 className='text-3xl md:text-4xl font-semibold'>
            Job <span className='text-primary'>Tracking</span> App
          </h2>
          <p className='leading-loose max-w-md mt-4 text-muted-foreground'>
            Next Job enables users to create and manage their own job
            application lists while tracking the progress of each application.
          </p>
          <p className='leading-loose max-w-md mt-4 text-muted-foreground'>
            As users add new jobs and time passes, the platform offers
            insightful data and visualizations, allowing users to review their
            past applications and monitor trends over time.
          </p>
          <Button asChild className='mt-4' size='lg'>
            <Link href='/add-job'>Get Started</Link>
          </Button>
        </div>
        <Image
          src={ILLUSTRATION}
          alt='Two people sitting at a table, shaking hands, with an open laptop between them. One person is wearing a dark top and the other is in a yellow top.'
          className='w-[20rem] mx-auto'
        />
      </section>
    </main>
  );
};

export default HomePage;
