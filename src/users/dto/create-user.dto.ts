import { IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @MaxLength(30, { message: 'Name cannot be longer than 30 characters' })
    name: string;

    @IsString()
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(30, { message: 'Last name cannot be longer than 30 characters' })
    lastName: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @MaxLength(50, { message: 'Email cannot be longer than 50 characters' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
    // @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    //     message: 'Password must include uppercase, lowercase, number, and special character'
    // })
    password: string;
}
