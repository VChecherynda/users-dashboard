import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class AppController {
  @ApiResponse({
    status: 200,
    description: 'Just check if backend works',
  })
  @Get()
  findAll(): string {
    return 'Backend is working';
  }
}
