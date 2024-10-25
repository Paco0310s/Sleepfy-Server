import { Test } from "@nestjs/testing";

export const testsProviders = [
    {
        provide: 'TEST_REPOSITORY',
        useValue: Test,
    },
];