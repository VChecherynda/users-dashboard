import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  location: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UserSaved {
  @ApiProperty({
    example: '1',
  })
  id: string;

  @ApiProperty({
    example: 'John',
  })
  name: string;

  @ApiProperty({
    example: 33,
  })
  age: number;

  @ApiProperty({
    example: 'New York',
  })
  location: string;

  @ApiProperty({
    example: 'test@email.com',
  })
  email: string;
}

export class UserUpdate {
  @ApiProperty({
    example: 'Mickle',
  })
  name: string;

  @ApiProperty({
    example: 32,
  })
  age: number;

  @ApiProperty({
    example: 'Singapore',
  })
  location: string;
}
