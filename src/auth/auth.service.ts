import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    console.log('[user]', user);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('[isPasswordValid]', isPasswordValid);

    if (isPasswordValid) {
      return { name: user.name };
    }

    return null;
  }

  async signUpUser({ email, password }: CreateUserDto) {
    const SALT_ROUNDS = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await this.userService.create({
      name: '',
      age: 0,
      location: '',
      email,
      password: hashedPassword,
    });

    return null;
  }
}
