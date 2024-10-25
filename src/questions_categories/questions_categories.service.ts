import { Injectable } from '@nestjs/common';
import { CreateQuestionsCategoryDto } from './dto/create-questions_category.dto';
import { UpdateQuestionsCategoryDto } from './dto/update-questions_category.dto';

@Injectable()
export class QuestionsCategoriesService {
  create(createQuestionsCategoryDto: CreateQuestionsCategoryDto) {
    return 'This action adds a new questionsCategory';
  }

  findAll() {
    return `This action returns all questionsCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionsCategory`;
  }

  update(id: number, updateQuestionsCategoryDto: UpdateQuestionsCategoryDto) {
    return `This action updates a #${id} questionsCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionsCategory`;
  }
}
