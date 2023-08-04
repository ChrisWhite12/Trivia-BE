import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty({
    each: true,
  })
  answers: string[];

  @IsNumber()
  @IsPositive()
  categoryId: number;

  @IsNumber()
  @IsPositive()
  correct: number;
}

export class UpdateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsArray()
  @IsNotEmpty({
    each: true,
  })
  @IsOptional()
  answers: string[];

  @IsNumber()
  @IsPositive()
  @IsOptional()
  categoryId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  correct: number;
}
