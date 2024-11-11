import { UserAnswer } from "../entities/user-answer.entity";

export const userAnswersProviders = [
    {
        provide: 'USER_ANSWERS_REPOSITORY',
        useValue: UserAnswer,
    },
];