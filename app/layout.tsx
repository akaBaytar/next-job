import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next Job',
  description: 'A platform that allows users to create job listings. ',
  keywords: 'job tracking, job listing, application, workflow, next job',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
