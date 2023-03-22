import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import {
  SavedUserDto,
  CreateUserDto,
  ForgetPasswordDto,
  ChangePasswordDto,
} from './dto';

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  private getFrontendUrl() {
    const HOST = this.configService.get('FRONTENDHOST');
    const PORT = this.configService.get('FRONTENDPORT');

    return `http://${HOST}:${PORT}`;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return { id: user.id, email: user.email };
    }

    return null;
  }

  async hashPassword(password: string) {
    const SALT_ROUNDS = 10;

    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  async login(user: SavedUserDto) {
    const access_token = this.jwtService.sign(user);

    return { access_token };
  }

  async signUpUser({ email, password }: CreateUserDto) {
    const hashedPassword = await this.hashPassword(password);

    const user = await this.userService.save({
      name: '',
      age: 0,
      location: '',
      language: 'ukranian',
      email,
      password: hashedPassword,
    });

    return user;
  }

  async forgetPassword({ email }: ForgetPasswordDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with such email doesnt exist`);
    }

    const access_token = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
    const fontendUrl = this.getFrontendUrl();
    const confirmLink = `${fontendUrl}/auth/confirm?token=${access_token}`;

    await this.mailService.send({
      from: this.configService.get<string>('MAINAPPMAIL'),
      to: user.email,
      subject: 'Verify User',
      html: `<p>Please use this <a href="${confirmLink}">link</a> to reset your password.</p>`,
    });
  }

  async changePassword({ id, password }: ChangePasswordDto) {
    const hashedPassword = await this.hashPassword(password);

    await this.userService.updatePassword(id, hashedPassword);
  }
}
