import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';
import { BcryptFunctions } from 'src/common/functions/bcrypt.functions';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) { }

    private generateOtpCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async getToken(
        user: User
    ): Promise<{ access_token: string }> {
        const payload = { sub: user.id, username: user.name, lastname: user.lastName, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.validateUser(email, password);
        if (!user) throw new UnauthorizedException();

        // Si el correo del usuario no está verificado aún, enviamos un nuevo código y pedimos verificación
        if (user.isEmailVerified === false) {
            const code = this.generateOtpCode();
            const expires = new Date(Date.now() + 15 * 60 * 1000);
            await user.update({
                verificationCode: code,
                verificationCodeExpires: expires,
            });
            await this.mailService.sendVerificationEmail(user.email, user.name, code);

            return {
                requiresVerification: true,
                email: user.email,
                message: 'Tu correo aún no está verificado. Te hemos enviado un código de 6 dígitos.',
            };
        }

        const token = await this.getToken(user);

        user.setDataValue('token', token.access_token);
        return user;
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        const code = this.generateOtpCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        await user.update({
            isEmailVerified: false,
            verificationCode: code,
            verificationCodeExpires: expires,
        });

        await this.mailService.sendVerificationEmail(user.email, user.name, code);

        return {
            requiresVerification: true,
            email: user.email,
            message: 'Cuenta creada. Ingresa el código de 6 dígitos que enviamos a tu correo.',
        };
    }

    async verifyEmail(email: string, code: string) {
        const user = await this.usersService.findByEmail(email.trim());
        if (!user) {
            throw new BadRequestException('No se encontró una cuenta asociada a este correo');
        }

        if (!user.verificationCode || user.verificationCode !== code.trim()) {
            throw new BadRequestException('El código de verificación es incorrecto');
        }

        if (user.verificationCodeExpires && new Date() > new Date(user.verificationCodeExpires)) {
            throw new BadRequestException('El código ha expirado. Solicita uno nuevo.');
        }

        await user.update({
            isEmailVerified: true,
            verificationCode: null,
            verificationCodeExpires: null,
        });

        const token = await this.getToken(user);
        user.setDataValue('token', token.access_token);
        return user;
    }

    async resendVerification(email: string) {
        const user = await this.usersService.findByEmail(email.trim());
        if (!user) {
            throw new BadRequestException('No se encontró una cuenta asociada a este correo');
        }

        const code = this.generateOtpCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        await user.update({
            verificationCode: code,
            verificationCodeExpires: expires,
        });

        await this.mailService.sendVerificationEmail(user.email, user.name, code);

        return {
            message: 'Te hemos enviado un nuevo código de verificación a tu correo.',
        };
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findByEmail(email.trim());
        if (!user) {
            throw new BadRequestException('No existe ninguna cuenta registrada con ese correo electrónico');
        }

        const code = this.generateOtpCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        await user.update({
            verificationCode: code,
            verificationCodeExpires: expires,
        });

        await this.mailService.sendPasswordResetEmail(user.email, user.name, code);

        return {
            message: 'Hemos enviado un código de 6 dígitos a tu correo para restablecer tu contraseña.',
        };
    }

    async resetPassword(email: string, code: string, newPassword: string) {
        const user = await this.usersService.findByEmail(email.trim());
        if (!user) {
            throw new BadRequestException('No se encontró una cuenta asociada a este correo');
        }

        if (!user.verificationCode || user.verificationCode !== code.trim()) {
            throw new BadRequestException('El código de recuperación es incorrecto');
        }

        if (user.verificationCodeExpires && new Date() > new Date(user.verificationCodeExpires)) {
            throw new BadRequestException('El código ha expirado. Solicita uno nuevo.');
        }

        const hashedPassword = await BcryptFunctions.hashPassword(newPassword);

        await user.update({
            password: hashedPassword,
            isEmailVerified: true,
            verificationCode: null,
            verificationCodeExpires: null,
        });

        return {
            message: 'Tu contraseña se actualizó correctamente. Ya puedes iniciar sesión.',
        };
    }
}
