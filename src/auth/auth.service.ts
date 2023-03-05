import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SavedUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return { name: user.name };
    }

    //TO-DO proper handle error when password is not valid
    return null;
  }

  async login(user: SavedUserDto) {
    const payload = { id: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
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
