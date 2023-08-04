import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// interface QuestionQuery {
//   areas?: string[];
// }

interface QuestionParams {
  title: string;
  correct: number;
  answers: string[];
  categoryId: number;
}

interface UpdateQuestionParams {
  title?: string;
  correct?: number;
  answers?: string[];
  categoryId?: number;
}

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQuestions() {
    // filters: QuestionQuery, limit?: number
    // console.log('filters, limit', filters, limit);
    const questions = await this.prismaService.question.findMany({
      // where: {
      //   category: {
      //     name: { in: filters.areas },
      //   },
      // },
      // take: limit,
    });
    return questions;
  }

  async deleteQuestion(id: number) {
    return this.prismaService.question.delete({
      where: { id },
    });
  }

  async createQuestion({
    title,
    answers,
    categoryId,
    correct,
  }: QuestionParams) {
    return this.prismaService.question.create({
      data: {
        title,
        correct,
        answers,
        categoryId,
      },
    });
  }

  async getQuestion(id: number) {
    return this.prismaService.question.findUnique({
      where: { id },
      select: {
        id: true,
        answers: true,
        correct: true,
        title: true,
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async updateQuestion(id: number, data: UpdateQuestionParams) {
    const question = this.prismaService.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException();
    }

    return this.prismaService.question.update({
      where: { id },
      data,
    });
  }
}
