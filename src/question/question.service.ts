import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface QuestionParams {
  title: string;
  correct: number;
  answers: string[];
  categoryId: number;
}

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQuestions() {
    const questions = await this.prismaService.question.findMany({});
    return questions;
  }

  async deleteQuestion(id: number) {
    console.log('delete question - ', id);
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
    console.log('create question');

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
