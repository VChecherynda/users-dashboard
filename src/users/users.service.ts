import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

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
    if (this.users[id] === undefined) {
      return 'User doesn`t exist';
    }

    this.users[id] = user;
  }

  delete(id: number) {
    const index = id;

    if (this.users[id] === undefined) {
      return 'User doesn`t exist';
    }

    if (this.users.length === 1) {
      this.users = [];
    }

    this.users = [
      ...this.users.splice(0, index),
      ...this.users.splice(index + 1),
    ];
  }
}
