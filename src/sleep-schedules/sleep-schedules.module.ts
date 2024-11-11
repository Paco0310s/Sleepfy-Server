import { Module } from '@nestjs/common';
import { SleepSchedulesService } from './sleep-schedules.service';
import { SleepSchedulesController } from './sleep-schedules.controller';

@Module({
  controllers: [SleepSchedulesController],
  providers: [SleepSchedulesService],
})
export class SleepSchedulesModule {}
