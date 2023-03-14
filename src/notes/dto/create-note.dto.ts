import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNoteDto {
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
