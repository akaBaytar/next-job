'use client';

import { Fragment } from 'react';

import ThemeProvider from '@/components/providers/theme';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <ThemeProvider attribute='class'>{children}</ThemeProvider>
    </Fragment>
  );
};

export default Providers;
