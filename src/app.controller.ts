import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get()
  findAll(): string {
    return 'Backend is working';
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/signup')
  async signup() {
    throw new Error('Sing up not implemented');
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/reset-password')
  async reset() {
    throw new Error('Reset password not implemented');
  }
}
