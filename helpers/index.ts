'use server';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

export const authenticateAndRedirect = (): string => {
  const { userId } = auth();

  if (!userId) redirect('/');

  return userId;
};
