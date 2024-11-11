import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';
import { UserAnswer } from './entities/user-answer.entity';
import { User } from 'src/users/entities/user.entity';
import { Question } from 'src/questions/entities/question.entity';
import { AnswersOption } from 'src/answers_options/entities/answers_option.entity';
import { CustomRoutine } from 'src/custom-routine/entities/custom-routine.entity';
import { generateResponse } from 'src/db/ia/genimi-impl';

@Injectable()
export class UserAnswersService {

  constructor(
    @Inject('USER_ANSWERS_REPOSITORY')
    private userAnswersRepository: typeof UserAnswer
  ) { }

  async create(createUserAnswerDto: CreateUserAnswerDto): Promise<{
    routine: string | null;
  }> {
    const t = await this.userAnswersRepository.sequelize.transaction();

    try {

      const user = await User.findByPk(createUserAnswerDto.user_id);

      if (!user) return null;

      // Verifica si el usuario ya respondió las preguntas
      const userAnswer = await this.userAnswersRepository.findOne({
        where: {
          userId: createUserAnswerDto.user_id
        }
      });

      if (userAnswer) {
        throw new BadRequestException('Ya has respondido las preguntas');
      }

      const userName = user.name;

      let message = '';

      const userAnswers = createUserAnswerDto.answers.map(answer => ({
        userId: createUserAnswerDto.user_id,
        questionId: answer.question_id,
        answerOptionId: answer.answer_id
      }));

      for (const answer of userAnswers) {
        const question = await Question.findByPk(answer.questionId);
        const answerOption = await AnswersOption.findByPk(answer.answerOptionId);

        if (question && answerOption) {
          message += `${question.question}: ${answerOption.answer}\n`;
        }
      }

      // Guarda las respuestas en la base de datos
      const resp: UserAnswer[] = await this.userAnswersRepository.bulkCreate(userAnswers, { transaction: t });

      const routine = await generateResponse(`Crea la rutina para el usuario ${userName} con las respuestas:\n${message}`);

      // Guarda la rutina en la base de datos
      await CustomRoutine.create({
        userId: createUserAnswerDto.user_id,
        routine
      }, { transaction: t });

      await t.commit();

      return { routine };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }


  findAll() {
    return `This action returns all userAnswers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswer`;
  }

  update(id: number, updateUserAnswerDto: UpdateUserAnswerDto) {
    return `This action updates a #${id} userAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswer`;
  }
}
