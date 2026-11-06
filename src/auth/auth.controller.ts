import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { RateLimit } from 'src/common/guards/rate-limit.guard';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
    ForgotPasswordDto,
    ResendVerificationDto,
    ResetPasswordDto,
    VerifyEmailDto,
} from './dto/auth-verification.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @Public()
    @RateLimit(10, 60_000)
    @HttpCode(HttpStatus.OK)
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto.email, loginUserDto.password);
    }

    @Post('register')
    @Public()
    @RateLimit(6, 60_000)
    @HttpCode(HttpStatus.CREATED)
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('verify-email')
    @Public()
    @RateLimit(10, 60_000)
    @HttpCode(HttpStatus.OK)
    verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
        return this.authService.verifyEmail(verifyEmailDto.email, verifyEmailDto.code);
    }

    @Post('resend-verification')
    @Public()
    @RateLimit(4, 60_000)
    @HttpCode(HttpStatus.OK)
    resendVerification(@Body() resendDto: ResendVerificationDto) {
        return this.authService.resendVerification(resendDto.email);
    }

    @Post('forgot-password')
    @Public()
    @RateLimit(5, 60_000)
    @HttpCode(HttpStatus.OK)
    forgotPassword(@Body() forgotDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotDto.email);
    }

    @Post('reset-password')
    @Public()
    @RateLimit(6, 60_000)
    @HttpCode(HttpStatus.OK)
    resetPassword(@Body() resetDto: ResetPasswordDto) {
        return this.authService.resetPassword(
            resetDto.email,
            resetDto.code,
            resetDto.newPassword,
        );
    }

    // @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
