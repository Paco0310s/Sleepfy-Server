import { Question } from "../entities/question.entity";


export const questionsProviders = [
    {
        provide: 'QUESTIONS_REPOSITORY',
        useValue: Question,
    },
];