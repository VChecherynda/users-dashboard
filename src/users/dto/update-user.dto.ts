import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Sergey',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 30,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'Kyiv',
  })
  @IsString()
  location: string;
}
