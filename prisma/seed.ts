import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const movieCategories = await prisma.category.create({
    data: {
      name: 'Movies',
    },
  });

  const historyCategory = await prisma.category.create({
    data: {
      name: 'History',
    },
  });

  const musicCategory = await prisma.category.create({
    data: {
      name: 'Music',
    },
  });

  await prisma.question.createMany({
    data: [
      {
        categoryId: movieCategories.id,
        correct: 1,
        title: 'What is a',
        answers: ['a', 's', 'd', 'w'],
      },
      {
        categoryId: movieCategories.id,
        correct: 2,
        title: 'What is s',
        answers: ['a', 's', 'd', 'w'],
      },
      {
        categoryId: historyCategory.id,
        correct: 3,
        title: 'What is d',
        answers: ['a', 's', 'd', 'w'],
      },
      {
        categoryId: musicCategory.id,
        correct: 4,
        title: 'What is w',
        answers: ['a', 's', 'd', 'w'],
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
