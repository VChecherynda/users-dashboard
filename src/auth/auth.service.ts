import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { SavedUserDto, CreateUserDto } from './dto';

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

  private async validateUser(email: string, password: string) {
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

  async login(user: SavedUserDto) {
    const access_token = this.jwtService.sign(user);

    return { access_token };
  }

  async signUpUser({ email, password }: CreateUserDto) {
    const SALT_ROUNDS = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await this.userService.create({
      name: '',
      age: 0,
      location: '',
      email,
      password: hashedPassword,
    });

    return user;
  }

  async resetPassword(user: SavedUserDto) {
    const access_token = this.jwtService.sign(user);
    const fontendUrl = this.getFrontendUrl();
    const confirmLink = `${fontendUrl}/auth/confirm?token=${access_token}`;

    await this.mailService.send({
      from: this.configService.get<string>(user.email),
      to: user.email,
      subject: 'Verify User',
      text: `
          <h3>Hello ${user.email}!</h3>
          <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
      `,
    });
  }
}
