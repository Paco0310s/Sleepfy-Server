import { IsNotEmpty, IsNumber } from "class-validator";

// {
// 'answers': answers.map((e) => {'question_id': e.first, 'answer_id': e.last}).toList(),
// 'test_id': test!.id,
// 'user_id': UserPreferences.id,
// }

export class CreateUserAnswerDto {
    @IsNotEmpty()
    answers: { question_id: number, answer_id: number }[];

    @IsNumber()
    @IsNotEmpty()
    test_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}
