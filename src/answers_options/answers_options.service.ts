import { Injectable } from '@nestjs/common';
import { CreateAnswersOptionDto } from './dto/create-answers_option.dto';
import { UpdateAnswersOptionDto } from './dto/update-answers_option.dto';

@Injectable()
export class AnswersOptionsService {
  create(createAnswersOptionDto: CreateAnswersOptionDto) {
    return 'This action adds a new answersOption';
  }

  findAll() {
    return `This action returns all answersOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answersOption`;
  }

  update(id: number, updateAnswersOptionDto: UpdateAnswersOptionDto) {
    return `This action updates a #${id} answersOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} answersOption`;
  }
}
