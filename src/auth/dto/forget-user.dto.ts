import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgetUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
