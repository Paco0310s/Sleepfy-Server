import { Test, TestingModule } from '@nestjs/testing';
import { SleepSchedulesService } from './sleep-schedules.service';

describe('SleepSchedulesService', () => {
  let service: SleepSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SleepSchedulesService],
    }).compile();

    service = module.get<SleepSchedulesService>(SleepSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
