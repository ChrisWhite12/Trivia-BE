import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getQuestions() {
    console.log('getting questions');
    // @Query('areas', ParseArrayPipe) areas?: string[],
    // @Query('limit', ParseIntPipe) limit?: number,
    // const filters = {
    //   ...(areas?.length && { areas }),
    // };
    return this.questionService.getQuestions();
  }

  @Get(':id')
  getQuestion(@Param('id', ParseIntPipe) id: number) {
    console.log('getting question');
    return this.questionService.getQuestion(id);
  }

  @Delete(':id')
  deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.deleteQuestion(id);
  }

  @Post()
  createQuestion(@Body() body) {
    return this.questionService.createQuestion(body);
  }

  @Put(':id')
  updateQuestion(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.questionService.updateQuestion(id, body);
  }
}
