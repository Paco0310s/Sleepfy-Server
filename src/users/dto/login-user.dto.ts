import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsEmail({}, { message: 'Ingresa un correo electrónico válido' })
    email: string;

    @IsString({ message: 'Ingresa tu contraseña' })
    @MinLength(1, { message: 'La contraseña no puede estar vacía' })
    password: string;
}