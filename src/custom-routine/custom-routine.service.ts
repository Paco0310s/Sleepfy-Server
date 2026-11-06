import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomRoutineDto } from './dto/create-custom-routine.dto';
import { UpdateCustomRoutineDto } from './dto/update-custom-routine.dto';
import { ChatMessageDto } from './dto/chat-message.dto';
import { CustomRoutine } from './entities/custom-routine.entity';
import { User } from 'src/users/entities/user.entity';
import { generateChatResponse } from 'src/db/ia/genimi-impl';

@Injectable()
export class CustomRoutineService {
  async chatWithAI(chatDto: ChatMessageDto): Promise<{ reply: string; timestamp: string }> {
    try {
      let userName: string | undefined;
      let userRoutine: string | null = null;

      if (chatDto.userId) {
        const user = await User.findByPk(chatDto.userId);
        if (user) userName = user.name;

        const latestRoutine = await CustomRoutine.findOne({
          where: { userId: chatDto.userId },
          order: [['id', 'DESC']],
        });
        if (latestRoutine) userRoutine = latestRoutine.routine;
      }

      const reply = await generateChatResponse(
        chatDto.message,
        chatDto.history ?? [],
        userName,
        userRoutine,
      );

      return {
        reply,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Error al comunicarse con Sleepfy AI');
    }
  }
  async getRoutineForUser(userId: number): Promise<{
    routine: string | null;
    createdAt?: Date;
    id?: number;
  }> {
    const routine = await CustomRoutine.findOne({
      where: {
        userId: userId
      },
      order: [['id', 'DESC']],
    });

    return {
      routine: routine ? routine.routine : null,
      createdAt: routine ? routine['createdAt'] : undefined,
      id: routine ? routine.id : undefined,
    };
  }

  async getHistoryForUser(userId: number): Promise<CustomRoutine[]> {
    return await CustomRoutine.findAll({
      where: {
        userId: userId,
      },
      order: [['id', 'DESC']],
      attributes: ['id', 'routine', 'userId', 'createdAt'],
    });
  }

  create(createCustomRoutineDto: CreateCustomRoutineDto) {
    return 'This action adds a new customRoutine';
  }

  findAll() {
    return `This action returns all customRoutine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customRoutine`;
  }

  update(id: number, updateCustomRoutineDto: UpdateCustomRoutineDto) {
    return `This action updates a #${id} customRoutine`;
  }

  remove(id: number) {
    return `This action removes a #${id} customRoutine`;
  }
}
