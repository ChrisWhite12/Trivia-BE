import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getQuestions() {
    return this.questionService.getQuestions();
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
