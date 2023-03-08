import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SavedUserDto } from 'src/auth/dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ListAllEntitesDto, UpdateUserDto } from './dto';
import { UserSaved, UserUpdate } from './interfaces/user.interface';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return list of the users',
  })
  @ApiBody({
    type: ListAllEntitesDto,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<void | UserSaved[]> {
    const users = await this.usersService.findAll();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      age: user.age,
      location: user.location,
      email: user.email,
    }));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return saved user',
  })
  @ApiBody({
    type: UserSaved,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<UserSaved> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      id: user.id,
      name: user.name,
      age: user.age,
      location: user.location,
      email: user.email,
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update saved user',
  })
  @ApiBody({
    type: UserUpdate,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete saved user',
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id') id: string) {
    this.usersService.delete(id);
  }
}
