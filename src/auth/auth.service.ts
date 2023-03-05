import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  // TO-DO
  // 1. Use bcrypt for password
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === password) {
      return { name: user.name };
    }

    return null;
  }

  async signUpUser({ email, password }: CreateUserDto) {
    await this.userService.create({ email, password });

    return null;
  }
}
