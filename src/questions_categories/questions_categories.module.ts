import { Module } from '@nestjs/common';
import { QuestionsCategoriesService } from './questions_categories.service';
import { QuestionsCategoriesController } from './questions_categories.controller';

@Module({
  controllers: [QuestionsCategoriesController],
  providers: [QuestionsCategoriesService],
})
export class QuestionsCategoriesModule {}
