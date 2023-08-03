import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getQuestions(
    @Query('areas', ParseArrayPipe) areas?: string[],
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    const filters = {
      ...(areas?.length && { areas }),
    };
    return this.questionService.getQuestions(filters, limit);
  }

  @Delete(':id')
  deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.deleteQuestion(id);
  }

  @Post()
  createQuestion(@Body() body) {
    return this.questionService.createQuestion(body);
  }
}
