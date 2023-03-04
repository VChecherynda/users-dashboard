class UserDto {
  username: string;
  age: number;
  location: string;
}

export class ListAllEntitesDto {
  list: [UserDto];
}
