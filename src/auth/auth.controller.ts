import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { LoginUserDto } from 'src/users/dto/login-user.dto.';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto.email, loginUserDto.password);
    }

    @Post('register')
    @Public()
    @HttpCode(HttpStatus.CREATED)
    register(@Body() createUserDto: any) {
        return this.authService.register(createUserDto);
    }

    // @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}