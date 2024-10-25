import { Test } from "@nestjs/testing";
import { AnswersOption } from "../entities/answers_option.entity";


export const answersOptionsProviders = [
    {
        provide: 'ANSWERS_OPTIONS_REPOSITORY',
        useValue: AnswersOption,
    },
];