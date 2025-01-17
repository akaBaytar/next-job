import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import Providers from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next Job',
  description: 'A platform that allows users to create job listings. ',
  keywords: 'job tracking, job listing, application, workflow, next job',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang='en' suppressHydrationWarning>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
