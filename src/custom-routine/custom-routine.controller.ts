import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomRoutineService } from './custom-routine.service';
import { CreateCustomRoutineDto } from './dto/create-custom-routine.dto';
import { UpdateCustomRoutineDto } from './dto/update-custom-routine.dto';

@Controller('custom-routine')
export class CustomRoutineController {
  constructor(private readonly customRoutineService: CustomRoutineService) { }

  // @Post()
  create(@Body() createCustomRoutineDto: CreateCustomRoutineDto) {
    return this.customRoutineService.create(createCustomRoutineDto);
  }

  // @Get()
  findAll() {
    return this.customRoutineService.findAll();
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customRoutineService.findOne(+id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomRoutineDto: UpdateCustomRoutineDto) {
    return this.customRoutineService.update(+id, updateCustomRoutineDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customRoutineService.remove(+id);
  }

  @Get('user/:userId')
  async getRoutineForUser(@Param('userId') userId: number) {
    return await this.customRoutineService.getRoutineForUser(userId);
  }
}
