import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Test } from 'src/tests/entities/test.entity';
import { Question } from './entities/question.entity';
import { AnswersOption } from '../answers_options/entities/answers_option.entity';

@Injectable()
export class QuestionsService {
  async findLatest(): Promise<Test | null> {
    return await Test.findOne({
      order: [
        ['id', 'DESC'],
        [Question, 'id', 'ASC'],
        [Question, AnswersOption, 'id', 'ASC'],
      ],
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

  async findAllByTestId(testId: number): Promise<Test | null> {
    const test = await Test.findByPk(testId, {
      order: [
        [Question, 'id', 'ASC'],
        [Question, AnswersOption, 'id', 'ASC'],
      ],
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

    if (!test) {
      return await this.findLatest();
    }

    return test;
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
