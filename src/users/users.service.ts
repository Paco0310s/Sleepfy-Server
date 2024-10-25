import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { BcryptFunctions } from 'src/common/functions/bcrypt.functions';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from '../auth/auth.controller';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByEmail(createUserDto.email);

    if (user) throw new BadRequestException('User already exists');

    createUserDto.password = await BcryptFunctions.hashPassword(createUserDto.password);

    return this.usersRepository.create<User>({ ...createUserDto });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    await user.update({ ...updateUserDto });
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) throw new BadRequestException('El correo no existe');

    const hashedPassword = await BcryptFunctions.comparePasswords(password, user.password);

    if (user && hashedPassword) { return user; }

    throw new BadRequestException('Contraseña incorrecta');
  }

  async login(email: string, password: string): Promise<User> {
    return this.validateUser(email, password);
  }
}
