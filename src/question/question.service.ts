import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface QuestionQuery {
  areas?: string[];
}

interface QuestionParams {
  title: string;
  correct: number;
  answers: string[];
  categoryId: number;
}

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQuestions(filters: QuestionQuery, limit?: number) {
    const questions = await this.prismaService.question.findMany({
      where: {
        category: {
          name: { in: filters.areas },
        },
      },
      take: limit,
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
}
