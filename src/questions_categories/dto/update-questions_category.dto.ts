import { PartialType } from '@nestjs/swagger';
import { CreateQuestionsCategoryDto } from './create-questions_category.dto';

export class UpdateQuestionsCategoryDto extends PartialType(CreateQuestionsCategoryDto) {}
