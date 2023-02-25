import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto, ListAllEntitesDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return 'Create user';
  }

  @Get()
  findAll(@Query() query: ListAllEntitesDto): string {
    return 'Return all users';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} user`;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return `This action update a #${id} user`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action delete a #${id} user`;
  }
}
