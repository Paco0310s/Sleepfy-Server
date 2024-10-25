import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsCategoriesService } from './questions_categories.service';

describe('QuestionsCategoriesService', () => {
  let service: QuestionsCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsCategoriesService],
    }).compile();

    service = module.get<QuestionsCategoriesService>(QuestionsCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
