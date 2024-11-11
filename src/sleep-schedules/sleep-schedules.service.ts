import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSleepScheduleDto } from './dto/create-sleep-schedule.dto';
import { UpdateSleepScheduleDto } from './dto/update-sleep-schedule.dto';
import { SleepSchedule } from './entities/sleep-schedule.entity';
import { Op } from 'sequelize';

@Injectable()
export class SleepSchedulesService {
  async create(createSleepScheduleDto: CreateSleepScheduleDto) {

    // Verificar si el usuario ya tiene un horario del mismo día
    const sleepScheduleExists = await SleepSchedule.findOne({
      where: {
        userId: createSleepScheduleDto.userId,
        start: createSleepScheduleDto.start,
      }
    });

    if (sleepScheduleExists) {
      throw new BadRequestException('Ya tienes un horario para este día');
    }

    const sleepSchedule = await SleepSchedule.create(createSleepScheduleDto);

    return { sleepSchedule };
  }

  findAll() {
    return `This action returns all sleepSchedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sleepSchedule`;
  }

  update(id: number, updateSleepScheduleDto: UpdateSleepScheduleDto) {
    return `This action updates a #${id} sleepSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} sleepSchedule`;
  }

  async findLastWeek(userId: number) {
    const today = new Date();

    // const lastMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
    // const nextSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()));

    const lastMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
    // lastMonday + 6 days = nextSunday
    const nextSunday = new Date(lastMonday.getFullYear(), lastMonday.getMonth(), lastMonday.getDate() + 7);

    const sleepSchedules = await SleepSchedule.findAll({
      where: {
        userId,
        end: { [Op.gte]: lastMonday, [Op.lte]: nextSunday },
      }
    });

    return { sleepSchedules };
  }
}
