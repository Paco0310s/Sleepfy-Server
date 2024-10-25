import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsCategoriesController } from './questions_categories.controller';
import { QuestionsCategoriesService } from './questions_categories.service';

describe('QuestionsCategoriesController', () => {
  let controller: QuestionsCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsCategoriesController],
      providers: [QuestionsCategoriesService],
    }).compile();

    controller = module.get<QuestionsCategoriesController>(QuestionsCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
