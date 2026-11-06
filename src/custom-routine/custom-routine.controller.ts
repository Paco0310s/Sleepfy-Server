import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ForbiddenException } from '@nestjs/common';
import { CustomRoutineService } from './custom-routine.service';
import { CreateCustomRoutineDto } from './dto/create-custom-routine.dto';
import { UpdateCustomRoutineDto } from './dto/update-custom-routine.dto';
import { ChatMessageDto } from './dto/chat-message.dto';
import { RateLimit } from 'src/common/guards/rate-limit.guard';

@Controller('custom-routine')
export class CustomRoutineController {
  constructor(private readonly customRoutineService: CustomRoutineService) { }

  @Post('chat')
  @RateLimit(15, 60_000)
  async chatWithAI(@Body() chatMessageDto: ChatMessageDto, @Req() req: any) {
    if (req.user?.sub) {
      chatMessageDto.userId = Number(req.user.sub);
    }
    return await this.customRoutineService.chatWithAI(chatMessageDto);
  }

  // @Post()
  create(@Body() createCustomRoutineDto: CreateCustomRoutineDto) {
    return this.customRoutineService.create(createCustomRoutineDto);
  }

  // @Get()
  findAll() {
    return this.customRoutineService.findAll();
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customRoutineService.findOne(+id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomRoutineDto: UpdateCustomRoutineDto) {
    return this.customRoutineService.update(+id, updateCustomRoutineDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customRoutineService.remove(+id);
  }

  @Get('user/:userId/history')
  async getHistoryForUser(@Param('userId') userId: string, @Req() req: any) {
    const targetId = req.user?.sub ? Number(req.user.sub) : +userId;
    if (req.user?.sub && Number(req.user.sub) !== +userId) {
      throw new ForbiddenException('No tienes permiso para consultar el historial de otro usuario');
    }
    return await this.customRoutineService.getHistoryForUser(targetId);
  }

  @Get('user/:userId')
  async getRoutineForUser(@Param('userId') userId: string, @Req() req: any) {
    const targetId = req.user?.sub ? Number(req.user.sub) : +userId;
    if (req.user?.sub && Number(req.user.sub) !== +userId) {
      throw new ForbiddenException('No tienes permiso para consultar la rutina de otro usuario');
    }
    return await this.customRoutineService.getRoutineForUser(targetId);
  }
}
