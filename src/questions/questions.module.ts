import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { questionsProviders } from './providers/questions.providers';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, ...questionsProviders],
})
export class QuestionsModule { }
