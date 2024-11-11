import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { TestsModule } from './tests/tests.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersOptionsModule } from './answers_options/answers_options.module';
import { DatabaseModule } from './db/modules/database.modules';
import { UserAnswersModule } from './user-answers/user-answers.module';
import { CustomRoutineModule } from './custom-routine/custom-routine.module';
import { CommentsModule } from './comments/comments.module';
import { SleepSchedulesModule } from './sleep-schedules/sleep-schedules.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    TestsModule,
    QuestionsModule,
    AnswersOptionsModule,
    UserAnswersModule,
    CustomRoutineModule,
    CommentsModule,
    SleepSchedulesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
