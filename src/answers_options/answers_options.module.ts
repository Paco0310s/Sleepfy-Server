import { Module } from '@nestjs/common';
import { AnswersOptionsService } from './answers_options.service';
import { AnswersOptionsController } from './answers_options.controller';
import { answersOptionsProviders } from './providers/answers_option.providers';

@Module({
  controllers: [AnswersOptionsController],
  providers: [AnswersOptionsService, ...answersOptionsProviders],
})
export class AnswersOptionsModule { }
