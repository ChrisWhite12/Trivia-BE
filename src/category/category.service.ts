import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCategories() {
    const questions = await this.prismaService.category.findMany({});

    return questions;
  }

  async createCategory({ name }) {
    return this.prismaService.category.create({
      data: { name },
    });
  }

  async deleteCategory(id: number) {
    await this.prismaService.question.deleteMany({
      where: {
        categoryId: id,
      },
    });
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
