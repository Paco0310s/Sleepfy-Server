import { Test, TestingModule } from '@nestjs/testing';
import { CustomRoutineService } from './custom-routine.service';

describe('CustomRoutineService', () => {
  let service: CustomRoutineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomRoutineService],
    }).compile();

    service = module.get<CustomRoutineService>(CustomRoutineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
