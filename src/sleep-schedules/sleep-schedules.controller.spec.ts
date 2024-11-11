import { Test, TestingModule } from '@nestjs/testing';
import { SleepSchedulesController } from './sleep-schedules.controller';
import { SleepSchedulesService } from './sleep-schedules.service';

describe('SleepSchedulesController', () => {
  let controller: SleepSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SleepSchedulesController],
      providers: [SleepSchedulesService],
    }).compile();

    controller = module.get<SleepSchedulesController>(SleepSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
