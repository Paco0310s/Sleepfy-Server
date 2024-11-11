import { Sequelize } from 'sequelize-typescript';
import { AnswersOption } from 'src/answers_options/entities/answers_option.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CustomRoutine } from 'src/custom-routine/entities/custom-routine.entity';
import { Question } from 'src/questions/entities/question.entity';
import { SleepSchedule } from 'src/sleep-schedules/entities/sleep-schedule.entity';
import { Test } from 'src/tests/entities/test.entity';
import { UserAnswer } from 'src/user-answers/entities/user-answer.entity';
import { User } from 'src/users/entities/user.entity';


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
            sequelize.addModels([User, Test, Question, AnswersOption, UserAnswer, CustomRoutine, SleepSchedule, Comment]);
            await sequelize.sync();
            return sequelize;
        },
    },
];