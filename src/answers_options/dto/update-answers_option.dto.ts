import { PartialType } from '@nestjs/swagger';
import { CreateAnswersOptionDto } from './create-answers_option.dto';

export class UpdateAnswersOptionDto extends PartialType(CreateAnswersOptionDto) {}
