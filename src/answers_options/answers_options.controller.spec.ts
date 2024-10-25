import { Test, TestingModule } from '@nestjs/testing';
import { AnswersOptionsController } from './answers_options.controller';
import { AnswersOptionsService } from './answers_options.service';

describe('AnswersOptionsController', () => {
  let controller: AnswersOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersOptionsController],
      providers: [AnswersOptionsService],
    }).compile();

    controller = module.get<AnswersOptionsController>(AnswersOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
