import { Test, TestingModule } from '@nestjs/testing';
import { AnswersOptionsService } from './answers_options.service';

describe('AnswersOptionsService', () => {
  let service: AnswersOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswersOptionsService],
    }).compile();

    service = module.get<AnswersOptionsService>(AnswersOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
