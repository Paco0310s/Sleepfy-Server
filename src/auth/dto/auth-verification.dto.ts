import { IsEmail, IsString, Length, MinLength, MaxLength } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail({}, { message: 'Ingresa un correo electrónico válido' })
  email: string;

  @IsString({ message: 'Ingresa el código de verificación' })
  @Length(6, 6, { message: 'El código debe tener exactamente 6 dígitos' })
  code: string;
}

export class ResendVerificationDto {
  @IsEmail({}, { message: 'Ingresa un correo electrónico válido' })
  email: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Ingresa un correo electrónico válido' })
  email: string;
}

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Ingresa un correo electrónico válido' })
  email: string;

  @IsString({ message: 'Ingresa el código de recuperación' })
  @Length(6, 6, { message: 'El código debe tener exactamente 6 dígitos' })
  code: string;

  @IsString({ message: 'Ingresa tu nueva contraseña' })
  @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
  @MaxLength(64, { message: 'La contraseña no puede exceder 64 caracteres' })
  newPassword: string;
}

