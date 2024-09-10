const { PrismaClient } = require('@prisma/client');
const MOCK_DATA = require('./data.json');

const prisma = new PrismaClient();

const insert = async () => {
  const clerkId = process.env.CLERK_USER_ID;

  const jobs = MOCK_DATA.map((job) => {
    return { ...job, clerkId };
  });

  for (const job of jobs) await prisma.job.create({ data: job });
};

insert()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
