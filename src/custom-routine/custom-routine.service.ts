import { Injectable } from '@nestjs/common';
import { CreateCustomRoutineDto } from './dto/create-custom-routine.dto';
import { UpdateCustomRoutineDto } from './dto/update-custom-routine.dto';
import { CustomRoutine } from './entities/custom-routine.entity';

@Injectable()
export class CustomRoutineService {
  async getRoutineForUser(userId: number): Promise<{
    routine: string | null;
  }> {
    const routine = await CustomRoutine.findOne({
      where: {
        userId: userId
      }
    });

    return {
      routine: routine ? routine.routine : null
    };
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
