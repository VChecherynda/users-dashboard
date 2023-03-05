class UserDto {
  name: string;
  age: number;
  location: string;
}

export class ListAllEntitesDto {
  list: [UserDto];
}
