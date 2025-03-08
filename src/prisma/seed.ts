import { Lead, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
(async () => {
  await prisma.user.upsert({
    where: { email: 'admin@alma.com' },
    update: {},
    create: {
      email: 'admin@alma.com',
      password: 'admin',
    },
  });

  const leads: Array<
    Omit<Lead, 'id' | 'status' | 'linkedIn'> & { status?: string }
  > = [
    ...Array(300)
      .fill(null)
      .map(() => {
        const statuses = [
          'pending',
          'reached out',
          'not interested',
          'converted',
        ];
        const countries = [
          'United States',
          'United Kingdom',
          'France',
          'Germany',
          'Spain',
          'Italy',
          'Canada',
          'Australia',
          'Japan',
          'Brazil',
        ];
        const firstNames = [
          'James',
          'John',
          'Robert',
          'Michael',
          'William',
          'David',
          'Emma',
          'Olivia',
          'Ava',
          'Isabella',
          'Sophia',
          'Charlotte',
          'Mia',
          'Amelia',
        ];
        const lastNames = [
          'Smith',
          'Johnson',
          'Williams',
          'Brown',
          'Jones',
          'Garcia',
          'Miller',
          'Davis',
          'Rodriguez',
          'Martinez',
          'Hernandez',
          'Lopez',
        ];
        const firstName =
          firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName =
          lastNames[Math.floor(Math.random() * lastNames.length)];
        const now = new Date();
        const twoYearsAgo = new Date(now.setFullYear(now.getFullYear() - 2));
        const createdAt = new Date(
          twoYearsAgo.getTime() +
            Math.random() * (Date.now() - twoYearsAgo.getTime())
        );
        return {
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          country: countries[Math.floor(Math.random() * countries.length)],
          message: `Initial contact with ${firstName} ${lastName}`,
          createdAt,
        };
      }),
  ];

  for (const lead of leads) {
    await prisma.lead.upsert({
      where: { email: lead.email },
      update: {},
      create: lead,
    });
  }
})().finally(async () => {
  await prisma.$disconnect();
});
