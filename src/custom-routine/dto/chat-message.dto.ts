import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsArray()
  history?: { role: 'user' | 'model'; text: string }[];
}

