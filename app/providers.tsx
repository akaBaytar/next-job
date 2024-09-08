'use client';

import { Fragment, useState } from 'react';

import { Toaster } from '@/components/ui/toaster';
import ThemeProvider from '@/components/providers/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: { queries: { staleTime: 60 * 1000 * 5 } },
    });
  });

  return (
    <Fragment>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default Providers;
