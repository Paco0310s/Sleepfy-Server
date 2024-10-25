import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsCategoriesService } from './questions_categories.service';
import { CreateQuestionsCategoryDto } from './dto/create-questions_category.dto';
import { UpdateQuestionsCategoryDto } from './dto/update-questions_category.dto';

@Controller('questions-categories')
export class QuestionsCategoriesController {
  constructor(private readonly questionsCategoriesService: QuestionsCategoriesService) {}

  @Post()
  create(@Body() createQuestionsCategoryDto: CreateQuestionsCategoryDto) {
    return this.questionsCategoriesService.create(createQuestionsCategoryDto);
  }

  @Get()
  findAll() {
    return this.questionsCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionsCategoryDto: UpdateQuestionsCategoryDto) {
    return this.questionsCategoriesService.update(+id, updateQuestionsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsCategoriesService.remove(+id);
  }
}
