import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  location: string;
}

export class ListAllEntitesDto {
  @ApiProperty({
    type: [UserDto],
  })
  list: [UserDto];
}
