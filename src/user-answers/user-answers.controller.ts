import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';
import { RateLimit } from 'src/common/guards/rate-limit.guard';

@Controller('user-answers')
export class UserAnswersController {
  constructor(private readonly userAnswersService: UserAnswersService) { }

  @Post()
  @RateLimit(5, 60_000)
  create(@Body() createUserAnswerDto: CreateUserAnswerDto, @Req() req: any) {
    if (req.user?.sub) {
      createUserAnswerDto.user_id = Number(req.user.sub);
    }
    return this.userAnswersService.create(createUserAnswerDto);
  }

  // @Get()
  findAll() {
    return this.userAnswersService.findAll();
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswersService.findOne(+id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAnswerDto: UpdateUserAnswerDto) {
    return this.userAnswersService.update(+id, updateUserAnswerDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswersService.remove(+id);
  }
}
