import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUpUser(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('reset-password')
  async reset() {
    throw new Error('Reset password not implemented');
  }
}
