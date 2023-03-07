import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, RegisteredUserDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    type: RegisteredUserDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login user and return token',
  })
  async login(@Request() req) {
    if (!req.user) {
      throw new NotFoundException(`User not found`);
    }

    return await this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiBody({
    type: RegisteredUserDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register new user',
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUpUser(createUserDto);

    return {
      email: user.email,
      message: 'User has been signed up',
    };
  }

  @Post('reset-password')
  async reset() {
    throw new Error('Reset password not implemented');
  }
}
