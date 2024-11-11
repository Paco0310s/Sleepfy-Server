import { Module } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { UserAnswersController } from './user-answers.controller';
import { userAnswersProviders } from './providers/user.answers.providers';

@Module({
  controllers: [UserAnswersController],
  providers: [
    UserAnswersService,
    ...userAnswersProviders,
  ],
})
export class UserAnswersModule { }
