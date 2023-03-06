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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    if (!req.user) {
      throw new NotFoundException(`User not found`);
    }

    return await this.authService.login(req.user);
  }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUpUser(createUserDto);
  }

  @Post('/reset-password')
  async reset() {
    throw new Error('Reset password not implemented');
  }
}
