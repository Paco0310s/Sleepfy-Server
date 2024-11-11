import { PartialType } from '@nestjs/swagger';
import { CreateCustomRoutineDto } from './create-custom-routine.dto';

export class UpdateCustomRoutineDto extends PartialType(CreateCustomRoutineDto) {}
