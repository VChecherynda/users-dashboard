import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class AppController {
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Just check if backend works',
  })
  @Get()
  findAll(): string {
    return 'Backend is working';
  }
}
