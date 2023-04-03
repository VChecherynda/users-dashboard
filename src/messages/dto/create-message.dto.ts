import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  userName: string;

  @IsString()
  message: string;
}
