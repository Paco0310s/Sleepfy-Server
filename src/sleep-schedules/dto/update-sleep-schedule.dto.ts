import { PartialType } from '@nestjs/swagger';
import { CreateSleepScheduleDto } from './create-sleep-schedule.dto';

export class UpdateSleepScheduleDto extends PartialType(CreateSleepScheduleDto) {}
