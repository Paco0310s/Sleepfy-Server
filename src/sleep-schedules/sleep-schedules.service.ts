import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSleepScheduleDto } from './dto/create-sleep-schedule.dto';
import { UpdateSleepScheduleDto } from './dto/update-sleep-schedule.dto';
import { SleepSchedule } from './entities/sleep-schedule.entity';
import { Op } from 'sequelize';
import { addDays, endOfDay, getDay, startOfDay, subDays, subHours } from 'date-fns';

@Injectable()
export class SleepSchedulesService {
  async create(createSleepScheduleDto: CreateSleepScheduleDto) {

    // Verificar si el usuario ya tiene un horario del mismo día
    const endDateStart = startOfDay(createSleepScheduleDto.end);
    const endDateEnd = endOfDay(endDateStart);

    const sleepScheduleExists = await SleepSchedule.findOne({
      where: {
        userId: createSleepScheduleDto.userId,
        end: { [Op.gte]: endDateStart, [Op.lte]: endDateEnd },
      },
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
    // Obtener el día de hoy en UTC
    const today = new Date();

    // Ajusta la fecha a UTC-6
    const utcMinus6 = subHours(today, 6);

    // Lunes pasado más cercano (00:00 UTC-6)
    const dayOfWeek = getDay(utcMinus6); // Día de la semana (0 = Domingo, 1 = Lunes, ...)
    const daysToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Días hasta el lunes pasado
    const lastMonday = startOfDay(subDays(utcMinus6, daysToLastMonday)); // Lunes a las 00:00

    // Domingo siguiente más cercano (23:59 UTC-6)
    const daysToNextSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek; // Días hasta el domingo próximo
    const nextSunday = endOfDay(addDays(utcMinus6, daysToNextSunday)); // Domingo a las 23:59

    console.log(`lastMonday: ${lastMonday}, nextSunday: ${nextSunday}`);

    const sleepSchedules = await SleepSchedule.findAll({
      where: {
        userId,
        end: { [Op.gte]: lastMonday, [Op.lte]: nextSunday },
      },
      order: [['id', 'DESC']],
    });

    return { sleepSchedules };
  }
}
