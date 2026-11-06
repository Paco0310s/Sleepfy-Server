import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'El nombre debe ser texto válido' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(40, { message: 'El nombre no puede exceder 40 caracteres' })
    name: string;

    @IsString({ message: 'El apellido debe ser texto válido' })
    @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    @MaxLength(40, { message: 'El apellido no puede exceder 40 caracteres' })
    lastName: string;

    @IsEmail({}, { message: 'Ingresa un correo electrónico válido' })
    @MaxLength(80, { message: 'El correo no puede exceder 80 caracteres' })
    email: string;

    @IsString({ message: 'La contraseña debe ser válida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(64, { message: 'La contraseña no puede exceder 64 caracteres' })
    password: string;
}
