import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

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
        const token = await this.getToken(user);

        user.setDataValue('token', token.access_token);
        return user;
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        const token = await this.getToken(user);

        user.setDataValue('token', token.access_token);
        return user;
    }
}