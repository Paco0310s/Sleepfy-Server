import { Module } from '@nestjs/common';
import { CustomRoutineService } from './custom-routine.service';
import { CustomRoutineController } from './custom-routine.controller';

@Module({
  controllers: [CustomRoutineController],
  providers: [CustomRoutineService],
})
export class CustomRoutineModule {}
