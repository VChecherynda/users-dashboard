import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    if (!req.user) {
      throw new NotFoundException(`User not found`);
    }

    return await this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUpUser(createUserDto);
  }

  @Post('auth/reset-password')
  async reset() {
    throw new Error('Reset password not implemented');
  }
}
