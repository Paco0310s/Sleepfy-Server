import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {

    @IsString()
    comment: string;

    @IsNumber()
    userId: number;
}
