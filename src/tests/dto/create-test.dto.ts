import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateTestDto {
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @MaxLength(30, { message: 'Name cannot be longer than 30 characters' })
    name: string;
}
