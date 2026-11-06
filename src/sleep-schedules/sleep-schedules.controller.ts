import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ForbiddenException } from '@nestjs/common';
import { SleepSchedulesService } from './sleep-schedules.service';
import { CreateSleepScheduleDto } from './dto/create-sleep-schedule.dto';
import { UpdateSleepScheduleDto } from './dto/update-sleep-schedule.dto';

@Controller('sleep-schedules')
export class SleepSchedulesController {
  constructor(private readonly sleepSchedulesService: SleepSchedulesService) { }

  @Post()
  create(@Body() createSleepScheduleDto: CreateSleepScheduleDto, @Req() req: any) {
    if (req.user?.sub) {
      createSleepScheduleDto.userId = Number(req.user.sub);
    }
    return this.sleepSchedulesService.create(createSleepScheduleDto);
  }

  // @Get()
  findAll() {
    return this.sleepSchedulesService.findAll();
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sleepSchedulesService.findOne(+id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateSleepScheduleDto: UpdateSleepScheduleDto) {
    return this.sleepSchedulesService.update(+id, updateSleepScheduleDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sleepSchedulesService.remove(+id);
  }

  @Get('last-week/:userId')
  findLastWeek(@Param('userId') userId: string, @Req() req: any) {
    const targetId = req.user?.sub ? Number(req.user.sub) : +userId;
    if (req.user?.sub && Number(req.user.sub) !== +userId) {
      throw new ForbiddenException('No tienes permiso para ver los horarios de otro usuario');
    }
    return this.sleepSchedulesService.findLastWeek(targetId);
  }
}
