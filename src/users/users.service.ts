import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users[id];
  }

  update(id: number, user: User) {
    this.users[id] = user;
  }

  delete(id: number) {
    this.users.filter((_, index) => index !== id);
  }
}
