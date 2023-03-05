import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  // TO-DO
  // 1. Use bcrypt for password
  // 2. Use email instead of username
  async validateUser(name: string, password: string) {
    const user = await this.userService.findByName(name);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return { name, password };
  }
}
