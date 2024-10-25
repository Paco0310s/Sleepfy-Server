import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Test } from 'src/tests/entities/test.entity';
import { Question } from './entities/question.entity';
import { AnswersOption } from '../answers_options/entities/answers_option.entity';

@Injectable()
export class QuestionsService {
  async findAllByTestId(testId: number): Promise<Test> {
    return await Test.findByPk(testId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Question,
          attributes: { exclude: ['testId', 'createdAt', 'updatedAt'] },
          include: [
            {
              model: AnswersOption,
              attributes: { exclude: ['questionId', 'createdAt', 'updatedAt', 'isCorrect'] }
            }
          ]
        }
      ]
    });
  }

  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
