import { Injectable, Logger } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Test } from 'src/tests/entities/test.entity';
import { Question } from './entities/question.entity';
import { AnswersOption } from '../answers_options/entities/answers_option.entity';

@Injectable()
export class QuestionsService {
  private readonly logger = new Logger(QuestionsService.name);

  async findLatest(): Promise<Test | null> {
    try {
      const test = await Test.findOne({
        order: [['id', 'DESC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Question,
            as: 'questions',
            attributes: { exclude: ['testId', 'createdAt', 'updatedAt'] },
            include: [
              {
                model: AnswersOption,
                as: 'AnswersOptions',
                attributes: { exclude: ['questionId', 'createdAt', 'updatedAt', 'isCorrect'] },
              },
            ],
          },
        ],
      });

      if (test && test.questions) {
        test.questions.sort((a, b) => a.id - b.id);
        test.questions.forEach((q) => {
          if (q.AnswersOptions) {
            q.AnswersOptions.sort((a, b) => a.id - b.id);
          }
        });
      }

      return test;
    } catch (error) {
      this.logger.error(`Error en findLatest: ${error}`);
      return null;
    }
  }

  async findAllByTestId(testId: number): Promise<Test | null> {
    try {
      const test = await Test.findByPk(testId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Question,
            as: 'questions',
            attributes: { exclude: ['testId', 'createdAt', 'updatedAt'] },
            include: [
              {
                model: AnswersOption,
                as: 'AnswersOptions',
                attributes: { exclude: ['questionId', 'createdAt', 'updatedAt', 'isCorrect'] },
              },
            ],
          },
        ],
      });

      if (!test) {
        return await this.findLatest();
      }

      if (test && test.questions) {
        test.questions.sort((a, b) => a.id - b.id);
        test.questions.forEach((q) => {
          if (q.AnswersOptions) {
            q.AnswersOptions.sort((a, b) => a.id - b.id);
          }
        });
      }

      return test;
    } catch (error) {
      this.logger.error(`Error en findAllByTestId: ${error}`);
      return await this.findLatest();
    }
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
