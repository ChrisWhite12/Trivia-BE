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

  const questions = await prisma.question.createMany({
    data: [
      {
        categoryId: movieCategories.id,
        correct: 1,
        title: 'What is a',
        answers: [
          'aaaaaaaaaaaa',
          'ssssssssssssss',
          'ddddddddddddd',
          'wwwwwwwwwwwwwww',
        ],
      },
      {
        categoryId: movieCategories.id,
        correct: 2,
        title: 'What is s',
        answers: [
          'aaaaaaaaaaaa',
          'ssssssssssssss',
          'ddddddddddddd',
          'wwwwwwwwwwwwwww',
        ],
      },
      {
        categoryId: historyCategory.id,
        correct: 3,
        title: 'What is d',
        answers: [
          'aaaaaaaaaaaa',
          'ssssssssssssss',
          'ddddddddddddd',
          'wwwwwwwwwwwwwww',
        ],
      },
      {
        categoryId: musicCategory.id,
        correct: 4,
        title: 'What is w',
        answers: [
          'aaaaaaaaaaaa',
          'ssssssssssssss',
          'ddddddddddddd',
          'wwwwwwwwwwwwwww',
        ],
      },
    ],
  });

  console.log(questions.count, ' questions created');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
