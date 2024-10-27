import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersOptionsService } from './answers_options.service';
import { CreateAnswersOptionDto } from './dto/create-answers_option.dto';
import { UpdateAnswersOptionDto } from './dto/update-answers_option.dto';

@Controller('answers-options')
export class AnswersOptionsController {
  constructor(private readonly answersOptionsService: AnswersOptionsService) { }

  // @Post()
  create(@Body() createAnswersOptionDto: CreateAnswersOptionDto) {
    return this.answersOptionsService.create(createAnswersOptionDto);
  }

  // @Get()
  findAll() {
    return this.answersOptionsService.findAll();
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersOptionsService.findOne(+id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswersOptionDto: UpdateAnswersOptionDto) {
    return this.answersOptionsService.update(+id, updateAnswersOptionDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersOptionsService.remove(+id);
  }
}
