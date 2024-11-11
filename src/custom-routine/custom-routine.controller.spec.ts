import { Test, TestingModule } from '@nestjs/testing';
import { CustomRoutineController } from './custom-routine.controller';
import { CustomRoutineService } from './custom-routine.service';

describe('CustomRoutineController', () => {
  let controller: CustomRoutineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomRoutineController],
      providers: [CustomRoutineService],
    }).compile();

    controller = module.get<CustomRoutineController>(CustomRoutineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
