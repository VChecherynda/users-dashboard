import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createNoteDto: CreateNoteDto) {
    await this.notesService.create(createNoteDto);

    return {
      message: 'Note has been created',
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.notesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    await this.notesService.update(id, updateNoteDto);

    return {
      message: 'Note has been updated',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.notesService.remove(id);

    return {
      message: 'Note has been removed',
    };
  }
}
